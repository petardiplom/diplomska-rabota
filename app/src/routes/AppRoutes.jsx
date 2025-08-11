import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import ProtectedLayout from "../layouts/ProtectedLayout";
import Centers from "../pages/Centers";
import CenterLayout from "../layouts/CenterLayout";
import ArchivedServices from "../pages/archived/ArchivedServices";
import GeneralInformation from "../pages/generalInformation";
import Gallery from "../pages/gallery";
import Staff from "../pages/staff";
import ReservationCalendar from "../pages/calendar";
import Customers from "../pages/customers";
import ArchivedCustomers from "../pages/archived/ArchivedCustomers";
import Services from "../pages/services";
import CenterSchedule from "../pages/schedule/CenterSchedule";
import StaffSchedule from "../pages/schedule/StaffSchedule";
import Orders from "../pages/orders";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/centers" element={<Centers />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/centers/:centerId" element={<CenterLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="calendar" element={<ReservationCalendar />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/archived" element={<ArchivedCustomers />} />
          <Route path="services" element={<Services />} />
          <Route path="services/archived" element={<ArchivedServices />} />
          <Route path="staff" element={<Staff />} />
          <Route path="staff/:staffId/schedule" element={<StaffSchedule />} />
          <Route path="schedule" element={<CenterSchedule />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="general-information" element={<GeneralInformation />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
