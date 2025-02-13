import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageLogin from '../assets/images/loginImage.jpeg';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setRegistrationMessage('');
      return;
    }

    const url = 'http://127.0.0.1:8080/cinemaa/cinemaREST/me/register';
    try {
      const response = await axios.post(url, { name, email, password });

      setRegistrationMessage(`Nice work ${name}! You're registered successfully.`);
      setError('');

      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (error) {
      console.error(error);
      setError('Registration failed');
      setRegistrationMessage('');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageLogin})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative flex-grow flex justify-center items-center">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg">
          <h2 className="text-2xl font-semibold text-white text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="w-full p-3 bg-transparent border-b border-white text-white outline-none placeholder-white"
              />
            </div>
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
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                className="w-full p-3 bg-transparent border-b border-white text-white outline-none placeholder-white"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {registrationMessage && <p className="text-green-500 text-sm">{registrationMessage}</p>}
            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-lg hover:bg-gray-200 transition duration-200"
              disabled={!name || !email || !password || password !== confirmPassword}
            >
              Register
            </button>
          </form>
          <p className="text-white text-sm text-center mt-4">
            Already have an account? <span className="text-black cursor-pointer hover:underline" onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
