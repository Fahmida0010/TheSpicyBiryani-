"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) {
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-[#1f2937] p-8 rounded-xl w-full max-w-md shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login to <span className="text-yellow-400">The Spicy Biryani</span>
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleCredentialsLogin} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-md font-semibold hover:bg-yellow-500 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-gray-400">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-md hover:bg-gray-200 transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

      </div>
    </div>
  );
};

export default LoginPage;