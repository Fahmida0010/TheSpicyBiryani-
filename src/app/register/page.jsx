"use client";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const fullName = form[0].value;
    const email = form[1].value;
    const password = form[2].value;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert(data.message);
      router.push("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-[#1f2937] p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400"
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400"
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-md font-semibold hover:bg-yellow-500 transition"
          >
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-md hover:bg-gray-200 transition mt-4"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;