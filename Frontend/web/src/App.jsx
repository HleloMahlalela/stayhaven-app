import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Explore from './guest/pages/Explore';
import Login from './guest/pages/Login';
import Bookings from './guest/pages/Bookings';
import Reviews from './guest/pages/Reviews';
import Details from './guest/pages/Details';
import Dashboard from './houseadmin/pages/Dashboard';
import HouseAdminBookings from './houseadmin/pages/Bookings';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/details" element={<Details />} />
          <Route path="/houseadmin/dashboard" element={<Dashboard />} />
          <Route path="/houseadmin/bookings" element={<HouseAdminBookings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
