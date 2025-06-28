import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import api from '../api/axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await api.post('/auth/login', { username, password });
      const { token } = response.data;

      if (token) {
        login(token);
        navigate('/');
      }
    } catch (err) {
      setError('Invalid username or password.');
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl flex overflow-hidden">
        
        {/* Left Side - Branding with Logo */}
        <div className="w-1/2 hidden md:flex flex-col items-center justify-center p-12 text-white relative overflow-hidden" style={{backgroundColor: '#132346'}}>
            {/* Racing circuit pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="racing-pattern" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="scale(1.5) rotate(15)">
                      <rect x="0" y="0" width="100%" height="100%" fill="none"/>
                      <path d="M0,30 Q15,15 30,30 Q45,45 60,30" stroke="white" strokeWidth="2" fill="none"/>
                      <circle cx="15" cy="30" r="3" fill="white"/>
                      <circle cx="45" cy="30" r="3" fill="white"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#racing-pattern)"/>
                </svg>
            </div>
            
            {/* Electric energy lines */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 400 600">
                <path d="M50,100 Q100,50 150,100 T250,100" stroke="#60a5fa" strokeWidth="2" fill="none">
                  <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="3s" repeatCount="indefinite"/>
                </path>
                <path d="M100,200 Q200,150 300,200 T400,200" stroke="#60a5fa" strokeWidth="2" fill="none">
                  <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="4s" repeatCount="indefinite"/>
                </path>
                <path d="M0,300 Q100,250 200,300 T400,300" stroke="#60a5fa" strokeWidth="2" fill="none">
                  <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="5s" repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
            
            <div className="text-center z-10">
                {/* Logo placeholder - replace with actual logo */}
                <img src="../../public/logo/login/image (12).png" alt="car" className='w-48 h-48 rounded-4xl mb-6'/>
                <h1 className="text-4xl font-bold tracking-tight mb-2">MECH UBU EV</h1>
                <p className="text-blue-200 text-lg font-medium">FORMULA TSAE TEAM</p>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                  <span className="text-blue-200 text-sm">Electric Racing Innovation</span>
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                </div>
            </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-16 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-8 text-left">
                <h2 className="text-3xl font-extrabold text-gray-900">Team Access</h2>
                <p className="text-gray-600 mt-2">Sign in to your racing dashboard</p>
                <div className="mt-3 flex items-center space-x-2">
                  <div className="w-8 h-1 rounded-full" style={{backgroundColor: '#22409a'}}></div>
                  <div className="w-4 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-1 bg-gray-300 rounded-full"></div>
                </div>
            </div>
            
            <div className="space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg" role="alert">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <p className="font-bold">Access Denied</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label className="text-sm font-bold text-gray-700 tracking-wide flex items-center" htmlFor="username">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                  Team Member ID
                </label>
                <input
                  className="w-full mt-2 px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{'--tw-ring-color': '#22409a'} as React.CSSProperties}
                  id="username"
                  type="text"
                  placeholder="member.id"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              
              <div>
                <label className="text-sm font-bold text-gray-700 tracking-wide flex items-center" htmlFor="password">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                  Password
                </label>
                <input
                  className="w-full mt-2 px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{'--tw-ring-color': '#22409a'} as React.CSSProperties}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 focus:ring-2" style={{'--tw-ring-color': '#22409a', 'accentColor': '#22409a'} as React.CSSProperties}/>
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button className="text-sm font-medium hover:underline" style={{color: '#22409a'}}>
                  Forgot access code?
                </button>
              </div>
              
              <div>
                <button
                  className="w-full text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden"
                  style={{backgroundColor: '#22409a'}}
                  onClick={handleSubmit}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Enter Racing Zone
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                © 2024 MECH UBU EV Formula TSAE Team. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )

};

export default LoginPage;