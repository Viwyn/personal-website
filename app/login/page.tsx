'use client';

import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login process
        setTimeout(() => {
            setIsLoading(false);
            // Handle login logic here
            console.log("Login attempt:", { email, password });
        }, 2000);
    };

    const handleSocialLogin = (provider: string) => {
        console.log(`Login with ${provider}`);
        // Handle social login logic here
    };

    return (
        <div className="min-h-screen min-w-full flex flex-col items-center justify-center bg-pink-50 dark:bg-slate-900 relative">
            {/* Main Content */}
            <div className="relative z-20 w-full max-w-md mx-auto px-4">
                {/* Back to Home Link */}
                <div className="mb-8 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors duration-200 font-comfortaa"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Login Card */}
                <div className="border-2 rounded-xl border-pink-200 dark:border-sky-300 bg-pink-100 dark:bg-slate-800 shadow-xl shadow-pink-200/40 dark:shadow-sky-400/20 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-comfortaa font-bold text-slate-700 dark:text-sky-200 mb-2">
                            Welcome Back!
                        </h1>
                        <p className="text-lg font-comfortaa font-light text-slate-600 dark:text-sky-300">
                            Sign in to continue your journey ✨
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-comfortaa font-medium text-slate-700 dark:text-sky-200"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-pink-400 dark:text-sky-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-pink-200 dark:border-sky-300 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-sky-100 font-comfortaa placeholder-slate-400 dark:placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-sky-400 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-comfortaa font-medium text-slate-700 dark:text-sky-200"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-pink-400 dark:text-sky-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 border-2 border-pink-200 dark:border-sky-300 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-sky-100 font-comfortaa placeholder-slate-400 dark:placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-sky-400 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-5 w-5 text-pink-400 dark:text-sky-400 hover:text-pink-500 dark:hover:text-sky-300 transition-colors duration-200" />
                                    ) : (
                                        <FaEye className="h-5 w-5 text-pink-400 dark:text-sky-400 hover:text-pink-500 dark:hover:text-sky-300 transition-colors duration-200" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-pink-500 dark:text-sky-400 focus:ring-pink-400 dark:focus:ring-sky-400 border-pink-300 dark:border-sky-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm font-comfortaa text-slate-600 dark:text-sky-300">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-comfortaa text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors duration-200">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-comfortaa font-medium bg-pink-500 dark:bg-sky-500 hover:bg-pink-600 dark:hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 dark:focus:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-pink-200 dark:border-sky-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-pink-100 dark:bg-slate-800 text-slate-500 dark:text-sky-400 font-comfortaa">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            onClick={() => handleSocialLogin('google')}
                            className="w-full inline-flex justify-center py-3 px-4 border-2 border-pink-200 dark:border-sky-300 rounded-lg shadow-sm bg-white dark:bg-slate-700 text-sm font-comfortaa font-medium text-slate-700 dark:text-sky-200 hover:bg-pink-50 dark:hover:bg-slate-600 transition-all duration-200"
                        >
                            <FaGoogle className="h-5 w-5 text-red-500" />
                            <span className="ml-2">Google</span>
                        </button>
                        <button
                            onClick={() => handleSocialLogin('github')}
                            className="w-full inline-flex justify-center py-3 px-4 border-2 border-pink-200 dark:border-sky-300 rounded-lg shadow-sm bg-white dark:bg-slate-700 text-sm font-comfortaa font-medium text-slate-700 dark:text-sky-200 hover:bg-pink-50 dark:hover:bg-slate-600 transition-all duration-200"
                        >
                            <FaGithub className="h-5 w-5 text-slate-700 dark:text-sky-200" />
                            <span className="ml-2">GitHub</span>
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm font-comfortaa text-slate-600 dark:text-sky-300">
                            Don&apos;t have an account?{' '}
                            <a href="#" className="font-medium text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors duration-200">
                                Sign up here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;