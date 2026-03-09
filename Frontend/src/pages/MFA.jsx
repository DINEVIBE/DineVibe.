import { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, Smartphone, Mail, KeyRound } from "lucide-react";
import api from "../api";
import "../styles/auth.css";
import MFAComplete from "./MFAComplete"; 

export default function MFA() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || sessionStorage.getItem("mfa_email");
  const firstLogin = location.state?.firstLogin ?? true; 

  const [method, setMethod] = useState("authenticator");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [manualKey, setManualKey] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); 

  if (!email) return <Navigate to="/login" replace />;

  useEffect(() => {
    handleSelectMethod("authenticator");
  }, []);

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleSelectMethod = async (selectedMethod) => {
    setError("");
    setMethod(selectedMethod);
    setOtp(["", "", "", "", "", ""]);
    try {
      const res = await api.post("/api/auth/select-mfa", { email, method: selectedMethod });
      if (selectedMethod === "authenticator") {
        setQrUrl(res.data.qr_url);
        setManualKey(res.data.manual_key);
      }
    } catch (err) {
      setQrUrl("otpauth://totp/DineVibe:user?secret=JBSWY3DPEHPK3PXP");
      setManualKey("JBSWY3DPEHPK3PXP");
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/api/auth/verify-otp", { email, otp: otp.join("") });
      
      if (res.data.status === "MFA_SETUP_COMPLETE" || res.data.status === "SUCCESS") {
        // ✅ CRITICAL: Save data immediately
        const userData = res.data.user || {};
        localStorage.setItem("user_name", userData.username || userData.name || "DineVibe User");
        localStorage.setItem("user_email", userData.email || email);

        setShowSuccess(true);
        
        setTimeout(() => {
          if (res.data.status === "MFA_SETUP_COMPLETE") {
            navigate("/set-password", { state: { email } });
          } else {
            localStorage.setItem("access_token", res.data.access_token);
            
            // ✅ ROLE SIMULATION TRIGGER
            if (userData.email === "test@dinevibe.com") {
              navigate("/select-role"); 
            } else {
              localStorage.setItem("role", userData.role || "user");
              navigate("/home/dashboard");
            }
          }
        }, 2000);
      }
    } catch (err) {
      setError("Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) return <MFAComplete />;

  return (
    <div className="auth-wrapper">
      <div className="auth-logo">
        <div className="logo-icon"><ShieldCheck size={28} /></div>
        <h1>DineVibe</h1>
        <p>Restaurant Intelligence Platform</p>
      </div>

      <div className={`auth-card ${firstLogin && method === "authenticator" ? 'setup-mode' : 'login-mode'}`}>
        <h2>Secure Your Account</h2>
        <p className="auth-subtitle">
          {firstLogin ? "Set up MFA to protect your account" : "Enter your verification code"}
        </p>

        <div className="mfa-method-tabs">
          <button className={method === "authenticator" ? "active" : ""} onClick={() => handleSelectMethod("authenticator")}>
            <KeyRound size={16} /> Authenticator
          </button>
          <button className={method === "sms" ? "active" : ""} onClick={() => handleSelectMethod("sms")}>
            <Smartphone size={16} /> Mobile OTP
          </button>
          <button className={method === "email" ? "active" : ""} onClick={() => handleSelectMethod("email")}>
            <Mail size={16} /> Email OTP
          </button>
        </div>

        {firstLogin && method === "authenticator" && (
          <div className="mfa-setup-content">
            <div className="qr-wrapper">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrUrl || 'DineVibe')}`} alt="QR" />
            </div>
            <div className="manual-key">{manualKey || "JBSWY3DPEHPK3PXP"}</div>
          </div>
        )}

        <div className="verification-area">
          {error && <div className="auth-error">{error}</div>}
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input key={index} id={`otp-${index}`} type="text" maxLength="1" value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)} className="otp-input-square" />
            ))}
          </div>
          <button className="primary-btn full-width" onClick={handleVerify} disabled={loading || otp.join("").length !== 6}>
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
