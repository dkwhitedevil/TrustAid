import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Users,
  Heart,
  Brain,
  Coins,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Lock,
  Zap,
  Target,
  Sparkles,
} from "lucide-react";

const LandingPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/50 to-purple-900/30" />
      </div>

      {/* Floating Navigation */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary-400" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              TrustAid
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#process"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Process
            </a>
            <a
              href="#tech"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Technology
            </a>
          </div>
          <Link
            to="/login"
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full font-medium hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:scale-105"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section - Diagonal Split Layout */}
      <section className="relative min-h-screen flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-primary-500/20 border border-primary-500/30 rounded-full px-4 py-2 text-primary-300">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Powered by AI & Blockchain
                  </span>
                </div>
                <h1 className="text-6xl md:text-7xl font-black leading-tight">
                  <span className="block text-white">Trust</span>
                  <span className="block bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                    Revolution
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  The world's first AI-verified, blockchain-secured donation
                  platform. Every dollar tracked, every impact verified, every
                  story real.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:scale-105 shadow-2xl"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>Start Your Journey</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                  Watch Demo
                </button>
              </div>

              {/* Stats in Hexagonal Layout */}
              <div className="grid grid-cols-2 gap-6 mt-12">
                {[
                  { value: "10K+", label: "Verified Users", icon: Users },
                  { value: "$2M+", label: "Donated", icon: Heart },
                  { value: "99.8%", label: "AI Accuracy", icon: Brain },
                  { value: "50+", label: "Countries", icon: Globe },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                        <Icon className="h-8 w-8 text-primary-400 mb-3" />
                        <div className="text-2xl font-bold text-white">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Interactive Visual */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px]">
                {/* Central Hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-2xl">
                  <Shield className="h-16 w-16 text-white" />
                </div>

                {/* Orbiting Elements */}
                {[
                  {
                    icon: Users,
                    label: "Beneficiaries",
                    angle: 0,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Heart,
                    label: "Donors",
                    angle: 120,
                    color: "from-red-500 to-pink-500",
                  },
                  {
                    icon: CheckCircle,
                    label: "NGOs",
                    angle: 240,
                    color: "from-green-500 to-emerald-500",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  const radius = 150;
                  const x = Math.cos((item.angle * Math.PI) / 180) * radius;
                  const y = Math.sin((item.angle * Math.PI) / 180) * radius;

                  return (
                    <div
                      key={index}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce-gentle"
                      style={{
                        transform: `translate(${x - 50}%, ${y - 50}%)`,
                        animationDelay: `${index * 0.5}s`,
                      }}
                    >
                      <div
                        className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-center mt-2 text-sm text-gray-300 font-medium">
                        {item.label}
                      </div>
                    </div>
                  );
                })}

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                      <stop
                        offset="100%"
                        stopColor="#8B5CF6"
                        stopOpacity="0.5"
                      />
                    </linearGradient>
                  </defs>
                  {[0, 120, 240].map((angle, index) => {
                    const nextAngle = (angle + 120) % 360;
                    const radius = 150;
                    const x1 =
                      50 + (Math.cos((angle * Math.PI) / 180) * radius) / 4;
                    const y1 =
                      50 + (Math.sin((angle * Math.PI) / 180) * radius) / 4;
                    const x2 =
                      50 + (Math.cos((nextAngle * Math.PI) / 180) * radius) / 4;
                    const y2 =
                      50 + (Math.sin((nextAngle * Math.PI) / 180) * radius) / 4;

                    return (
                      <line
                        key={index}
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Card Masonry Layout */}
      <section id="features" className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">
              Revolutionary
              <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Technology Stack
              </span>
            </h2>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-auto">
            {/* Large Feature Card */}
            <div className="md:col-span-2 lg:row-span-2 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all duration-500">
              <Brain className="h-16 w-16 text-primary-400 mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                AI Verification Engine
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Advanced machine learning algorithms verify identities, validate
                documents, and detect fraud with 99.8% accuracy.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "OCR Scanning",
                  "Face Recognition",
                  "Fraud Detection",
                  "Real-time Analysis",
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 rounded-xl p-3 text-center"
                  >
                    <div className="text-sm font-medium text-white">
                      {feature}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medium Cards */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition-all duration-500">
              <Lock className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Blockchain Security
              </h3>
              <p className="text-gray-300 text-sm">
                Immutable records on Algorand blockchain
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition-all duration-500">
              <Heart className="h-12 w-12 text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Impact Tracking
              </h3>
              <p className="text-gray-300 text-sm">
                Real-time donation tracking and proof
              </p>
            </div>

            {/* Tall Card */}
            <div className="lg:row-span-2 bg-gradient-to-b from-purple-500/20 to-indigo-500/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition-all duration-500">
              <Target className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">
                Smart Matching
              </h3>
              <p className="text-gray-300 text-sm mb-6">
                AI matches donors with verified beneficiaries
              </p>
              <div className="space-y-3">
                {[
                  { label: "Accuracy", value: "99.8%" },
                  { label: "Speed", value: "<2s" },
                  { label: "Success", value: "100%" },
                ].map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                    <span className="text-white font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wide Card */}
            <div className="md:col-span-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition-all duration-500">
              <Zap className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-300 text-sm">
                Process donations in under 2 seconds with minimal fees
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Timeline Spiral */}
      <section id="process" className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">
              The Journey of
              <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Transparent Giving
              </span>
            </h2>
          </div>

          {/* Spiral Timeline */}
          <div className="relative">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 600"
            >
              <defs>
                <linearGradient
                  id="spiralGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <path
                d="M 100 300 Q 200 100 400 150 Q 600 200 650 350 Q 600 500 400 450 Q 200 400 250 300"
                stroke="url(#spiralGradient)"
                strokeWidth="3"
                fill="none"
                className="animate-pulse"
              />
            </svg>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
              {[
                {
                  step: 1,
                  title: "Request & Verify",
                  description:
                    "Beneficiaries submit requests with AI-powered identity verification",
                  icon: Users,
                  color: "from-blue-500 to-cyan-500",
                  position: "top-0 left-0",
                },
                {
                  step: 2,
                  title: "NGO Validation",
                  description:
                    "Trusted NGOs review and validate requests for authenticity",
                  icon: CheckCircle,
                  color: "from-green-500 to-emerald-500",
                  position: "top-0 right-0",
                },
                {
                  step: 3,
                  title: "Secure Donation",
                  description:
                    "Donors fund verified requests with blockchain transparency",
                  icon: Heart,
                  color: "from-red-500 to-pink-500",
                  position: "bottom-0 left-1/2 transform -translate-x-1/2",
                },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-primary-400 mb-2">
                          STEP {step.step}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Floating Island */}
      <section className="relative py-32 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-[3rem] blur-3xl" />
            <div className="relative bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-xl border border-white/20 rounded-[3rem] p-16 text-center">
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-6 py-3 mb-6">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-white font-medium">
                    Join 10,000+ Users
                  </span>
                </div>
                <h2 className="text-5xl font-black text-white mb-6">
                  Ready to Make
                  <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                    Real Impact?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join the revolution of transparent giving. Every donation
                  tracked, every impact verified.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/login"
                  className="group relative overflow-hidden bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Start Your Journey</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <button className="border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Shield className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                TrustAid
              </span>
            </div>
            <p className="text-gray-400 mb-8">
              Revolutionizing charitable giving with AI verification and
              blockchain transparency.
            </p>
            <div className="flex justify-center space-x-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-white transition-colors">
                API
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
