import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './context/useAuth.jsx';
import Layout from './components/Layout';
import { useAuth } from './context/useAuth.jsx';

// We need to move the protected route inside the app to avoid context issues
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

// Separate component for routes to access auth context
const AppRoutes = () => {
  const { user, loading } = useAuth();
  
  // Protected layout with topbar for authenticated pages
  const AuthenticatedLayout = ({ children }) => {
    return (
      <>
        <Topbar />
        {children}
      </>
    );
  };
  
  // Protected route wrapper function
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div className="loading-screen">Loading...</div>;
    }
    
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
  };
  
  return (
    <Routes>
      <Route path="/" element={
        user ? <ProtectedRoute><Homepage /></ProtectedRoute> : <Navigate to="/login" />
      } />
      <Route path="/posts" element={
        user ? <ProtectedRoute><Homepage /></ProtectedRoute> : <Navigate to="/login" />
      } />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/post/:id" element={
        user ? <ProtectedRoute><Single /></ProtectedRoute> : <Navigate to="/login" />
      } />
      <Route path="/write" element={
        user ? <ProtectedRoute><Write /></ProtectedRoute> : <Navigate to="/login" />
      } />
      <Route path="/settings" element={
        user ? <ProtectedRoute><Settings /></ProtectedRoute> : <Navigate to="/login" />
      } />
    </Routes>
  );
};

export default App;
