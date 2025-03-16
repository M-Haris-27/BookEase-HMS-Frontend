import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './Staff_Dashboard/common/Loader';
import PageTitle from './Staff_Dashboard/components/PageTitle';
import ServiceType from './Staff_Dashboard/pages/Services/Service_Type/ServiceType';
import RoomService from './Staff_Dashboard/pages/Services/Room_Service/RoomService';
import Bookings from './Staff_Dashboard/pages/Manage_bookings/Bookings';
import Billing from './Staff_Dashboard/pages/Manage_Billings/Billing';
import Payment from './Staff_Dashboard/pages/Manage_Payments/Payment';
import Feedback from './Staff_Dashboard/pages/Manage_Feedback/Feedback';
import Room from './Staff_Dashboard/pages/Manage_Rooms/Room';
import Staff from './Staff_Dashboard/pages/Manage_Staff/Staff';
import Analytics from './Staff_Dashboard/pages/Dashboard/Analytics';
import Guest from './Staff_Dashboard/pages/Manage_Customer/Guest';
import StaffAssignment from './Staff_Dashboard/pages/Services/Room_Service/StaffAssignment';
import CheckOut from './Staff_Dashboard/pages/Manage_Checkout/CheckOut';
import Invoice from './Staff_Dashboard/pages/Manage_Checkout/Manage_Invoice.tsx/Invoice';
import InvoicePayment from './Staff_Dashboard/pages/Manage_Payments/Payment_Table/InvoicePayment';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Analytics | BookEase - Hotel Management System" />
              <Analytics />
            </>
          }
        />
        <Route
          path="/guestSection"
          element={
            <>
              <PageTitle title="Manage Guest | BookEase - Hotel Management System" />
              <Guest />
            </>
          }
        />
        <Route
          path="/staffSection"
          element={
            <>
              <PageTitle title="Manage Staff | BookEase - Hotel Management System" />
              <Staff />
            </>
          }
        />
        <Route
          path="/roomSection"
          element={
            <>
              <PageTitle title="Manage Rooms | BookEase - Hotel Management System" />
              <Room />
            </>
          }
        />
        <Route
          path="/services/serviceTypes"
          element={
            <>
              <PageTitle title="Service Types | BookEase - Hotel Management System" />
              <ServiceType />
            </>
          }
        />
        <Route
          path="/services/roomService"
          element={
            <>
              <PageTitle title="Room Service | BookEase - Hotel Management System" />
              <RoomService />
            </>
          }
        />
        <Route
          path="/services/staffAssignment"
          element={
            <>
              <PageTitle title="Room Service | BookEase - Hotel Management System" />
              <StaffAssignment />
            </>
          }
        />
        <Route
          path="/bookings"
          element={
            <>
              <PageTitle title="Manage Bookings | BookEase - Hotel Management System" />
              <Bookings />
            </>
          }
        />
        <Route
          path="/billing"
          element={
            <>
              <PageTitle title="Billing | BookEase - Hotel Management System" />
              <Billing />
            </>
          }
        />
        <Route
          path="/checkOut"
          element={
            <>
              <PageTitle title="Check-Out | BookEase - Hotel Management System" />
              <CheckOut />
            </>
          }
        />
        <Route
          path="/invoice"
          element={
            <>
              <PageTitle title="Invoice | BookEase - Hotel Management System" />
              <Invoice />
            </>
          }
        />
        <Route
          path="/payments"
          element={
            <>
              <PageTitle title="Payments | BookEase - Hotel Management System" />
              <Payment />
            </>
          }
        />
        <Route
          path="/invoicePayment"
          element={
            <>
              <PageTitle title="Payments | BookEase - Hotel Management System" />
              <InvoicePayment />
            </>
          }
        />

        <Route
          path="/feedbacks"
          element={
            <>
              <PageTitle title="Feedback | BookEase - Hotel Management System" />
              <Feedback />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
