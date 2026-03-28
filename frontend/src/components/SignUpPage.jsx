import React, { useState } from 'react';
import { signUpStyles } from '../assets/dummyStyles';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // to submit
    const handleSubmit = async (e) => {
    e.preventDefault();

    // enforce all fields
    if (!name.trim() || !email.trim() || !password) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
      return;
    }

    // simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
      return;
    }

    // require remember me explicitly
    if (!rememberMe) {
      toast.error("Please tick 'Remember me' to continue.", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      
      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("isLoggedIn", "true");

        try {
          window.dispatchEvent(
            new CustomEvent("authChanged", { detail: { loggedIn: true } })
          );
        } catch (err) {
          // ignore
        }

        toast.success("Signup successful!", {
          position: "top-right",
          autoClose: 1200,
          theme: "light",
        });

        setTimeout(() => {
          navigate("/");
        }, 1250);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };

    return (
        <div className={signUpStyles.pageContainer} style={signUpStyles.pageFontStyle}>
            <ToastContainer/>
            <button onClick={() => navigate("/login")} className={signUpStyles.backButton}>
                <ArrowLeft className={signUpStyles.backIcon} />
                <span className={signUpStyles.backText}>Back to Login</span>
            </button>

            <div className={signUpStyles.formContainer}>
                <div className={signUpStyles.card}>
                    <div className={signUpStyles.decorativeCircle}></div>
                    <h1 className={signUpStyles.title} style={signUpStyles.pageFontStyle}>
                        Create Account
                    </h1>
                    <p className={signUpStyles.subtitle}>
                        Simple Signup to get you started - light & clean.
                    </p>

                    <form onSubmit={handleSubmit} className={signUpStyles.form}>
                        <label className={signUpStyles.label}>Full Name</label>
                        <div className={signUpStyles.inputContainer}>
                            <div className={signUpStyles.inputIconContainer}>
                                <User className={signUpStyles.inputIcon} />
                            </div>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Enter Full Name"
                                className={signUpStyles.inputField}
                                required 
                            />
                        </div>

                        <label className={signUpStyles.label}>Email</label>
                        <div className={signUpStyles.inputContainer}>
                            <div className={signUpStyles.inputIconContainer}>
                                <Mail className={signUpStyles.inputIcon} />
                            </div>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="your@example.com"
                                className={signUpStyles.inputField}
                                required 
                            />
                        </div>

                        <div>
                            <label className={signUpStyles.label}>Password</label>
                            <div className={signUpStyles.inputContainer}>
                                <div className={signUpStyles.inputIconContainer}>
                                    <Lock className={signUpStyles.inputIcon} />
                                </div>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="Create a Password"
                                    className={signUpStyles.inputField}
                                    required 
                                />
                                <button type='button' onClick={() => setShowPassword(!showPassword)} className={signUpStyles.passwordToggleButton}>  
                                    {showPassword ? (
                                        <EyeOff className={signUpStyles.passwordToggleIcon} />
                                    ) : (
                                        <Eye className={signUpStyles.passwordToggleIcon} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className={signUpStyles.checkboxContainer}>
                            <label className={signUpStyles.checkboxLabel}>
                                <input 
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    required
                                    className={signUpStyles.checkboxInput} 
                                />
                                <span className={signUpStyles.checkboxText}>Remember me</span>
                            </label>
                        </div>

                        <button type="submit" className={signUpStyles.submitButton}>
                            Sign Up
                        </button>
                    </form>

                    <div className={signUpStyles.bottomContainer}>
                        <span className={signUpStyles.bottomText}>
                            Already have an account?{""} 
                        </span>
                        <a href="/login" className={signUpStyles.loginLink}>Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
