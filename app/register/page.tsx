

/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [role, setRole] = useState<"member" | "librarian">("member");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.name.trim()) {
        setError("Full name is required");
        return;
        }
        if (!formData.email.trim()) {
        setError("Email is required");
        return;
        }
        if (!formData.password) {
        setError("Password is required");
        return;
        }
        if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
        }
        if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
        }

        try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/auth/register/${role}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");

        router.push("/login");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Account</h1>

            <div className="flex justify-center gap-4 mb-6">
            <button
                className={`px-4 py-2 rounded ${
                role === "member"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                type="button"
                onClick={() => setRole("member")}
            >
                Member
            </button>
            <button
                className={`px-4 py-2 rounded ${
                role === "librarian"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                type="button"
                onClick={() => setRole("librarian")}
            >
                Librarian
            </button>
            </div>

            {error && (
            <p className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                autoComplete="name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                autoComplete="email"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                autoComplete="new-password"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                autoComplete="new-password"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
                {loading ? "Registering..." : "Register"}
            </button>
            </form>
        </div>
        </div>
    );
}