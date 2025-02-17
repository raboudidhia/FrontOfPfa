import React from "react";
import FrontImage from "../assets/images/front-image.png";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

const TopSection = () => {
  return (
    <div className="top-section w-[100%] bg-[#F5F5F5] min-h-screen flex items-center xl:items-start justify-center flex-col xl:flex-row pb-[4em]">
      <div className="left-container text-container w-auto pl-[2em] sm:pl-[4em] pt-[5em] lg:pt-[7em] flex flex-col gap-y-[3em]">
        <h1 className="text-[3.5em] md:text-[5em] font-bold md:w-[6em] lg:w-[8em] leading-[5rem]">
        Detect Rabies Early, <span className="text-blue-400">Protect Lives</span>
        </h1>
        <p className="text-[1.1em] font-thin w-auto lg:w-[22em]">
        Our AI-Powered App Helps Identify Symptoms and Prevent the Spread!
        </p>
        <Link to="/about">
  <         CustomButton text="Learn More" />
        </Link>
        
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
