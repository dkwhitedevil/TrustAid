import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Brain, Link as LinkIcon, Users, CheckCircle, TrendingUp, Star, Award, Globe, Zap } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Verification',
      description: 'Advanced OCR and facial recognition technology ensures authentic requests with 98.7% accuracy',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: LinkIcon,
      title: 'Blockchain Transparency',
      description: 'Every donation is recorded on Algorand blockchain for complete transparency and immutable records',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'NGO Validation',
      description: 'Trusted NGO partners validate and deliver aid to verified beneficiaries with proof of delivery',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: CheckCircle,
      title: 'Smart Contracts',
      description: 'Automated escrow system ensures funds are released only after successful delivery confirmation',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { label: 'Total Donations', value: '$2.4M+', icon: TrendingUp },
    { label: 'Verified Requests', value: '5,200+', icon: CheckCircle },
    { label: 'NGO Partners', value: '150+', icon: Users },
    { label: 'Success Rate', value: '98.7%', icon: Award }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Beneficiary',
      content: 'TrustAid helped me get the medical treatment I needed. The process was transparent and dignified.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Donor',
      content: 'Finally, a platform where I can see exactly how my donations are being used. Complete transparency!',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Health First NGO',
      role: 'NGO Partner',
      content: 'TrustAid streamlines our validation process while maintaining the highest standards of verification.',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center slide-up">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-8">
              <Star className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Trusted by 10,000+ users worldwide</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Transparent
              <span className="block gradient-text floating-animation">
                Donations
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl">with AI & Blockchain</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              TrustAid revolutionizes charitable giving through AI-powered verification, 
              blockchain transparency, and NGO partnerships to ensure your donations reach those who need them most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/login"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Start Making Impact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/view-requests"
                className="group flex items-center space-x-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 px-10 py-5 rounded-2xl font-bold text-lg hover:border-blue-300 hover:bg-white transition-all duration-300 hover:scale-105"
              >
                <Globe className="h-5 w-5 group-hover:text-blue-600 transition-colors" />
                <span>Explore Requests</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Powered by cutting-edge technology</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              How TrustAid
              <span className="block gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our platform combines artificial intelligence, blockchain technology, and human oversight 
              to create the most trusted donation experience ever built.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group card-hover bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Trusted by
              <span className="gradient-text"> Thousands</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our community says about their experience with TrustAid
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-hover bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-blue-600 font-medium">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
            Ready to Make a
            <span className="block">Difference?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of donors, NGOs, and beneficiaries creating positive impact 
            through transparent, verified, and blockchain-secured giving.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/login"
              className="group relative overflow-hidden bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Start Your Journey</span>
            </Link>
            <Link
              to="/view-requests"
              className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all duration-300 hover:scale-105"
            >
              Browse Requests
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;