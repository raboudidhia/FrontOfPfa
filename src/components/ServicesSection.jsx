import React from 'react';
import Bathing from '../assets/images/bathing.png';
import PetGrooming from '../assets/images/pet-grooming.png';
import TeethCleaning from '../assets/images/teeth-cleaning.png';
import Vaccination from '../assets/images/vaccination.png';
import ServiceCard from './ServiceCard';

const services = [
    {
        id: '1',
        title: 'Bathing and Shampooing',
        image: Bathing,
        alt: '',
        description: "We provide thorough bathing services using appropriate pet-friendly shampoos and conditioners to keep your pets clean and fresh."
    },
    {
        id: '2',
        title: 'Pet Grooming',
        image: PetGrooming,
        alt: '',
        description: "Our skilled groomers can give your pets stylish haircuts and grooming sessions, including trimming, shaping, and coat maintenance, based on their breed and your preferences."
    },
    {
        id: '3',
        title: 'Teeth Cleaning',
        image: TeethCleaning,
        alt: '',
        description: "We provide teeth cleaning services to help maintain your pet's dental health. This can involve brushing their teeth, removing plaque, and freshening their breath."
    },
    {
        id: '4',
        title: 'Vaccinations',
        image: Vaccination,
        alt: 'A vet about to give a dog vaccinations',
        description: "From core vaccinations like rabies and distemper, to optional vaccinations based on your pet's lifestyle and risk factors, we tailor our vaccination protocols to meet the individual needs of each pet."
    }
]

const ServicesSection = () => {
  return (
    <section className="bg-[#FAF9F6] py-16">
      <div className="container mx-auto text-center flex flex-col items-center">
        <h2 className="text-2xl text-blue-500">Services</h2>
        <h1 className="text-4xl font-bold mt-4">What Can We Do?</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 px-[2em] w-[95%] xl:w-[80%]">
            {services.map((service) => (
                <ServiceCard key={service.id} title={service.title} image={service.image} description={service.description} altText={service.alt} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;