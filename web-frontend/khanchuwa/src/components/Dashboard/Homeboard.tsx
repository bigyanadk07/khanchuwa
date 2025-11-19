import React from 'react';


// Custom useAuth hook
import { useAuth } from '../../context/AuthContext';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className={`text-sm mt-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change} {trend === 'up' ? '↗' : '↘'}
        </p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </div>
);

const Homeboard: React.FC = () => {

        const { isAuthenticated, user, logout } = useAuth();
      
      const getUserDisplayName = () => {
        if (user?.firstName && user?.lastName) {
          return `${user.firstName} ${user.lastName}`;
        }
        if (user?.name) {
          return user.name;
        }
        return 'User';
      };
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      trend: 'up' as const,
      icon: '👥'
    },
    {
      title: 'Total Places',
      value: '1,234',
      change: '+8%',
      trend: 'up' as const,
      icon: '🏢'
    },
    {
      title: 'Active Sessions',
      value: '892',
      change: '-3%',
      trend: 'down' as const,
      icon: '🔗'
    },
    {
      title: 'Revenue',
      value: '$24,567',
      change: '+23%',
      trend: 'up' as const,
      icon: '💰'
    }
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'added new place', time: '2 min ago' },
    { id: 2, user: 'Sarah Smith', action: 'updated profile', time: '5 min ago' },
    { id: 3, user: 'Mike Johnson', action: 'created account', time: '10 min ago' },
    { id: 4, user: 'Emily Davis', action: 'deleted place', time: '15 min ago' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{getUserDisplayName()}</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">👤</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user} <span className="font-normal text-gray-600">{activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border-b">
              <span className="text-gray-600">Places Pending Review</span>
              <span className="font-bold text-yellow-600">23</span>
            </div>
            <div className="flex justify-between items-center p-3 border-b">
              <span className="text-gray-600">New Users Today</span>
              <span className="font-bold text-green-600">47</span>
            </div>
            <div className="flex justify-between items-center p-3 border-b">
              <span className="text-gray-600">System Health</span>
              <span className="font-bold text-green-600">Excellent</span>
            </div>
            <div className="flex justify-between items-center p-3">
              <span className="text-gray-600">API Calls</span>
              <span className="font-bold text-blue-600">1.2K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeboard;