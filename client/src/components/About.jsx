import React from 'react';
import { Footer } from "flowbite-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import imgdeepak from "../assets/deepak1.jpg";

const About = () => {
  return (
    <div className="flex justify-center items-center min-h-screen pt-24 mb-10"> {/* Add padding-top here */}
      <div className="w-full max-w-sm bg-green-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mt-10 mb-10 rounded-full shadow-lg"
            src={imgdeepak}
            alt="Deepak Pradhan"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Deepak Pradhan</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">EEE 2026 Undergrad at BIT Mesra</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Aspiring SDE/SWE</span>
          <div className="flex mt-4 mb-5 md:mt-6">
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon href="https://www.linkedin.com/in/deepakpradhan10242/" icon={BsLinkedin} />
              <Footer.Icon href="https://github.com/deepakpradhan10242/" icon={BsGithub} />
            </div>
          </div>

          <div className="text-center px-6">
            <h2 className="text-xl font-bold mb-4">Moto: Reuse Old Books to Save Trees</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              The core mission of this website is to encourage the reuse of old books. This initiative is driven by the understanding that paper production relies heavily on trees, leading to deforestation.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              Deforestation is not just an environmental issue, it’s a catalyst for various natural disasters that severely impact our lives.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              By reusing old books, we reduce the need for new paper, thereby minimizing the demand for tree harvesting. This simple act of preservation can help mitigate the harmful effects of deforestation, contributing to a healthier planet for future generations.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Let’s take a step towards sustainability by giving old books a new life and, in turn, giving trees a chance to thrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
