import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
// import api from "../../Api/api.js";

interface ForgotPasswordProps {
  onClose?: () => void;
}

export default function ForgotPassword({ onClose }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOtp, setShowOtp] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("api/auth/send-otp", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Faild to send OTP");
      }

      toast.success(data.message);

      setShowOtp(true);
    } catch (error: any) {
      console.error("Send OTP error:", error);

      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("api/auth/verify-otp", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP");
      }

      toast.success(data.message);

      setShowOtp(false);
      setShowResetPassword(true);
      setOtp("");
    } catch (error: any) {
      console.error("Verify OTP error:", error);

      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please enter both passwords.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("api/auth/reset-password", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message || "Failed to reset password")
      }

      toast.success(data.message);

      setEmail("");
      setNewPassword("");
      setConfirmPassword("");

      if (onClose) {
        onClose();
      }
    } catch (error: any) {
      console.error("Reset password error:", error);

      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 cursor-default">
      <div className="relative w-full max-w-md p-px rounded-3xl bg-linear-to-b from-teal-500/50 via-slate-800 to-indigo-500/30 shadow-2xl">
        <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-[23px] p-6 sm:p-8 text-slate-100 overflow-hidden">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors cursor-pointer w-7 h-7 flex items-center justify-center rounded-full bg-slate-800/60 hover:bg-slate-800"
          >
            ✕
          </button>

          {/* Heading */}
          <div className="mb-6">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 text-xl mb-3">
              🔐
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white">
              {showResetPassword
                ? "Reset Password"
                : showOtp
                  ? "Verify OTP"
                  : "Forgot Password"}
            </h3>

            <p className="text-slate-400 text-sm mt-1">
              {showResetPassword
                ? "Create a new password for your account."
                : showOtp
                  ? "Enter the OTP sent to your email."
                  : "Enter your email to receive an OTP."}
            </p>
          </div>

          {/* Email */}
          {!showResetPassword && (
            <div className="space-y-1.5 mb-4">
              <label className="text-xs font-medium text-slate-300">
                Email
              </label>

              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                disabled={showOtp}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm disabled:opacity-50"
              />
            </div>
          )}

          {/* Send OTP */}
          {!showOtp && !showResetPassword && (
            <form onSubmit={handleSendOtp}>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-medium rounded-xl shadow-lg shadow-teal-500/25 transition-all disabled:opacity-50 cursor-pointer text-sm"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* OTP */}
          {showOtp && (
            <form onSubmit={handleVerifyOtp}>
              <div className="space-y-1.5 mb-4">
                <label className="text-xs font-medium text-slate-300">
                  OTP
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm tracking-widest"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-medium rounded-xl shadow-lg shadow-teal-500/25 transition-all disabled:opacity-50 cursor-pointer text-sm"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {/* Reset Password */}
          {showResetPassword && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-10 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showNewPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-10 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-medium rounded-xl shadow-lg shadow-teal-500/25 transition-all disabled:opacity-50 cursor-pointer text-sm"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
