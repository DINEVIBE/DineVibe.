// Frontend/src/pages/MFA.jsx
import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, KeyRound, Copy, Check, AlertTriangle } from "lucide-react";
import api from "../api";
import "../styles/auth.css";
import MFAComplete from "./MFAComplete";

export default function MFA() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || sessionStorage.getItem("mfa_email");
  const firstLogin = location.state?.firstLogin ?? true;

  // Authenticator-only (as requested)
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [qrUrl, setQrUrl] = useState("");
  const [manualKey, setManualKey] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!email) return <Navigate to="/login" replace />;

  const otpValue = useMemo(() => otp.join(""), [otp]);

  useEffect(() => {
    sessionStorage.setItem("mfa_email", email);
  }, [email]);

  // Fetch authenticator QR & manual key on load
  useEffect(() => {
    (async () => {
      setError("");
      setOtp(["", "", "", "", "", ""]);
      try {
        const res = await api.post("/api/auth/select-mfa", { email, method: "authenticator" });
        setQrUrl(res.data.qr_url || "");
        setManualKey(res.data.manual_key || "");
      } catch (err) {
        // Fallback demo values
        setQrUrl("otpauth://totp/DineVibe:user?secret=JBSWY3DPEHPK3PXP");
        setManualKey("JBSWY3DPEHPK3PXP");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(manualKey || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/auth/verify-otp", { email, otp: otpValue });

      if (res.data.status === "MFA_SETUP_COMPLETE" || res.data.status === "SUCCESS") {
        const userData = res.data.user || {};

        // Save user info immediately
        localStorage.setItem("user_name", userData.username || userData.name || "DineVibe User");
        localStorage.setItem("user_email", userData.email || email);

        setShowSuccess(true);

        setTimeout(() => {
          if (res.data.status === "MFA_SETUP_COMPLETE") {
            navigate("/set-password", { state: { email } });
          } else {
            localStorage.setItem("access_token", res.data.access_token);

            // Role simulation trigger
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
    <div className="auth-wrapper" style={{ padding: "34px 16px" }}>
      {/* Header */}
      <div className="auth-logo" style={{ marginBottom: 18 }}>
        <div className="logo-icon">
          <ShieldCheck size={28} />
        </div>
        <h1 style={{ margin: "10px 0 0" }}>DineVibe</h1>
        <p style={{ marginTop: 6 }}>Restaurant Intelligence Platform</p>
      </div>

      {/* Card */}
      <div
        className="auth-card"
        style={{
          maxWidth: 520,
          width: "100%",
          margin: "0 auto",
          padding: 22,
          borderRadius: 18
        }}
      >
        {/* Icon + Title */}
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              background: "#eef2ff",
              color: "#4f46e5",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10
            }}
          >
            <ShieldCheck size={18} />
          </div>

          <h2 style={{ margin: 0, fontWeight: 900 }}>Secure Your Account</h2>
          <p className="auth-subtitle" style={{ marginTop: 8 }}>
            Set up multi-factor authentication to protect your account
          </p>
        </div>

        {/* Method pills (Authenticator only) */}
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginBottom: 14
          }}
        >
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 12px",
              borderRadius: 999,
              border: "1px solid #e2e8f0",
              background: "#fff",
              fontWeight: 900,
              fontSize: 12,
              color: "#0f172a"
            }}
          >
            <KeyRound size={16} />
            Authenticator
          </button>

          <button
            type="button"
            disabled
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 12px",
              borderRadius: 999,
              border: "1px solid #eef2f7",
              background: "#f8fafc",
              fontWeight: 900,
              fontSize: 12,
              color: "#94a3b8",
              cursor: "not-allowed"
            }}
            title="Only Authenticator setup is enabled"
          >
            Mobile OTP
          </button>

          <button
            type="button"
            disabled
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 12px",
              borderRadius: 999,
              border: "1px solid #eef2f7",
              background: "#f8fafc",
              fontWeight: 900,
              fontSize: 12,
              color: "#94a3b8",
              cursor: "not-allowed"
            }}
            title="Only Authenticator setup is enabled"
          >
            Email OTP
          </button>
        </div>

        {/* Recommended method */}
        <div
          style={{
            background: "#eef2ff",
            border: "1px solid #dbeafe",
            borderRadius: 14,
            padding: "12px 14px",
            marginBottom: 14
          }}
        >
          <div style={{ fontWeight: 900, color: "#1d4ed8", fontSize: 12 }}>
            Recommended Method
          </div>
          <div style={{ marginTop: 4, fontWeight: 800, color: "#3b82f6", fontSize: 12 }}>
            Most secure option for protecting your account
          </div>
        </div>

        {/* Step 1 */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 900, color: "#0f172a", fontSize: 12, marginBottom: 10 }}>
            Step 1: Download an authenticator app
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <a
              href="https://apps.apple.com/us/app/google-authenticator/id388497605"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                border: "1px solid #eef2f7",
                borderRadius: 14,
                padding: "12px 14px",
                background: "#fff"
              }}
            >
              <div style={{ fontWeight: 900, color: "#0f172a", fontSize: 12 }}>
                Google Authenticator
              </div>
              <div style={{ marginTop: 4, color: "#94a3b8", fontWeight: 800, fontSize: 11 }}>
                iOS & Android
              </div>
            </a>

            <a
              href="https://apps.apple.com/us/app/microsoft-authenticator/id983156458"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                border: "1px solid #eef2f7",
                borderRadius: 14,
                padding: "12px 14px",
                background: "#fff"
              }}
            >
              <div style={{ fontWeight: 900, color: "#0f172a", fontSize: 12 }}>
                Microsoft Authenticator
              </div>
              <div style={{ marginTop: 4, color: "#94a3b8", fontWeight: 800, fontSize: 11 }}>
                iOS & Android
              </div>
            </a>
          </div>
        </div>

        {/* Step 2 */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 900, color: "#0f172a", fontSize: 12, marginBottom: 10 }}>
            Step 2: Scan this QR code
          </div>

          <div
            style={{
              border: "1px solid #eef2f7",
              borderRadius: 14,
              padding: 14,
              display: "flex",
              justifyContent: "center",
              background: "#fff"
            }}
          >
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                qrUrl || "DineVibe"
              )}`}
              alt="Authenticator QR"
              style={{ width: 220, height: 220 }}
            />
          </div>

          <div
            style={{
              marginTop: 10,
              border: "1px solid #eef2f7",
              background: "#f8fafc",
              borderRadius: 14,
              padding: "12px 14px"
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 900, color: "#64748b", marginBottom: 8 }}>
              Or enter this code manually:
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <code
                style={{
                  flex: 1,
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "8px 10px",
                  fontSize: 11,
                  fontWeight: 900,
                  color: "#0f172a",
                  display: "block",
                  overflowX: "auto"
                }}
              >
                {manualKey || "—"}
              </code>

              <button
                type="button"
                onClick={handleCopyKey}
                disabled={!manualKey}
                style={{
                  width: 40,
                  height: 36,
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  background: "#fff",
                  cursor: manualKey ? "pointer" : "not-allowed",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#334155",
                  opacity: manualKey ? 1 : 0.6
                }}
                title="Copy"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontWeight: 900, color: "#0f172a", fontSize: 12, marginBottom: 10 }}>
            Step 3: Enter the 6-digit code
          </div>
        </div>

        {/* Verification */}
        <div className="verification-area">
          {error && <div className="auth-error">{error}</div>}

          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                className="otp-input-square"
              />
            ))}
          </div>

          <button
            className="primary-btn full-width"
            onClick={handleVerify}
            disabled={loading || otpValue.length !== 6}
            type="button"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>

          {/* small footnote like setup screens */}
          {firstLogin && (
            <div
              style={{
                marginTop: 12,
                display: "flex",
                gap: 8,
                alignItems: "flex-start",
                color: "#94a3b8",
                fontSize: 12,
                fontWeight: 700
              }}
            >
              <AlertTriangle size={14} style={{ marginTop: 1 }} />
              <span>Keep your authenticator access safe. You’ll need it each time you sign in.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
