import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './component/Navbar';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from './store/useTheme';

function App() {
  const { checkAuth, authUser, isCheckingAuth ,onlineUsers} = useAuthStore();
  

  const {theme} = useThemeStore()
     
  console.log(onlineUsers);
  

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
console.log(checkAuth);



  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
console.log('auth user', authUser);

  
  console.log(theme);
  

  return (
    <>
      <div data-theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={authUser ? <SettingPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </div>

      {/* Toast Container */}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
