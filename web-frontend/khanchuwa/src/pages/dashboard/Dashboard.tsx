import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Dashboard/Sidebar';
import Homeboard from '../../components/Dashboard/Homeboard';
import Placelist from '../../components/Dashboard/Placelist';
import Users from '../../components/Dashboard/Users';


const Dashboard: React.FC = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
            <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route index element={<Homeboard />} />
            <Route path="home" element={<Homeboard />} />
            <Route path="places" element={<Placelist />} />
            <Route path="users" element={<Users />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;