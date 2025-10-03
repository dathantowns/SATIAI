# SATI Lecture Mentor Web App

# Deployed site

https://satimentor.crabdance.com

# Back-end Repository

https://github.com/dathantowns/sati-backend.git

# Description

The Sysytematic Approach To Improving Instruction (SATI) Lecture Mentor App is designed to use two third party APIs to enable helpful AI feedback on educational lectures that is based on SATI principles.

# How it works

The app allows users to upload lecture text or audio, saves it to a mongo database, then sends audio to AssemblyAIs API to be transcribed. Once the lecture is in text form, it is then sent to OpenAIs API with with a custom prompt that also includes the context of the SATI program to be analyzed. The response is parsed and returned in a user-friendly format.

# How to use it

Create an account, upload your text or audio, and watch the magic happen!

# Technologies

## Frontend

- **React 19.1.1** - Modern UI library with latest features and hooks
- **React Router DOM 7.9.1** - Client-side routing and navigation
- **Vite 7.1.6** - Fast build tool and development server
- **JavaScript (ES6+)** - Modern JavaScript with modules and async/await
- **CSS3** - Responsive design with Flexbox, Grid, and media queries
- **HTML5** - Semantic markup and file upload APIs

## Development & Build Tools

- **ESLint** - Code linting and quality assurance
- **@vitejs/plugin-react** - Vite plugin for React development
- **npm** - Package management and dependency resolution

## APIs & External Services

- **AssemblyAI API** - Audio transcription service for lecture audio files
- **OpenAI API** - AI analysis and feedback generation based on SATI principles
- **Custom Backend API** - User authentication, file uploads, and data management

## Architecture & Patterns

- **React Context API** - Global state management (CurrentUserContext, FeedbackContext)
- **React Hooks** - useState, useEffect, useRef, useNavigate, useLocation
- **Component-based Architecture** - Modular, reusable UI components
- **RESTful API Integration** - HTTP requests for authentication and data operations
- **JWT Authentication** - Token-based user authentication and authorization
- **FormData API** - File upload handling for audio and text documents

## Key Features

- **Responsive Design** - Mobile-first approach with breakpoints for all device sizes
- **File Upload System** - Support for both audio (.mp3, .wav, .m4a) and text (.txt, .docx, .pdf) files
- **Real-time Feedback** - Dynamic loading states and progress indicators
- **User Authentication** - Registration, login, and profile management
- **Routing & Navigation** - Single-page application with protected routes
- **Custom Fonts** - DM Serif Text (satiSerif) for enhanced typography

## Deployment

- **SCP Deployment** - Automated build and deployment to custom server
- **Static Site Hosting** - Production builds served from dist/ directory
- **Custom Domain** - Hosted at satimentor.crabdance.com
