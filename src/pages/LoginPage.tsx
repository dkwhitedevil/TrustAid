import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Users,
  Building,
  Heart,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import { useUser, User, UserRole } from "../contexts/UserContext";

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    walletAddress: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const { login } = useUser();
  const navigate = useNavigate();

  const roles = [
    {
      id: "beneficiary" as UserRole,
      title: "Beneficiary",
      subtitle: "Request Support",
      description: "Get verified aid through our AI-powered platform",
      icon: Users,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "AI Identity Verification",
        "Fast Approval Process",
        "Transparent Tracking",
        "Global Reach",
      ],
      stats: { users: "5K+", success: "98%", time: "24h" },
    },
    {
      id: "ngo" as UserRole,
      title: "NGO Partner",
      subtitle: "Validate & Deliver",
      description: "Streamline verification and impact reporting",
      icon: Building,
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      features: [
        "Smart Verification Tools",
        "Automated Reporting",
        "Impact Analytics",
        "Donor Relations",
      ],
      stats: { partners: "200+", verified: "10K+", efficiency: "85%" },
    },
    {
      id: "donor" as UserRole,
      title: "Donor",
      subtitle: "Fund & Track",
      description: "Make verified donations with complete transparency",
      icon: Heart,
      color: "red",
      gradient: "from-red-500 to-pink-500",
      features: [
        "Verified Recipients",
        "Blockchain Transparency",
        "Real Impact Tracking",
        "Tax Benefits",
      ],
      stats: { donated: "$2M+", lives: "25K+", transparency: "100%" },
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      role: selectedRole,
      walletAddress: formData.walletAddress || undefined,
      verified: true,
    };

    login(userData);

    // Navigate to appropriate dashboard
    switch (selectedRole) {
      case "beneficiary":
        navigate("/beneficiary");
        break;
      case "ngo":
        navigate("/ngo");
        break;
      case "donor":
        navigate("/donor");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-500/20 rounded-full blur-2xl animate-bounce-gentle" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl">
                  <Shield className="h-16 w-16 text-primary-400" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-6">
              <span className="block text-white">Choose Your</span>
              <span className="block bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                Impact Path
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join the revolution of transparent giving. Select your role and
              start making a verified difference today.
            </p>
          </div>

          {!selectedRole ? (
            /* Role Selection - Hexagonal Layout */
            <div className="relative">
              {/* Center connecting element */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center z-10">
                <Sparkles className="h-12 w-12 text-white animate-pulse" />
              </div>

              {/* Role Cards in Triangle Formation */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
                {roles.map((role, index) => {
                  const Icon = role.icon;
                  return (
                    <div
                      key={role.id}
                      className={`group relative cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                        index === 0
                          ? "lg:translate-y-0"
                          : index === 1
                          ? "lg:translate-y-16"
                          : "lg:translate-y-0"
                      }`}
                      onClick={() => {
                        setSelectedRole(role.id);
                        setCurrentStep(1);
                      }}
                    >
                      {/* Glow Effect */}
                      <div
                        className={`absolute -inset-2 bg-gradient-to-r ${role.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                      />

                      {/* Main Card */}
                      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 h-full">
                        {/* Icon */}
                        <div
                          className={`w-20 h-20 bg-gradient-to-r ${role.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="h-10 w-10 text-white" />
                        </div>

                        {/* Content */}
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {role.title}
                          </h3>
                          <p
                            className={`text-${role.color}-400 font-semibold mb-3`}
                          >
                            {role.subtitle}
                          </p>
                          <p className="text-gray-300 leading-relaxed">
                            {role.description}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-3 mb-6">
                          {role.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-sm text-gray-300"
                            >
                              <CheckCircle
                                className={`h-4 w-4 text-${role.color}-400 mr-3 flex-shrink-0`}
                              />
                              {feature}
                            </div>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                          {Object.entries(role.stats).map(
                            ([key, value], idx) => (
                              <div key={idx} className="text-center">
                                <div className="text-lg font-bold text-white">
                                  {value}
                                </div>
                                <div className="text-xs text-gray-400 capitalize">
                                  {key}
                                </div>
                              </div>
                            )
                          )}
                        </div>

                        {/* Action Button */}
                        <div className="mt-6 text-center">
                          <div
                            className={`inline-flex items-center space-x-2 bg-gradient-to-r ${role.gradient} text-white px-6 py-3 rounded-full font-semibold group-hover:shadow-lg transition-all`}
                          >
                            <span>Select {role.title}</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Form Section - Sliding Panel */
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                  {(() => {
                    const selectedRoleData = roles.find(
                      (r) => r.id === selectedRole
                    );
                    const Icon = selectedRoleData?.icon || Users;
                    return (
                      <div className="space-y-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${selectedRoleData?.gradient} rounded-2xl flex items-center justify-center mx-auto`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">
                          Welcome, {selectedRoleData?.title}!
                        </h2>
                        <p className="text-gray-300">
                          Complete your profile to unlock your impact potential
                        </p>
                      </div>
                    );
                  })()}
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center space-x-4 mb-10">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                          currentStep >= step
                            ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                            : "bg-white/20 text-gray-400"
                        }`}
                      >
                        {currentStep > step ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          step
                        )}
                      </div>
                      {step < 3 && (
                        <div
                          className={`w-12 h-1 mx-2 rounded-full transition-all ${
                            currentStep > step
                              ? "bg-gradient-to-r from-primary-500 to-secondary-500"
                              : "bg-white/20"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-white">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-white placeholder-gray-400"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-white">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-white placeholder-gray-400"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {selectedRole === "donor" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-white">
                        Wallet Address (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.walletAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            walletAddress: e.target.value,
                          })
                        }
                        className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-white placeholder-gray-400"
                        placeholder="Connect wallet later or enter address"
                      />
                      <p className="text-sm text-gray-400">
                        You can connect your wallet later from the dashboard
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-8">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRole(null);
                        setCurrentStep(0);
                      }}
                      className="flex-1 px-6 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
                    >
                      Back to Roles
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-8 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      <span>Launch Dashboard</span>
                      <Zap className="h-5 w-5" />
                    </button>
                  </div>
                </form>

                {/* Trust Indicators */}
                <div className="mt-10 pt-8 border-t border-white/20">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    {[
                      {
                        icon: Shield,
                        label: "Bank-Level Security",
                        value: "256-bit",
                      },
                      { icon: Star, label: "User Rating", value: "4.9/5" },
                      { icon: CheckCircle, label: "Uptime", value: "99.9%" },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="space-y-2">
                          <Icon className="h-6 w-6 text-primary-400 mx-auto" />
                          <div className="text-lg font-bold text-white">
                            {item.value}
                          </div>
                          <div className="text-xs text-gray-400">
                            {item.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-12 text-gray-400">
            <p className="text-sm">
              By continuing, you agree to our{" "}
              <a href="#" className="text-primary-400 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary-400 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
