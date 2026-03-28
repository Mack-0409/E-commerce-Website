import React, { useState } from 'react';
import { loginPageStyles } from '../assets/dummyStyles';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLeft, Eye, EyeOff, Lock, User } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';
  
const LoginPage = () => {
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      return;
    }

    if (!rememberMe) {
      toast.error("You must agree to remember me.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("isLoggedIn", "true");

        try {
          window.dispatchEvent(
            new CustomEvent("authChanged", { detail: { loggedIn: true } })
          );
        } catch (err) {
          // ignore if browser doesn't allow CustomEvent construction in this environment
        }

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 1200,
          theme: "light",
        });

        setTimeout(() => {
          navigate("/");
        }, 1250);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };

    return (
        <div className={loginPageStyles.pageContainer} style={{fontFamily: "'Playfair Display', serif"}}>
            <ToastContainer/>
            <div className={loginPageStyles.mainContent}>
                <button onClick={() => navigate("/")} className={loginPageStyles.backButton}>
                    <ArrowLeft className={`h-5 w-5 text-gray-800`} />
                    <span className={loginPageStyles.backButtonText}>Back to Home</span>
                </button>

                {/* MAIN CARD */}
                <div className={loginPageStyles.loginCard}>
                    <div className={loginPageStyles.decorativeTopLeft}></div>
                    <div className={loginPageStyles.decorativeBottomRight}></div>

                    <h2 className={loginPageStyles.cardTitle}>Welcome Back</h2>
                    <p className={loginPageStyles.cardSubtitle}>
                        Sign in to your Account.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className={loginPageStyles.formField}>
                            <label htmlFor="email" className={loginPageStyles.formLabel}>
                                Email
                            </label>
                            <div className={loginPageStyles.inputContainer}>
                                <div className={loginPageStyles.inputIconContainer}>
                                    <User className={loginPageStyles.inputIcon} />
                                </div>
                                <input 
                                    type="email" 
                                    id="email"
                                    className={loginPageStyles.inputBase}
                                    placeholder="Enter your Email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={loginPageStyles.formField}>
                            <label htmlFor="password" className={loginPageStyles.formLabel}>
                                Password
                            </label>
                            <div className={loginPageStyles.inputContainer}>
                                <div className={loginPageStyles.inputIconContainer}>
                                    <Lock className={loginPageStyles.inputIcon} />
                                </div>
                                <input 
                                    type={ showPassword? "text" : "password"} 
                                    id="password"
                                    className={loginPageStyles.passwordInputBase}
                                    placeholder="Enter your Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button type="button" className={loginPageStyles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <EyeOff className={loginPageStyles.inputIcon} />
                                    ) : (
                                        <Eye className={loginPageStyles.inputIcon} />
                                    )}
                                </button>
                            </div>
                        </div>
                        
                        <div className={loginPageStyles.rememberMeContainer}>
                            <div className={loginPageStyles.checkboxContainer}>
                                <input 
                                    type="checkbox"
                                    id="rememberMe"
                                    className={loginPageStyles.checkbox}
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    required
                                />
                            </div>

                            <div className={loginPageStyles.checkboxLabelContainer}>
                                <label htmlFor="rememberMe" className={loginPageStyles.checkboxLabel}>
                                    Remember Me{" "}
                                    <span className={loginPageStyles.requiredStar}>*</span>
                                </label>
                            </div>        
                        </div>

                        <button type="submit" className={loginPageStyles.submitButton}>
                            Login
                        </button>
                    </form>

                    <div className={loginPageStyles.signupContainer}>
                        <span className={loginPageStyles.signupText}>
                            Don't have an Account? {" "}
                        </span>
                        <a href="/signup" className={loginPageStyles.signupLink}>
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>

            {/* Add font import */}
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}
            </style>
        </div>
    );
};

export default LoginPage;
