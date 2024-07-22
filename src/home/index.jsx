import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const steps = [
    {
      id: 1,
      title: "Sign Up",
      description: "Create an account to get started.",
    },
    {
      id: 2,
      title: "Enter Details",
      description: "Fill in your personal and professional information.",
    },
    {
      id: 3,
      title: "Generate Resume",
      description: "Let our AI create a professional resume for you.",
    },
    {
      id: 4,
      title: "Download",
      description: "Download your resume in PDF format.",
    },
  ];
  return (
    <div>
      <Header />
      <div className="bg-gray-800 text-white h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Create Your AI-Generated Resume
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Build a professional resume in minutes with AI.
        </p>
        <Link to={"/dashboard"}>
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </Button>
        </Link>
      </div>
      <div className="bg-white text-gray-800 py-16 px-4 md:px-8 lg:px-16">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4">
                {step.id}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold">AI Resume Builder</h3>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-400">
            &copy; {new Date().getFullYear()} AI Resume Builder. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
