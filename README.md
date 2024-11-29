
![Logo](/public/skylight-github-banner.png)


# SkyLight App Overview

This repository includes a complete social media application backend created using NestJS and a client-side application developed with Next.js. The backend offers a strong API for social media features like authentication, user management, and post interactions. The client-side application provides a user-friendly and responsive interface for users to engage with the social media platform.


## Table of Contents
1. [Client - Next.js](#client---nextjs)
   - [Tech Stack](#tech-stack)
   - [Features](#features)
   - [Run Locally](#run-locally)
   - [Environment Variables](#environment-variables)
   - [Running the Application](#running-the-application)
2. [Backend - NestJS](#backend---nestjs)
   - [Installation](#installation-backend)
   - [Configuration](#backed-configuration)
   - [Running the Application](#running-the-backend-application)
3. [Technologies Used](#technologies-used)
4. [Contributing](#contributing)
5. [Feedback](#feedback)
6. [Screenshots](#screenshots)

## Client - Next.js

The client-side application is built using [Next.js](https://nextjs.org/), a React framework for server-side rendering and generating static websites. The following dependencies are used in the client:

- `@hookform/resolvers`: Resolvers for `react-hook-form`.
- `@reduxjs/toolkit`: Redux toolkit for state management.
- `@supabase/supabase-js`: Supabase client library.
- `clsx`: Utility for constructing `className` strings.
- `drizzle-orm`: ORM for database interactions.
- `embla-carousel-react`: Carousel component for React.
- `firebase`: Firebase client library.
- `jsonwebtoken`: JWT handling.
- `lucide-react`: Icon library for React.
- `next-themes`: Theme switching for Next.js.
- `react-hook-form`: Forms library for React.
- `react-redux`: Official React bindings for Redux.
- `tanstack/react-virtual`: Virtualized list component for React.
- `socket.io-client`: Real-time bidirectional event-based communication.
- `sonner`: Notification library.
- `tailwind-merge`: Utility for merging Tailwind CSS classes.
- `zod`: TypeScript-first schema declaration and validation library.
- `compressorjs`: Image compress library.

## Tech Stack

Nextjs, Redux toolkit, TailwindCSS, shadcn ui, react-hook-form, socket io, zod

## Features

- User authentication with JWT
- Real time chat using Socket io
- Image uploading feature
- Share Photo with your friends
- Light/dark mode toggle
- Application is fully responsive
- Group real chat feature

## Run Locally

Clone the project

```bash
  git clone https://github.com/AkashMondal0/Skylight.git
```

Go to the project directory

```bash
  cd Skylight
```

Install dependencies

```bash
  npm install
```

## Environment Variables
Create a `.env.local` file in the `client` directory and configure the necessary environment variables:


### Nestjs Backend

In this case, the SERVER_API_URL is set to http://localhost:5000, which means the backend server is running on the same machine (localhost) on port 5000.

```env
SERVER_API_URL=http://localhost:5000
```

### Firebase storage

- `FIREBASE_API_KEY`: Your Firebase API key.
- `FIREBASE_AUTH_DOMAIN`: Your Firebase Auth domain.
- `FIREBASE_PROJECT_ID`: Your Firebase Project ID.
- `FIREBASE_STORAGE_BUCKET`: Your Firebase Storage bucket.
- `FIREBASE_MESSAGING_SENDER_ID`: Your Firebase Messaging sender ID.
- `FIREBASE_APP_ID`: Your Firebase App ID.

You can set these variables in a `.env.local` file at the root of your project. Here's a template:

```env
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

To run this project, you will need to add the following environment variables to your .env file


### Running the Application

To start the Next.js client application:

```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

## Backend - NestJS

The backend of this project is built using [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications. The following dependencies are used in the backend:

- `@apollo/server`: Apollo Server for GraphQL integration.
- `@fastify/cookie`: Cookie handling with Fastify.
- `@fastify/cors`: CORS support for Fastify.
- `@nestjs/apollo`: Integration of Apollo with NestJS.
- `@nestjs/graphql`: GraphQL module for NestJS.
- `@nestjs/jwt`: JWT utilities for authentication.
- `@nestjs/passport`: Passport module for authentication.
- `bcrypt`: Password hashing.
- `drizzle-orm`: ORM for database interactions.
- `graphql`: GraphQL library.
- `passport`: Authentication middleware.
- `passport-jwt`: JWT strategy for Passport.
- `pg`: PostgreSQL client.
- `reflect-metadata`: Metadata reflection API.
- `rxjs`: Reactive programming library.
- `zod`: TypeScript-first schema declaration and validation library.

### Installation Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/AkashMondal0/skylight-nestjs-server.git

   cd skylight-nestjs-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Backed Configuration

Create a `.env` file in the `backend` directory and configure the necessary environment variables:

```env
JWT_SECRET=your_jwt_secret
DOMAIN=localhost
REDIS_URL=database-url Redis
PG_URL=database-url PostgreSQL
```

### Running the backend Application

To start the Next.js client application:

```bash
npm run start:dev
```
Open your browser and navigate to `http://localhost:5000`.

## Technologies Used

- **Client**: Next.js, React, Redux Toolkit, Supabase, Firebase, Tailwind CSS

- **Backend**: NestJS, GraphQL, PostgreSQL, Passport, JWT


## Screenshots

### Tab Screenshot

![App Screenshot](/public/screen-shots/tab.jpg)

### Tab Screenshot

![App Screenshot](/public/screen-shots/tab2.jpg)

### Tab Screenshot

![App Screenshot](/public/screen-shots/tab3.jpg)

### Desktop Screenshot

![App Screenshot](/public/screen-shots/pc2.png)

### Desktop Screenshot

![App Screenshot](/public/screen-shots/pc.png)

### Mobile Screenshot

![App Screenshot](/public/screen-shots/mobile.png)

### Chat Page

![App Screenshot](/public/screen-shots/Screenshot2.png)

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## Feedback

If you have any feedback, please reach out to us at akash2003mondal@gmail.com
