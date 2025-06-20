import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock, CheckCircle, AlertTriangle, Eye, TrendingUp, DollarSign, Users, Award, Zap, Target, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';

const BeneficiaryDashboard: React.FC = () => {
  const [requests] = useState([
    {
      id: '1',
      title: 'Medical Emergency Support',
      amount: 500,
      status: 'pending' as const,
      aiScore: 92,
      submittedAt: '2024-01-15',
      category: 'Medical',
      progress: 0,
      donors: 0,
      urgency: 'high'
    },
    {
      id: '2',
      title: 'Food Assistance',
      amount: 150,
      status: 'approved' as const,
      aiScore: 88,
      submittedAt: '2024-01-10',
      category: 'Food',
      progress: 75,
      donors: 8,
      urgency: 'medium'
    },
    {
      id: '3',
      title: 'Education Support',
      amount: 300,
      status: 'completed' as const,
      aiScore: 95,
      submittedAt: '2024-01-05',
      category: 'Education',
      progress: 100,
      donors: 12,
      urgency: 'low'
    }
  ]);

  const totalRequested = requests.reduce((sum, req) => sum + req.amount, 0);
  const totalReceived = requests
    .filter(req => req.status === 'completed')
    .reduce((sum, req) => sum + req.amount, 0);
  const totalDonors = requests.reduce((sum, req) => sum + req.donors, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <Navbar />
      
      {/* Floating Header */}
      <div className="relative pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-black text-white">
                        Your Impact Hub
                      </h1>
                      <p className="text-xl text-gray-300">Track requests and celebrate your journey</p>
                    </div>
                  </div>
                </div>
                
                <Link
                  to="/request-aid"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:scale-105 shadow-2xl"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span>New Request</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Constellation */}
      <div className="relative -mt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <line x1="25%" y1="50%" x2="75%" y2="50%" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" />
              <line x1="50%" y1="25%" x2="50%" y2="75%" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            </svg>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  label: 'Total Requested', 
                  value: `$${totalRequested}`, 
                  icon: DollarSign,
                  gradient: 'from-blue-500 to-cyan-500',
                  change: '+12%',
                  position: 'top-left'
                },
                { 
                  label: 'Funds Received', 
                  value: `$${totalReceived}`, 
                  icon: TrendingUp,
                  gradient: 'from-green-500 to-emerald-500',
                  change: '+$300',
                  position: 'top-right'
                },
                { 
                  label: 'Active Requests', 
                  value: requests.filter(r => r.status !== 'completed').length, 
                  icon: Clock,
                  gradient: 'from-yellow-500 to-orange-500',
                  change: '2 pending',
                  position: 'bottom-left'
                },
                { 
                  label: 'Total Supporters', 
                  value: totalDonors, 
                  icon: Heart,
                  gradient: 'from-red-500 to-pink-500',
                  change: '+5 this week',
                  position: 'bottom-right'
                }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="group relative">
                    <div className={`absolute -inset-2 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`} />
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all transform hover:-translate-y-2 duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-xs font-bold text-green-400 bg-green-400/20 px-2 py-1 rounded-full">
                          {stat.change}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-300 mb-1">{stat.label}</div>
                      <div className="text-2xl font-black text-white">{stat.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Carousel */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-8">
                <Zap className="h-6 w-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Submit New Request',
                    description: 'Start your aid request journey',
                    icon: Plus,
                    gradient: 'from-blue-500 to-cyan-500',
                    action: '/request-aid',
                    isLink: true
                  },
                  {
                    title: 'Update Profile',
                    description: 'Keep your information current',
                    icon: AlertTriangle,
                    gradient: 'from-yellow-500 to-orange-500',
                    action: '#',
                    isLink: false
                  },
                  {
                    title: 'Track Donations',
                    description: 'See your funding progress',
                    icon: Eye,
                    gradient: 'from-purple-500 to-pink-500',
                    action: '#',
                    isLink: false
                  }
                ].map((action, index) => {
                  const Icon = action.icon;
                  const Component = action.isLink ? Link : 'button';
                  
                  return (
                    <Component
                      key={index}
                      to={action.isLink ? action.action : undefined}
                      className="group relative block"
                    >
                      <div className={`absolute -inset-1 bg-gradient-to-r ${action.gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-300`} />
                      <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all transform hover:scale-105 duration-300">
                        <div className={`w-14 h-14 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{action.title}</h3>
                        <p className="text-gray-300 text-sm">{action.description}</p>
                      </div>
                    </Component>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requests Timeline */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 p-8 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <Target className="h-6 w-6 text-primary-400" />
                  <h2 className="text-2xl font-bold text-white">Your Request Journey</h2>
                </div>
                <p className="text-gray-300 mt-2">Track the progress of all your aid requests</p>
              </div>

              {/* Timeline */}
              <div className="p-8">
                <div className="space-y-8">
                  {requests.map((request, index) => (
                    <div key={request.id} className="group relative">
                      {/* Timeline Line */}
                      {index < requests.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-primary-500 to-secondary-500 opacity-30" />
                      )}
                      
                      <div className="flex items-start space-x-6">
                        {/* Timeline Dot */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          request.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          request.status === 'approved' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          'bg-gradient-to-r from-yellow-500 to-orange-500'
                        }`}>
                          {request.status === 'completed' ? (
                            <CheckCircle className="h-6 w-6 text-white" />
                          ) : request.status === 'approved' ? (
                            <Clock className="h-6 w-6 text-white" />
                          ) : (
                            <AlertTriangle className="h-6 w-6 text-white" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all group-hover:scale-[1.02] duration-300">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-3">
                                <h3 className="text-xl font-bold text-white">{request.title}</h3>
                                <StatusBadge status={request.status} />
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  request.urgency === 'high' ? 'bg-red-500/20 text-red-300' :
                                  request.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                  'bg-green-500/20 text-green-300'
                                }`}>
                                  {request.urgency} priority
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-6 text-sm text-gray-300 mb-4">
                                <span>Submitted {request.submittedAt}</span>
                                <span>AI Score: {request.aiScore}%</span>
                                {request.donors > 0 && <span>{request.donors} supporters</span>}
                              </div>

                              {/* Progress Bar */}
                              {request.progress > 0 && (
                                <div className="mb-4">
                                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                                    <span>Funding Progress</span>
                                    <span>{request.progress}%</span>
                                  </div>
                                  <div className="w-full bg-white/20 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full transition-all duration-500 ${
                                        request.progress === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-primary-500 to-secondary-500'
                                      }`}
                                      style={{ width: `${request.progress}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="text-right">
                              <div className="text-3xl font-black text-white mb-1">${request.amount}</div>
                              <div className="text-sm text-gray-400">Target Amount</div>
                              {request.progress > 0 && (
                                <div className="text-sm text-green-400 font-bold mt-1">
                                  ${Math.round(request.amount * request.progress / 100)} raised
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Section */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8 text-center">
              <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Your Impact Achievement</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                You've successfully received support from {totalDonors} generous donors, 
                creating a positive impact in your community. Keep building your story!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all backdrop-blur-sm">
                  Share Your Story
                </button>
                <button className="border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">
                  View Impact Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryDashboard;
