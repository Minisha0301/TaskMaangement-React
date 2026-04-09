import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router";

export default function Login() {

    let navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        phone: "",
        email: ""
    });

    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [showFormInput, setShowFormInput] = useState(true);

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    const handleSendOtp = async () => {
        try {
        const res = await fetch("http://localhost:8000/api/send-otp", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        alert(data.message);

        setShowFormInput(false);
        setShowOtpInput(true);
        } catch (err) {
        console.error(err);
        }
    };

    const handleVerifyOtp = async () => {
        try {
        const res = await fetch("http://localhost:8000/api/verify-otp", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            email: form.email,
            otp: otp
            })
        });

        const data = await res.json();
        localStorage.setItem("token", "loggedin");
        alert(data.message);
        navigate('/dashboard');
        } catch (err) {
        console.error(err);
        }
    };

  return (
    <div className="login-container">
      <div className="login-card">

        {showFormInput && (
            <>
                <h2>Login</h2>

                <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                />

                <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                />

                <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                />

                <button onClick={handleSendOtp}>Send OTP</button>
        </>)}

        {showOtpInput && (
          <div className="otp-section">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button onClick={handleVerifyOtp}>Verify OTP</button>
          </div>
        )}
      </div>
    </div>
  );
}