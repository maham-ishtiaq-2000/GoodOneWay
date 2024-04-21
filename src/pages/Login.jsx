import React, { useState } from 'react';
import Logo from '../assets/goodDealsLogo.png';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the form submission logic here
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 bg-lightPink">
            <div className="rounded-lg shadow-md max-w-xl mx-auto p-8 bg-platinum" style={{ width: '100vh' }}>
                 <img src={Logo} alt="Good Deals" className="mx-auto w-100 h-40 mb-8"></img> 
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative w-full bg-platinum">
                        <label
                            htmlFor="email"
                            className="absolute top-0 left-3 -mt-5 px-1 text-sm text-gray font-bold bg-platinum"
                            style={{ transform: 'translateY(50%)' }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full p-4 text-sm border-2 border-gray rounded-lg bg-platinum"
                            required
                        />
                    </div>
                    <div className="relative w-full bg-platinum">
                        <label
                            htmlFor="email"
                            className="absolute top-0 left-3 -mt-5 px-1 text-sm text-gray font-bold bg-platinum"
                            style={{ transform: 'translateY(50%)' }}
                        >
                            Password
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full p-4 text-sm border-2 border-gray rounded-lg bg-platinum"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-darkRed hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-4 text-center transition-colors duration-200"
                        onClick={() => {navigate("/home")}}
                   >
                        Sign In
                    </button>
                    <div className="text-sm font-medium text-center text-red-500">
                        Forgot Password?
                    </div>
                    <div className="text-sm font-medium text-center text-gray-500 mt-6">
                        <hr className="my-6" />
                        Create New Account
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
