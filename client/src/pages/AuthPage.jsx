import { useState } from "react";
import axios from "axios";
import "./AuthPage.css";

function AuthPage() {
    const [mode, setMode] = useState("login"); // "signup" or "login"
    const [step, setStep] = useState(1); // Only used in signup
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/signup", { email });
            setStep(2);
        } catch (err) {
            alert("Error sending OTP");
            setEmail("");
        }
    };

    const handleVerify = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp, password });
            alert("Account verified! Now login.");
            setMode("login");
            setStep(1);
            setEmail("");
            setPassword("");
            setOtp("");
        } catch (err) {
            alert("Verification failed");
            setPassword("");
            setOtp("");
        }
    };

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            alert("Logged in!");
            window.location.href = "/dashboard";
        } catch (err) {
            alert("Login failed");
            setPassword("");
            setEmail("");
        }
    };

    return (
        <div className="auth-container">

            {mode === "signup" && step === 1 && (
                <div className="auth-box">
                    <h2>Signup</h2>
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    <button onClick={handleSignup}>Send OTP</button>
                </div>
            )}

            {mode === "signup" && step === 2 && (
                <div className="auth-box">
                    <h2>Verify OTP</h2>
                    <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="OTP" />
                    <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
                    <button onClick={handleVerify}>Verify</button>
                </div>
            )}

            {mode === "login" && (
                <div className="auth-box">
                    <h2>Login</h2>
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}

            <div className="auth-toggle">
                {mode === "login" ? (
                    <p>Don't have an account? <span className="auth-link" onClick={() => { setMode("signup"); setStep(1); setEmail(""); setPassword("");setOtp("");}}>Signup</span></p>
                ) : (
                    <p>Already have an account? <span className="auth-link" onClick={() => { setMode("login"); setStep(1); setEmail(""); setPassword("");setOtp("");}}>Login</span></p>
                )}
            </div>

        </div>
    );
}

export default AuthPage;
