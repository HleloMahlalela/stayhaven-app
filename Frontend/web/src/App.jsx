import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Explore from './guest/pages/Explore'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="*" element={<Navigate to="/explore" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
