"use client"

import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }
            router.push('admin/dashboard')
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex justify-center items-center ">
            <div className="bg-cardColor card-border p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className=''>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border card-border bg-cardColor rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border card-border bg-cardColor rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <FaSpinner className="animate-spin mr-2" />
                                Logging in...
                            </div>
                        ) : (
                            'Log in'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
