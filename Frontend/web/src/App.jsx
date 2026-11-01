import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';


import Explore from './guest/pages/Explore';
import Login from './guest/pages/Login';
import Bookings from './guest/pages/Bookings';
import Reviews from './guest/pages/Reviews';
import Details from './guest/pages/Details';
import HostRegistration from './guest/pages/HostRegistration';
import Profile from './guest/pages/Profile';
import GuestRegistration from './guest/pages/GuestRegistration';


import Dashboard from './houseadmin/pages/Dashboard';
import HouseAdminBookings from './houseadmin/pages/Bookings';
import HouseAdminListings from './houseadmin/pages/Listings';
import AddListing from './houseadmin/pages/Listings/AddListing';

import Overview from './appadmin/pages/Overview';
import AppAdminListings from './appadmin/pages/Listings';
import HouseAdmins from './appadmin/pages/HouseAdmins';



export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/guest-registration" element={<GuestRegistration />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/details" element={<Details />} />
          <Route path="/host-registration" element={<HostRegistration />} />
          <Route path="/profile" element={<Profile />} />


          <Route path="/houseadmin/dashboard" element={<Dashboard />} />
          <Route path="/houseadmin/bookings" element={<HouseAdminBookings />} />
          <Route path="/houseadmin/listings" element={<HouseAdminListings />} />
          <Route path="/houseadmin/add-listing" element={<AddListing />} />

          <Route path="/appadmin/overview" element={<Overview />} />
          <Route path="/appadmin/listings" element={<AppAdminListings />} />
          <Route path="/appadmin/houseadmins" element={<HouseAdmins />} />



          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
