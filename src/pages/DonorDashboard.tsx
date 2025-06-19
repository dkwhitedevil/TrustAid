import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, TrendingUp, Shield, Search, Filter, ExternalLink, Star, Award, Users, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DonorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const verifiedRequests = [
    {
      id: '1',
      title: 'Medical Treatment for Diabetes',
      beneficiaryName: 'Sarah Johnson',
      amount: 500,
      funded: 0,
      aiScore: 95,
      ngoApproved: true,
      category: 'medical',
      urgency: 'high',
      location: 'New York, NY',
      description: 'Need insulin and medical supplies for diabetes management',
      documents: 4,
      daysLeft: 12,
      supporters: 0,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      title: 'School Supplies for Children',
      beneficiaryName: 'Michael Rodriguez',
      amount: 200,
      funded: 75,
      aiScore: 92,
      ngoApproved: true,
      category: 'education',
      urgency: 'medium',
      location: 'Los Angeles, CA',
      description: 'Books and supplies for 3 children starting new school year',
      documents: 3,
      daysLeft: 20,
      supporters: 3,
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      title: 'Emergency Food Support',
      beneficiaryName: 'Lisa Williams',
      amount: 300,
      funded: 200,
      aiScore: 88,
      ngoApproved: true,
      category: 'food',
      urgency: 'high',
      location: 'Chicago, IL',
      description: 'Food assistance for family of 5 after job loss',
      documents: 5,
      daysLeft: 8,
      supporters: 8,
      image: 'https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg?w=400&h=250&fit=crop'
    }
  ];

  const myDonations = [
    {
      id: '1',
      title: 'Clean Water Project',
      amount: 250,
      date: '2024-01-15',
      status: 'delivered',
      txHash: '0x1234...5678',
      beneficiary: 'Community Well Initiative'
    },
    {
      id: '2',
      title: 'Medical Equipment',
      amount: 500,
      date: '2024-01-10',
      status: 'in-progress',
      txHash: '0xabcd...efgh',
      beneficiary: 'Regional Health Center'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'medical', name: 'Medical' },
    { id: 'education', name: 'Education' },
    { id: 'food', name: 'Food & Nutrition' },
    { id: 'shelter', name: 'Shelter' }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medical': return 'bg-blue-100 text-blue-800';
      case 'education': return 'bg-purple-100 text-purple-800';
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'shelter': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12 slide-up">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600 text-lg">Discover verified requests and track your impact</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card-hover glass-effect rounded-2xl p-6 border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Total Donated</h3>
                <div className="p-2 bg-red-100 rounded-xl">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">$2,450</div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">Across 8 requests</span>
              </div>
            </div>
          </div>

          <div className="card-hover glass-effect rounded-2xl p-6 border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Lives Impacted</h3>
                <div className="p-2 bg-green-100 rounded-xl">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">23</div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">People helped</span>
              </div>
            </div>
          </div>

          <div className="card-hover glass-effect rounded-2xl p-6 border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Success Rate</h3>
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600">Verified deliveries</span>
              </div>
            </div>
          </div>

          <div className="card-hover glass-effect rounded-2xl p-6 border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Active Donations</h3>
                <div className="p-2 bg-purple-100 rounded-xl">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">In progress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="glass-effect rounded-2xl p-6 border border-white/20 mb-12">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search verified requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Verified Requests */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Verified Requests</h2>
            {verifiedRequests.map((request) => (
              <div key={request.id} className="card-hover glass-effect rounded-2xl overflow-hidden border border-white/20">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={request.image}
                    alt={request.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(request.category)}`}>
                      {request.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency} priority
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Shield className="h-3 w-3" />
                    <span>NGO Verified</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900 mb-1">{request.title}</h3>
                      <p className="text-gray-600">by {request.beneficiaryName}</p>
                      <p className="text-sm text-gray-500 mt-1">{request.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${request.amount}</div>
                      <div className="text-sm text-green-600 font-medium">AI: {request.aiScore}%</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">{request.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Funding Progress</span>
                      <span className="font-medium">${request.funded} / ${request.amount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((request.funded / request.amount) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{request.daysLeft} days left</span>
                      <span>{request.supporters} supporters</span>
                      <span>{request.documents} docs</span>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                      Fund Request
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Recent Donations */}
            <div className="glass-effect rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Donations</h3>
              <div className="space-y-4">
                {myDonations.map((donation) => (
                  <div key={donation.id} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{donation.title}</h4>
                        <p className="text-sm text-gray-600">{donation.beneficiary}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        donation.status === 'delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {donation.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">${donation.amount}</span>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/donations/${donation.id}`}
                          className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                        >
                          Track
                        </Link>
                        <a
                          href={`https://algoexplorer.io/tx/${donation.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Verify</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Browse All CTA */}
            <Link
              to="/view-requests"
              className="block w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-center py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Browse All Requests
            </Link>

            {/* Impact Summary */}
            <div className="glass-effect rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-bold text-gray-900">$750</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lives Touched</span>
                  <span className="font-bold text-gray-900">5 people</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-bold text-green-600">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;