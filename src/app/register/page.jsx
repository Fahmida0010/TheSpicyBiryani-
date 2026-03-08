"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;

    // ✅ Password validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters, include a number and a special character"
      );
      return;
    }

    try {
      //  Register user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      //  Auto login after register
      const login = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (login?.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError("Login failed after registration");
      }

    } catch (err) {
      setError("Something went wrong");
    }
  };

  const handleGoogleSignup = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-[#1f2937] p-8 rounded-xl w-full max-w-md shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create an Account
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400"
          />

          {/* Password with Eye Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full p-3 pr-10 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-md font-semibold hover:bg-yellow-500 transition"
          >
            Register
          </button>

        </form>

        <div className="my-6 text-center text-gray-400">OR</div>

        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-md hover:bg-gray-200 transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

      </div>
    </div>
  );
};

export default RegisterPage;