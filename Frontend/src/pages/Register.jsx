import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import "../styles/register.css";

export default function Register() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    identifier: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isPhoneMode, setIsPhoneMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-focus when switching modes
  useEffect(() => {
    if (inputRef.current) {
      const timeout = setTimeout(() => {
        const input = inputRef.current.querySelector('input') || inputRef.current;
        input.focus();
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [isPhoneMode]);

  const handleIdentifierChange = (val) => {
    // Auto-switch logic
    if (!val || val === "+" || val.trim() === "") {
      setFormData({ ...formData, identifier: "" });
      setIsPhoneMode(false);
      return;
    }

    const isNumeric = /^[+]?[0-9]/.test(val);
    const hasEmailClues = /[@a-zA-Z]/.test(val);

    if (isNumeric && !hasEmailClues) {
      setIsPhoneMode(true);
    } else {
      setIsPhoneMode(false);
    }

    setFormData({ ...formData, identifier: val });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem("mfa_email", formData.identifier);
      navigate("/mfa", { state: { email: formData.identifier, firstLogin: true } });
    }, 1000);
  };

  return (
    <div className="login-screen">
      <div className="brand-logo-fixed">
        DINE<span className="accent">Vibe</span>
      </div>

      <div className="login-container">
        <div className="login-left">
          <div className="form-content">
            <h1 className="form-title">Create Account</h1>
            <p className="form-subtitle">Join DineVibe to transform your restaurant intelligence.</p>

            <form onSubmit={handleRegister}>
              <div className="input-block">
                <label>Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="input-block">
                <div className="label-row">
                  <label>Email or Phone Number</label>
                  <button 
                    type="button" 
                    className="mode-switch" 
                    onClick={() => {
                      setIsPhoneMode(!isPhoneMode);
                      setFormData({ ...formData, identifier: "" });
                    }}
                  >
                    Use {isPhoneMode ? 'Email' : 'Phone'} Instead
                  </button>
                </div>

                <div ref={inputRef}>
                  {isPhoneMode ? (
                    <PhoneInput
                      defaultCountry="us"
                      value={formData.identifier}
                      onChange={(phone) => handleIdentifierChange(phone)}
                      className="custom-phone"
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Enter Email or Phone Number"
                      value={formData.identifier}
                      onChange={(e) => handleIdentifierChange(e.target.value)}
                      required
                    />
                  )}
                </div>
              </div>

              <div className="input-block">
                <label>Password</label>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button type="button" className="eye-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading} style={{ marginTop: '10px' }}>
                {loading ? "Creating Account..." : "Register Now"}
              </button>
            </form>

            <p className="signup-text">Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>

        <div className="login-right">
          <div className="orange-panel"></div>
        </div>
      </div>
    </div>
  );
}