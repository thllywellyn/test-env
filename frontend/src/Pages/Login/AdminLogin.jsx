import React, { useState } from "react";
import "./Login.css";
import Admin from './Images/Admin.svg'
import { useNavigate } from "react-router-dom";
import Header from '../Home/Header/Header';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [User, setUser] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!User.trim()) newErrors.User = "User Name is required";
    if (!Password.trim()) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`https://test-env-0xqt.onrender.com/api/admin/login`, {
        method: 'POST',
        credentials: 'include', // Important for cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: User,
          password: Password,
        }),
      });

      const responseData = await response.json();
      console.log('Login response:', response); // Debug log

      if (response.ok) {
        // Store the admin ID properly
        const adminId = responseData.data.admin._id;
        localStorage.setItem('adminId', adminId);
        
        toast.success('Logged in successfully');
        
        // Use the correct parameter name 'id' instead of 'data'
        navigate(`/admin/${adminId}`);
      } else {
        // Handle different error cases
        if (response.status === 401) {
          toast.error('Invalid credentials');
        } else if (response.status === 400) {
          toast.error(responseData.message || 'Admin does not exist');
        } else {
          toast.error('Login failed');
        }
      }
    } catch (error) {
      console.error('Login error details:', error); // Detailed error log
      toast.error('Failed to connect to server');
    }
  };

  return (
    <>
    <Header/>
    <section className="main">
      {/* image */}
      <div className="img-3">
        <img src={Admin} width={500} alt="" />
      </div>
      <div className="container py-5">
        <div className="para1">
          <h2> WELCOME BACK!</h2>
        </div>

        <div className="para">
          <h5> Please Log Into Your Account.</h5>
        </div>

        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-1">
              <input
                type="text"
                placeholder="User name"
                className="input-0"
                value={User}
                onChange={(e) => setUser(e.target.value)}
              />
              {errors.User && (
                <div className="error-message">{errors.User}</div>
              )}
            </div>
            <div className="input-2">
              <input
                type="password"
                placeholder="Password"
                className="input-0"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            {/* btns */}
            <div className="btns">
              <button type="submit" className="btns-1">
                Log In
              </button>
            </div>
            {errors.general && (
              <div className="error-message">{errors.general}</div>
            )}
          </form>
        </div>
      </div>
    </section>
    </>
  );
}
