import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, TrendingUp, Eye, Wallet, CheckCircle, Clock, Users, Award, Star, MapPin, Filter, Zap, Target, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';

const DonorDashboard: React.FC = () => {
  const [connectedWallet, setConnectedWallet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const verifiedRequests = [
    {
      id: '1',
      beneficiaryName: 'Sarah Johnson',
      title: 'Medical Emergency Support',
      amount: 500,
      raised: 120,
      donors: 8,
      aiScore: 92,
      ngoVerified: true,
      category: 'Medical',
      urgency: 'High',
      description: 'Urgent medical treatment needed for chronic condition',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400',
      timeLeft: '5 days',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: '2',
      beneficiaryName: 'Michael Chen',
      title: 'Food Assistance Package',
      amount: 150,
      raised: 150,
      donors: 12,
      aiScore: 88,
      ngoVerified: true,
      category: 'Food',
      urgency: 'Medium',
      description: 'Family needs food assistance for the month',
      location: 'Los Angeles, CA',
      image: 'https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg?auto=compress&cs=tinysrgb&w=400',
      timeLeft: 'Funded',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    {
      id: '3',
      beneficiaryName: 'Lisa Rodriguez',
      title: 'Education Support',
      amount: 300,
      raised: 75,
      donors: 5,
      aiScore: 95,
      ngoVerified: true,
      category: 'Education',
      urgency: 'Low',
      description: 'School supplies and textbooks needed for semester',
      location: 'Chicago, IL',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
      timeLeft: '12 days',
      coordinates: { lat: 41.8781, lng: -87.6298 }
    }
  ];

  const myDonations = [
    {
      id: '1',
      title: 'Education Support',
      amount: 50,
      status: 'completed' as const,
      txHash: '0x1234567890abcdef',
      date: '2024-01-10',
      beneficiary: 'Lisa Rodriguez',
      impact: 'Helped purchase textbooks'
    },
    {
      id: '2',
      title: 'Food Assistance',
      amount: 25,
      status: 'pending' as const,
      txHash: '0xabcdef1234567890',
      date: '2024-01-15',
      beneficiary: 'Michael Chen',
      impact: 'Food delivery in progress'
    }
  ];

  const categories = ['all', 'Medical', 'Food', 'Education', 'Housing', 'Emergency'];
  const filteredRequests = selectedCategory === 'all' 
    ? verifiedRequests 
    : verifiedRequests.filter(req => req.category === selectedCategory);

  const connectWallet = () => {
    setConnectedWallet(true);
  };

  const donateToRequest = (requestId: string, amount: number) => {
    console.log(`Donating $${amount} to request ${requestId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      {/* Hero Section with Floating Elements */}
      <div className="relative pt-8 pb-16 overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-2xl animate-bounce-gentle" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-bounce-gentle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-bounce-gentle" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-6">
              <Heart className="h-5 w-5 text-red-400 animate-pulse" />
              <span className="text-white font-medium">Make a Difference Today</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-6">
              <span className="block text-white">Your</span>
              <span className="block bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Giving Power
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Fund verified requests and track your impact with complete transparency
            </p>
          </div>

          {/* Wallet Connection */}
          <div className="flex justify-center mb-12">
            {!connectedWallet ? (
              <button
                onClick={connectWallet}
                className="group relative overflow-hidden bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:scale-105 shadow-2xl"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <Wallet className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span>Connect Wallet</span>
                  <Zap className="h-5 w-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ) : (
              <div className="flex items-center space-x-4 bg-green-500/20 border border-green-500/30 text-green-300 px-8 py-4 rounded-2xl backdrop-blur-xl">
                <CheckCircle className="h-6 w-6" />
                <span className="font-bold text-lg">Wallet Connected</span>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Orbital Layout */}
      <div className="relative -mt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-96">
            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl z-10">
              <Heart className="h-16 w-16 text-white animate-pulse" />
            </div>

            {/* Orbiting Stats */}
            {[
              { 
                label: 'Total Donated', 
                value: '$275', 
                icon: DollarSign,
                gradient: 'from-blue-500 to-cyan-500',
                angle: 0,
                radius: 140
              },
              { 
                label: 'Lives Impacted', 
                value: '23', 
                icon: Users,
                gradient: 'from-green-500 to-emerald-500',
                angle: 90,
                radius: 140
              },
              { 
                label: 'Requests Funded', 
                value: '8', 
                icon: Target,
                gradient: 'from-purple-500 to-indigo-500',
                angle: 180,
                radius: 140
              },
              { 
                label: 'Trust Score', 
                value: '98%', 
                icon: Star,
                gradient: 'from-yellow-500 to-orange-500',
                angle: 270,
                radius: 140
              }
            ].map((stat, index) => {
              const Icon = stat.icon;
              const x = Math.cos((stat.angle * Math.PI) / 180) * stat.radius;
              const y = Math.sin((stat.angle * Math.PI) / 180) * stat.radius;
              
              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group animate-bounce-gentle"
                  style={{
                    transform: `translate(${x - 50}%, ${y - 50}%)`,
                    animationDelay: `${index * 0.5}s`
                  }}
                >
                  <div className={`absolute -inset-2 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500`} />
                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all transform hover:scale-110 duration-300 min-w-[140px]">
                    <div className={`w-10 h-10 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-white">{stat.value}</div>
                      <div className="text-xs text-gray-300 font-medium">{stat.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Connecting Orbits */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <circle
                cx="50%"
                cy="50%"
                r="140"
                stroke="url(#orbitGradient)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Verified Requests</h2>
                    <p className="text-gray-300">AI-verified and NGO-approved opportunities</p>
                  </div>
                  
                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-2 bg-white/10 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === 'grid' 
                          ? 'bg-primary-500 text-white' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === 'map' 
                          ? 'bg-primary-500 text-white' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      Map
                    </button>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex items-center space-x-4">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category} className="bg-gray-900">
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requests Display */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            /* Masonry Grid Layout */
            <div className="columns-1 md:columns-2 xl:columns-3 gap-8 space-y-8">
              {filteredRequests.map((request, index) => (
                <div key={request.id} className="break-inside-avoid group">
                  <div className="relative">
                    <div className={`absolute -inset-2 bg-gradient-to-r ${
                      request.urgency === 'High' ? 'from-red-500/20 to-pink-500/20' :
                      request.urgency === 'Medium' ? 'from-yellow-500/20 to-orange-500/20' :
                      'from-green-500/20 to-emerald-500/20'
                    } rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                    
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:bg-white/15 transition-all transform hover:-translate-y-2 duration-300">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={request.image} 
                          alt={request.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full text-white ${
                            request.urgency === 'High' ? 'bg-red-500' :
                            request.urgency === 'Medium' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}>
                            {request.urgency} Priority
                          </span>
                          {request.ngoVerified && (
                            <span className="bg-blue-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                              NGO Verified
                            </span>
                          )}
                        </div>
                        
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-900">
                          {request.timeLeft}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                            {request.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-300">
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{request.beneficiaryName}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{request.location}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed">{request.description}</p>

                        {/* Progress */}
                        <div>
                          <div className="flex justify-between text-sm text-gray-300 mb-2">
                            <span>${request.raised} raised</span>
                            <span>{request.donors} donors</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                request.raised >= request.amount ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-primary-500 to-secondary-500'
                              }`}
                              style={{ width: `${Math.min((request.raised / request.amount) * 100, 100)}%` }}
                            />
                          </div>
                        </div>

                        {/* AI Score */}
                        <div className="flex items-center justify-between">
                          <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-bold">
                            AI Score: {request.aiScore}%
                          </div>
                          <div className="text-2xl font-black text-white">${request.amount}</div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-3 pt-4">
                          <button
                            onClick={() => donateToRequest(request.id, 25)}
                            className="flex-1 px-4 py-3 border-2 border-primary-500 text-primary-400 rounded-xl hover:bg-primary-500/20 transition-all font-bold"
                          >
                            $25
                          </button>
                          <button
                            onClick={() => donateToRequest(request.id, 50)}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all font-bold"
                          >
                            $50
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Map View */
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur-xl" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-primary-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Interactive Map View</h3>
                  <p className="text-gray-300">Map integration coming soon - visualize global impact</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Donations Ticker */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">Your Recent Impact</h2>
                  <p className="text-gray-300">Track your contributions and their outcomes</p>
                </div>
                <Link
                  to="/donation-tracker"
                  className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 font-bold hover:bg-primary-500/20 px-4 py-2 rounded-lg transition-all"
                >
                  <span>View All</span>
                  <TrendingUp className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="p-6 space-y-6">
                {myDonations.map((donation) => (
                  <div key={donation.id} className="group flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                          {donation.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          <span>${donation.amount} to {donation.beneficiary}</span>
                          <StatusBadge status={donation.status} size="sm" />
                        </div>
                        <p className="text-sm text-gray-400">{donation.impact}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="text-primary-400 hover:text-primary-300 font-medium text-sm hover:bg-primary-500/20 px-3 py-2 rounded-lg transition-all">
                        View Tx: {donation.txHash.substring(0, 10)}...
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
