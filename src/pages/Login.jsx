import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { login, forgotPassword } from '../services/Auth';
import loginImage from '../assets/images/loginImage.jpeg';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotEmail, setForgotEmail] = useState(''); 
  const [forgotMessage, setForgotMessage] = useState('');
  const [showForgot, setShowForgot] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      setIsLoggedIn(true);
      localStorage.setItem('userEmail', email);
      navigate('/dog');
    } catch (err) {
      setError('Invalid email or password 😒 (try again)');
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      const message = await forgotPassword(forgotEmail);
      setForgotMessage(message);
      setError('');
    } catch (err) {
      setError(err.message);
      setForgotMessage('');
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
          <h2 className="text-2xl font-semibold text-white text-center mb-4">
            {showForgot ? 'Forgot Password' : 'Login'}
          </h2>

          {!showForgot ? (
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
                <span
                  className="hover:underline cursor-pointer"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </span>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-white text-black py-3 rounded-lg hover:bg-gray-200 transition duration-200"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={forgotEmail}
                  onChange={(event) => setForgotEmail(event.target.value)}
                  required
                  className="w-full p-3 bg-transparent border-b border-white text-white outline-none placeholder-white"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {forgotMessage && <p className="text-green-500 text-sm">{forgotMessage}</p>}
              <button
                type="submit"
                className="w-full bg-white text-black py-3 rounded-lg hover:bg-gray-200 transition duration-200"
              >
                Send Reset Link
              </button>
              <p
                className="text-white text-sm text-center mt-4 cursor-pointer hover:underline"
                onClick={() => setShowForgot(false)}
              >
                Back to Login
              </p>
            </form>
          )}

          {!showForgot && (
            <p className="text-white text-sm text-center mt-4">
              New Here? <span className="text-black cursor-pointer hover:underline" onClick={() => navigate('/register')}>Create an account</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;