import React, { useState } from 'react';
import { Mail, MapPin, Send, AlertCircle } from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters long' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters long' : '';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Contact Form Submission from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitError('Failed to send message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    // Clear status messages when user starts editing
    if (submitSuccess) setSubmitSuccess(false);
    if (submitError) setSubmitError('');
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Partnerships',
      details: 'partnerships@qssummit.com',
      action: 'mailto:partnerships@qssummit.com'
    },
    {
      icon: Mail,
      title: 'Delegates',
      details: 'delegates@qssummit.com',
      action: 'mailto:delegates@qssummit.com'
    },
    {
      icon: Mail,
      title: 'Technical Support',
      details: 'tech@qssummit.com',
      action: 'mailto:tech@qssummit.com'
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get In
            <span className="block text-[#58baba]">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about QSS? Want to become a sponsor or mentor? We'd love to hear from you!
          </p>
        </div>

        {/* Mobile-first layout: single column on mobile, two columns on large screens */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm order-2 lg:order-1">
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Send us a message</h3>
              <div className="flex gap-2 mb-3 sm:mb-4">
                <div className="h-1 w-8 rounded-full bg-[#58baba]"></div>
                <div className="h-1 w-16 rounded-full bg-[#ddc946]"></div>
                <div className="h-1 w-8 rounded-full bg-[#1a1a1a]"></div>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{submitError}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 sm:py-3 text-base sm:text-sm border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 touch-manipulation ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-[#58baba]'
                  } hover:border-gray-400 active:scale-[0.99]`}
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                  // Mobile-specific attributes
                  inputMode="text"
                />
                {errors.name && (
                  <div className="mt-2 flex items-center text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                    <p className="text-sm">{errors.name}</p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 sm:py-3 text-base sm:text-sm border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 touch-manipulation ${
                    errors.email
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-[#58baba]'
                  } hover:border-gray-400 active:scale-[0.99]`}
                  placeholder="your.email@example.com"
                  required
                  autoComplete="email"
                  // Mobile-specific attributes
                  inputMode="email"
                />
                {errors.email && (
                  <div className="mt-2 flex items-center text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                    <p className="text-sm">{errors.email}</p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-4 sm:py-3 text-base sm:text-sm border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 resize-none touch-manipulation ${
                    errors.message
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-[#58baba]'
                  } hover:border-gray-400 active:scale-[0.99]`}
                  placeholder="Tell us about your inquiry..."
                  required
                  // Mobile-specific attributes
                  inputMode="text"
                ></textarea>
                {errors.message && (
                  <div className="mt-2 flex items-center text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                    <p className="text-sm">{errors.message}</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white py-4 sm:py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center touch-manipulation min-h-[44px] bg-[#ddc946] ${
                  isSubmitting
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:opacity-90 active:scale-[0.98] hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Image */}
          <div className="order-1 lg:order-2">
            <div className="relative mb-6 sm:mb-8">
              <img
                src="/Contact-Banner.webp"
                alt="Contact Us"
                className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-lg"
                width="800"
                height="256"
                loading="lazy"
              />
            </div>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={info.title}
                  href={info.action}
                  className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group touch-manipulation min-h-[44px] active:scale-[0.99] hover:shadow-md"
                >
                  <div
                    className="p-3 rounded-lg mr-4 transition-all duration-200 flex-shrink-0 bg-[#58baba]/10 group-hover:bg-[#58baba]/20"
                  >
                    <info.icon className="h-6 w-6 text-[#58baba]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{info.title}</h4>
                    <p className="text-gray-600 text-sm sm:text-base break-all">{info.details}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;