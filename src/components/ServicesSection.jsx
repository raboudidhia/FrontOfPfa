import React, { useState } from 'react';
import { FaDog, FaHeartbeat, FaClipboardList, FaUserShield } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { 
    icon: <FaHeartbeat size={40} />, 
    title: "AI Disease Detection", 
    desc: "Upload a picture and detect symptoms instantly.",
    details: "Our AI analyzes images to identify early signs of rabies or other illnesses, providing instant reports."
  },
  { 
    icon: <FaClipboardList size={40} />, 
    title: "Health Reports", 
    desc: "Track your dog's medical history in one place.",
    details: "Keep track of your pet's past diagnoses, symptoms, and health progress over time."
  },
  { 
    icon: <FaDog size={40} />, 
    title: "Product Recommendations", 
    desc: "Find the best treatments and pet care products.",
    details: "Get expert recommendations for pet food, medications, and accessories."
  },
  { 
    icon: <FaUserShield size={40} />, 
    title: "Secure & Reliable", 
    desc: "Your pet’s health data is safe with us.",
    details: "We prioritize your data privacy with end-to-end encryption and secure cloud storage."
  }
];
const steps = [
  { title: "Sign Up", details: "Create an account to start tracking your pet's health." },
  { title: "Upload Dog Image", details: "Upload a photo of your dog for AI-powered health analysis." },
  { title: "Get Instant Results", details: "Receive instant AI-generated health insights." },
  { title: "Track Results History", details: "Monitor your pet’s health over time with saved reports." }
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Services Section */}
      <section id="features" className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Our App?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => setSelectedService(service)}
            >
              <div className="text-blue-600 mb-4">{service.icon}</div>
              <h3 className="font-semibold text-lg">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-2 right-4 text-gray-600 text-2xl"
                onClick={() => setSelectedService(null)}
              >&times;</button>
              <div className="text-blue-600 mb-4">{selectedService.icon}</div>
              <h3 className="text-xl font-bold">{selectedService.title}</h3>
              <p className="text-gray-600 mt-2">{selectedService.details}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <section className="py-20 bg-gray-100 px-6 text-center">
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md w-60 cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onClick={() => setSelectedStep(step)}
          >
            <h3 className="font-semibold">{step.title}</h3>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal for Step Details */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-4 text-gray-600 text-2xl"
                onClick={() => setSelectedStep(null)}
              >&times;</button>
              <h3 className="text-xl font-bold">{selectedStep.title}</h3>
              <p className="text-gray-600 mt-2">{selectedStep.details}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </div>
  );
};

export default ServicesSection;
