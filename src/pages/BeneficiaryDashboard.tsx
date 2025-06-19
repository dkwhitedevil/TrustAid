import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, CheckCircle, Clock, AlertCircle, Camera, Shield, TrendingUp, Award, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const BeneficiaryDashboard: React.FC = () => {
  const { user } = useAuth();

  const myRequests = [
    {
      id: '1',
      title: 'Medical Treatment for Diabetes',
      amount: 500,
      status: 'approved',
      aiScore: 95,
      submittedAt: '2024-01-15',
      ngoApproved: true,
      funded: true,
      progress: 100,
      supporters: 12
    },
    {
      id: '2',
      title: 'Food Support for Family',
      amount: 200,
      status: 'pending',
      aiScore: 88,
      submittedAt: '2024-01-20',
      ngoApproved: false,
      funded: false,
      progress: 0,
      supporters: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'pending': return Clock;
      case 'rejected': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12 slide-up">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600 text-lg">Manage your aid requests and track their progress</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card-hover glass-effect rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Identity Status</h3>
              <div className="p-2 bg-green-100 rounded-xl">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-lg font-bold text-green-600">Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <span className="text-sm text-gray-600">95%</span>
            </div>
          </div>

          <div className="card-hover glass-effect rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Active Requests</h3>
              <div className="p-2 bg-blue-100 rounded-xl">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">2</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">1 Pending, 1 Approved</span>
            </div>
          </div>

          <div className="card-hover glass-effect rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Total Received</h3>
              <div className="p-2 bg-green-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">$500</div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">From 1 successful request</span>
            </div>
          </div>

          <div className="card-hover glass-effect rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Community Support</h3>
              <div className="p-2 bg-purple-100 rounded-xl">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">12</div>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span className="text-sm text-gray-600">Supporters</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card-hover glass-effect rounded-2xl p-8 border border-white/20 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/request-aid"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl text-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <Plus className="h-8 w-8 mb-4" />
                <div className="font-bold text-lg mb-2">New Request</div>
                <div className="text-blue-100">Submit a new aid request</div>
              </div>
            </Link>

            <button className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl text-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <Camera className="h-8 w-8 mb-4" />
                <div className="font-bold text-lg mb-2">Update ID</div>
                <div className="text-green-100">Re-verify your identity</div>
              </div>
            </button>

            <button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl text-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <FileText className="h-8 w-8 mb-4" />
                <div className="font-bold text-lg mb-2">View History</div>
                <div className="text-purple-100">See all past requests</div>
              </div>
            </button>
          </div>
        </div>

        {/* My Requests */}
        <div className="glass-effect rounded-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900">My Requests</h3>
            <p className="text-gray-600 mt-2">Track the status and progress of your aid requests</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {myRequests.map((request) => {
              const StatusIcon = getStatusIcon(request.status);
              return (
                <div key={request.id} className="p-8 hover:bg-gray-50/50 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold text-xl text-gray-900">{request.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      <p className="text-gray-600">Submitted on {new Date(request.submittedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${request.amount}</div>
                      <div className="text-sm text-green-600 font-medium">AI Score: {request.aiScore}%</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Funding Progress</span>
                      <span className="font-medium">{request.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${request.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">NGO Status</div>
                      <div className="flex items-center space-x-2">
                        {request.ngoApproved ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-600" />
                        )}
                        <span className={`font-medium ${request.ngoApproved ? 'text-green-600' : 'text-yellow-600'}`}>
                          {request.ngoApproved ? 'Approved' : 'Pending Review'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Funding Status</div>
                      <div className="flex items-center space-x-2">
                        {request.funded ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-gray-400" />
                        )}
                        <span className={`font-medium ${request.funded ? 'text-green-600' : 'text-gray-500'}`}>
                          {request.funded ? 'Fully Funded' : 'Awaiting Donors'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Community</div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-900">{request.supporters} Supporters</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">Last updated 2 hours ago</span>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryDashboard;