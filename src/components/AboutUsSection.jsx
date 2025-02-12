
import WomanWithCats from '../assets/images/woman-cats.png';
import CustomButton from './CustomButton';

const AboutUsSection = () => {
  return (
    <section className="bg-[#FAF9F6] py-12">
      <div className="container mx-auto flex flex-col lg:flex-row w-full sm:items-center lg:w-[80%]">
        {/* Left container with rounded window image */}
        <div className="md:w-1/2 px-[2em]">
            <img className="rounded-t-full w-[300px] md:w-[500px] lg:[600px] mb-[1em] sm:mb-[4em] lg:mb-0" src={WomanWithCats} />
        </div>
        
        {/* Right container for text content */}
        <div className="md:w-1/2 px-6 lg:px-[4em] py-4 md:py-12">
          <h2 className="text-blue-500 text-2xl font-bold mb-4">About Us</h2>
          <h1 className="text-[2.4em] sm:text-[3em] w-[6em] sm:w-[8em] font-bold mb-6 leading-[3rem] sm:leading-[4rem]">Best agency for your pet</h1>
          <p className="text-gray-700 mb-6 w-auto md:w-[30em]">
            At our pet care shop, we are dedicated to providing top-notch care for your furry companions. With a team of experienced and passionate pet lovers, we strive to create a safe and comfortable environment for every pet that walks through our doors.
          </p>
          <div className="flex items-start mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-blue-500 mt-1 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-gray-700">Quality services for your pets</p>
          </div>
          <div className="flex items-start mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-blue-500 mt-1 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            <p className="text-gray-700">Experienced and caring staff</p>
          </div>
          <div className="flex-shrink-0 flex items-center mt-[2em]">
            <CustomButton text="More About Us" />
        </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;