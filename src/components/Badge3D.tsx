import * as THREE from "three";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Canvas, extend, useThree, useFrame, type ThreeElement } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

extend({ MeshLineGeometry, MeshLineMaterial });

useGLTF.preload("/qsscard.glb");
useTexture.preload("/band.jpg");

export default function Badge3D() {
  return (
    <div className="w-full h-[1000px]">
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <ambientLight intensity={0.8} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={1.5}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={2}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={2}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={4}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef<THREE.Mesh<MeshLineGeometry, MeshLineMaterial>>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  const j1Lerped = useRef<THREE.Vector3 | null>(null);
  const j2Lerped = useRef<THREE.Vector3 | null>(null);
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3(); // prettier-ignore
  const segmentProps = {
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  } satisfies Omit<RigidBodyProps, "type">;
  const model = useGLTF("/qsscard.glb");
  const nodes = model.nodes as typeof model.nodes & {
    card: THREE.Mesh;
    clip: THREE.Mesh;
    clamp: THREE.Mesh;
  };
  const materials = model.materials as typeof model.materials & {
    base: THREE.MeshStandardMaterial;
    metal: THREE.Material;
  };
  const texture = useTexture("/band.jpg");
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.85]) // prettier-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.85]) // prettier-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.85]) // prettier-ignore
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]) // prettier-ignore

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
    } else {
      document.body.style.cursor = "auto";
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      // Fix most of the jitter when over pulling the card;
      const j1Position = updateLerpedPosition(j1Lerped, j1, delta, minSpeed, maxSpeed);
      const j2Position = updateLerpedPosition(j2Lerped, j2, delta, minSpeed, maxSpeed);
      // Calculate catmul curve
      const [point0, point1, point2, point3] = curve.points;
      if (!point0 || !point1 || !point2 || !point3) return;
      point0.copy(j3.current.translation());
      point1.copy(j2Position);
      point2.copy(j1Position);
      point3.copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      // Tilt it back towards the screen
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.3, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.6, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.9, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.2, 0, 0]} ref={card} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              if (e.target instanceof Element && e.target.hasPointerCapture(e.pointerId)) {
                e.target.releasePointerCapture(e.pointerId);
              }
              drag(false);
            }}
            onPointerDown={(e) => {
              if (e.target instanceof Element) e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={0.3}
                clearcoatRoughness={0.1}
                roughness={0.2}
                metalness={0.1}
                toneMapped={false}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          args={[{ resolution: new THREE.Vector2(width, height) }]}
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap={1}
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

function updateLerpedPosition(
  positionRef: RefObject<THREE.Vector3 | null>,
  bodyRef: RefObject<RapierRigidBody>,
  delta: number,
  minSpeed: number,
  maxSpeed: number,
) {
  const position = bodyRef.current.translation();
  if (!positionRef.current) positionRef.current = new THREE.Vector3().copy(position);
  const clampedDistance = Math.max(0.1, Math.min(1, positionRef.current.distanceTo(position)));
  return positionRef.current.lerp(position, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
}
