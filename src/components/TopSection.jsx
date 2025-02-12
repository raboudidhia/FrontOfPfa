import React from "react";
import FrontImage from "../assets/images/front-image.png";
import CustomButton from "./CustomButton";

const TopSection = () => {
  return (
    <div className="top-section w-[100%] bg-[#F5F5F5] min-h-screen flex items-center xl:items-start justify-center flex-col xl:flex-row pb-[4em]">
      <div className="left-container text-container w-auto pl-[2em] sm:pl-[4em] pt-[5em] lg:pt-[7em] flex flex-col gap-y-[3em]">
        <h1 className="text-[3.5em] md:text-[5em] font-bold md:w-[6em] lg:w-[8em] leading-[5rem]">
        Where pets come first, <span className="text-blue-400">always</span>
        </h1>
        <p className="text-[1.1em] font-thin w-auto lg:w-[22em]">
            Give your beloved pet the care they deserve, book an appointment with us today!
        </p>
        <div className="flex-shrink-0 flex items-center">
          <CustomButton text="Book Appointment" />
        </div>
        <div className="stats-container flex flex-col gap-y-[2em] sm:gap-y-0 sm:flex-row  gap-x-[2em] mt-[5em] items-center">
          <div className="stat-1">
            <h2 className="font-bold text-[2.4em]">200K+</h2>
            <p>Vaccinations Completed</p>
          </div>
          <div className="bg-blue-400 h-[50%] w-[0.15em]"></div>
          <div className="stat-2">
            <h2 className="font-bold text-[2.4em]">98%</h2>
            <p className="font-thin">Satisfaction Rate</p>
          </div>
          <div className="bg-blue-400 h-[50%] w-[0.15em]"></div>
          <div className="stat-3">
            <h2 className="font-bold text-[2.4em]">1M</h2>
            <p className="font-thin">Pets Cared For</p>
          </div>
        </div>
      </div>
      <div className="right-container image-container pt-[3.5em] flex justify-center xl:block">
        <div className="polygon-image-container bg-blue-200 w-[300px] md:w-[550px] flex justify-center items-center">
            <img
            className="polygon-image-container w-[250px] md:w-[500px]"
            src={FrontImage}
            alt="Smiling man hugging dog"
            />
        </div>
      </div>
    </div>
  );
};

export default TopSection;
