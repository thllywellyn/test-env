import React, { useState } from "react";
import HR from "../Login/Images/HR.svg";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import Radiobtn from "../Components/RadioBtn/Radiobtn";
import Header from "../Home/Header/Header";

export default function Login() {
  // State to hold user input and errors
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState('');
  const [err, setErr] = useState('');


  const navigate=useNavigate()

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://test-env-0xqt.onrender.com/api/${userType}/login`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Email: Email,
          Password: Password
        }),
      });

      const responseData = await response.json();
      
      if (response.ok) {
        // Store tokens in localStorage
        if (responseData.data.accessToken) {
          localStorage.setItem('accessToken', responseData.data.accessToken);
          localStorage.setItem('user', JSON.stringify(responseData.data.user));
        }

        const userid = responseData.data.user._id;
        // Rest of your navigation logic
        if(responseData.data.user.Isapproved === "pending"){
          if(responseData.data.user.Teacherdetails || responseData.data.user.Studentdetails){
            navigate('/pending')
          }else{
            if(userType === 'student'){
              navigate(`/StudentDocument/${userid}`)
            }else if(userType === 'teacher'){
              navigate(`/TeacherDocument/${userid}`)
            }
          }
        }else if(responseData.data.user.Isapproved === "approved"){
          if(userType === 'student'){
            navigate(`/Student/Dashboard/${userid}/Search`)
          }else if(userType === 'teacher'){
            navigate(`/Teacher/Dashboard/${userid}/Home`)
          }
        }else if(responseData.data.user.Isapproved === "reupload"){
          if(userType === 'teacher'){
            navigate(`/rejected/${userType}/${userid}`)
          }else{
            navigate(`/rejected/${userType}/${userid}`)
          }
        }else{
          setErr('You are ban from our platform!');
        }

      } else {
        setErr(responseData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErr('Network error or server not responding');
    }
  };

  return (
    <>
    <Header/>
    <section className="main">
      <div className="container">
        {/* <div className="logo">
          <img src="" alt="" />
          <h1 className="head">Logo</h1>
        </div> */}
        {/* headings */}
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
                placeholder="Email Address"
                className="input-0"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
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

            {/* radio buttons */}
            <div className="radio-btn">
              <Radiobtn  userType={userType} setUserType={setUserType}  />
            </div>

            <div className="signup-link">
              <span>Don't have an account? </span>
              <NavLink to="/signup" className="link text-yellow-400 text-semibold text-md ">
                signup
              </NavLink>
            </div>

            <div className="text-yellow-400 text-semibold pt-3 cursor-pointer" onClick={()=>navigate('/forgetpassword')} >
              Forget Password?
            </div>

            {/* btns */}
            <div className="btns">
              <button type="submit" className="btns-1">
                Log In
              </button>
            </div>
            {err != '' && (
              <p className="text-red-400 text-sm">{err}</p>
            )}
            {/* {errors.general && (
              <div className="error-message">{errors.general}</div>
            )} */}
          </form>
        </div>
      </div>

      {/* image */}
      <div className="img-3">
        <img src={HR} width={600} alt="" />
      </div>
    </section>
    </>
  );
 
}
