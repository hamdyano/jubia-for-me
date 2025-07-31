import { useAuth } from "@/contexts/AuthContext";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function DashboardPage() {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const navigate = useNavigate();


  if (!isAuthenticated) {
    navigate('/sign-in');
    return null;
  }
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/sign-in');
    }
  }, [navigate]);

return (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <h1 className="text-3xl font-bold">Dashboard</h1>
    <p>Welcome {userEmail}!</p>
    <button 
      onClick={() => {
        logout();
        navigate('/sign-in');
      }}
      className="mt-4 px-4 py-2 bg-red-500 rounded"
    >
      Logout
    </button>
  </div>
);
}