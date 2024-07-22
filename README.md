# AI Resume Builder Frontend

This repository contains the frontend application for the AI Resume Builder project, developed using React.

## Table of Contents

- [AI Resume Builder Frontend](#ai-resume-builder-frontend)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Deployment](#deployment)

## Overview

The AI Resume Builder frontend application allows users to create AI-generated resumes. Built with React and styled using Tailwind CSS, the application provides a user-friendly interface for interacting with the AI resume generation service.

## Features

- User-friendly UI for creating and managing resumes
- Integration with AI services for resume generation
- Responsive design with Tailwind CSS
- Environment-based configurations

## Installation

Follow these steps to set up the project on your local machine.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/AI-Resume-Builder.git
   ```

2. **Install dependencies:**

   Ensure you have [Node.js](https://nodejs.org/) installed.

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your environment variables. For example:

   ```env
   REACT_APP_BASE_URL=http://localhost:1337
   ```

4. **Run the development server:**

   ```bash
   npm start
   ```

## Running the Application

1. **Start the React development server:**

   ```bash
   npm start
   ```

   This command starts the development server and opens the application in your default web browser at `http://localhost:PORT`.

2. **Access the application:**

   Open your browser and navigate to `http://localhost:PORT` to view the application.

## Deployment

To deploy the application, follow these steps:

1. **Build the application:**

   ```bash
   npm run build
   ```

   This command creates an optimized production build of your React application in the `build` directory.
