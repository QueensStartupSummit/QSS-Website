import { MessageCircle, Users, Calendar, ArrowRight } from 'lucide-react';

const TalkToUs = () => {
    const features = [
        {
            icon: MessageCircle,
            title: 'Expert Mentorship',
            description: 'Connect with industry leaders and successful entrepreneurs who will guide you through your startup journey.'
        },
        {
            icon: Users,
            title: 'Networking Opportunities',
            description: 'Build valuable connections with fellow entrepreneurs, investors, and potential co-founders.'
        },
        {
            icon: Calendar,
            title: 'Structured Program',
            description: 'Follow our proven 48-hour framework designed to take your idea from concept to prototype.'
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Ready to
                            <span className="block text-[#2c541d]">Talk to Us?</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Join hundreds of ambitious entrepreneurs at Queen's Startup Summit. Whether you have a
                            groundbreaking idea or you're looking to join a team, QSS is your gateway to the startup world.
                        </p>

                        <div className="space-y-6 mb-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="bg-[#74a84a]/10 p-3 rounded-lg flex-shrink-0">
                                        <feature.icon className="h-6 w-6 text-[#74a84a]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-[#2c541d] hover:bg-[#74a84a] text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                                Start Your Journey
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                            <button className="border-2 border-[#2c541d] text-[#2c541d] hover:bg-[#2c541d] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <img
                            src="/Talk-to-us.jpg.jpeg"
                            alt="Talk to Us"
                            className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                        />


                        {/* Floating card */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                            <div className="flex items-center space-x-3">
                                <div className="bg-[#74a84a] p-2 rounded-lg">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">80+</div>
                                    <div className="text-sm text-gray-600">Participants Expected</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TalkToUs;