
import PetCareLogo from "../assets/images/pet-care-logo.png";
import PawLogo from "../assets/images/blue-paw-logo.png";
import FacebookIcon from "../assets/images/facebook-icon.png";
import InstagramIcon from "../assets/images/instagram-icon.png";
import YouTubeIcon from "../assets/images/youtube-icon.png";
import TwitterIcon from "../assets/images/twitter-icon.png";

const Footer = () => {
  return (
    <footer className="bg-gray-200 pt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-evenly  px-[2em] md:px-0">
        <div className=" w-auto md:w-1/3 flex flex-col gap-y-4">
          <div className="flex items-center mb-4">
            <img
              src={PawLogo}
              alt="Company Logo"
              className="w-8 h-8 mr-2 rounded-sm"
            />
            <h2 className="text-lg font-bold">Honest Pets</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Welcome to Honest Pets, where integrity meets pet grooming
            excellence. At Honest Pets, we believe in providing the utmost care
            and honesty to every furry friend that walks through our doors.{" "}
          </p>
          <div className="flex gap-x-6">
            <img
              className="w-[25px] h-[25px] cursor-pointer"
              src={FacebookIcon}
            />
            <img
              className="w-[25px] h-[25px] cursor-pointer"
              src={InstagramIcon}
            />
            <img
              className="w-[25px] h-[25px] cursor-pointer"
              src={YouTubeIcon}
            />
            <img
              className="w-[25px] h-[25px] cursor-pointer"
              src={TwitterIcon}
            />
            {/* Add more social media icons here */}
          </div>
        </div>
        <div className="w-1/4 md:w-[25em] xl:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-4 mt-[4em] md:mt-0 gap-y-[4em]">
          <div>
            <h3 className="font-bold mb-2">Pages</h3>
            <ul className="flex flex-col gap-y-3 mt-4">
              <li className="cursor-pointer hover:underline">Home Page</li>
              <li className="cursor-pointer hover:underline">About Us</li>
              <li className="cursor-pointer hover:underline">Service</li>
              <li className="cursor-pointer hover:underline">Training</li>
              <li className="cursor-pointer hover:underline">Medi-Care</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Support</h3>
            <ul className="flex flex-col gap-y-3 mt-4">
              <li className="cursor-pointer hover:underline">Contact Us</li>
              <li className="cursor-pointer hover:underline">Online Chat</li>
              <li className="cursor-pointer hover:underline">Telegraphs</li>
              <li className="cursor-pointer hover:underline">Ticketing</li>
              <li className="cursor-pointer hover:underline">Payments</li>
            </ul>
          </div>
          <div className="w-[15em] md:w-auto">
            <h3 className="font-bold mb-2">Working Hours</h3>
            <ul className="flex flex-col gap-y-3 mt-4">
              <li>Monday to Friday</li>
              <li>Open from 8am - 5pm</li>
              <li>Holidays/Weekends - Closed</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-[5em] flex justify-center items-center mt-[5em] border-t-2 border-blue-200 py-[1em] px-6 md:px-0">
        <p>Copyright @2024 by Honest Pets. All rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
