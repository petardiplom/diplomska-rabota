import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import ProtectedLayout from '../layouts/ProtectedLayout';
import Calendar from '../pages/Calendar';
import Centers from '../pages/Centers';
import CenterLayout from '../layouts/CenterLayout';
import Service from '../pages/Service';
import ServiceClient from '../pages/ServiceClient';

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Auth />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/centers" element={<Centers />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/centers/:centerId" element={<CenterLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path='services' element={<ServiceClient /> } />
        </Route>
        
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
