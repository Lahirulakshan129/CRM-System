// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LeadsProvider } from './contexts/LeadsContext'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Leads from './pages/Leads'
import LeadDetails from './pages/LeadDetails'
import CreateLead from './pages/CreateLead'
import EditLead from './pages/EditLead'

function App() {
  return (
    <Router>
      <AuthProvider>
        <LeadsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route element={<Navbar />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/leads/:id" element={<LeadDetails />} />
                <Route path="/leads/new" element={<CreateLead />} />
                <Route path="/leads/:id/edit" element={<EditLead />} />
              </Route>
            </Route>
          </Routes>
        </LeadsProvider>
      </AuthProvider>
    </Router>
  )
}

export default App