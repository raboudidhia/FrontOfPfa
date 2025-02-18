import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/images/loginImage.jpeg';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate the login process (skip actual backend call)
    if (email === 'user@example.com' && password === 'password123') {
      // Simulate a successful login
      localStorage.setItem('token', 'fakeAccessToken'); // Store a fake token
      localStorage.setItem('userEmail', email);

      setIsLoggedIn(true); // Update login status in the parent component
      navigate('/dashboard'); // Redirect to the dashboard page (new interface)
    } else {
      setError('Inaccurate Email or password 😒 (try again)');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative flex-grow flex justify-center items-center">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg">
          <h2 className="text-2xl font-semibold text-white text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full p-3 bg-transparent border-b border-white text-white outline-none placeholder-white"
              />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full p-3 bg-transparent border-b border-white text-white outline-none placeholder-white"
              />
            </div>
            <div className="flex justify-between items-center text-white text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember Me
              </label>
              <a href="#" className="hover:underline">Forgot Password?</a>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-lg hover:bg-gray-200 transition duration-200"
            >
              Login
            </button>
          </form>
          <p className="text-white text-sm text-center mt-4">
            New Here? <span className="text-black cursor-pointer hover:underline" onClick={() => navigate('/register')}>Create an account</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
