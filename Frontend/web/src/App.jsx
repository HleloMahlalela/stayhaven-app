import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Explore from './guest/pages/Explore';
import Login from './guest/pages/Login';
import Bookings from './guest/pages/Bookings';
import Reviews from './guest/pages/Reviews';
import Details from './guest/pages/Details';
import Dashboard from './houseadmin/pages/Dashboard';
import Overview from './appadmin/pages/Overview';
import Listings from './appadmin/pages/Listings';
import HouseAdmins from './appadmin/pages/HouseAdmins';

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
          <Route path="/appadmin/overview" element={<Overview />} />
          <Route path="/appadmin/listings" element={<Listings />} />
          <Route path="/appadmin/houseadmins" element={<HouseAdmins />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
