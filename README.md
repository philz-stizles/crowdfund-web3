# CrowdFund

## Table of Contents

(1.) [Create Client App](#create-client-app)
(2.) [Routing using React Router DOM](#routing-using-react-router-dom)
(3.) [Styling with Tailwind CSS](#styling-with-tailwind-css)
(4.) [Testing with Jest](#testing-with-jest)
(5.) [Icons Using React Icons](#icons-using-react-icons)

### Create Client App

    npx thirdweb create --app
    
    ✔ What is your project named? … ./
    ✔ Which blockchain do you want to use? › EVM
    ✔ What framework do you want to use? › Vite
    ✔ What language do you want to use? › TypeScript

    npm run dev

## Routing using React Router DOM

    npm i react-router-dom

## Styling with Tailwind CSS

Install:

    npm i -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

    npm i @tailwindcss/forms

Add the following property to "tailwindcss.config":

    module.exports = {
        content: [
            "./src/**/*.{js,jsx,ts,tsx}",
        ],
        ...
    }

Add the following code to "index.css":

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

### Icons using React Icons

    npm i react-icons

### Testing with Jest

    npm i @types/jest @testing-library/react

### Interact with Block-chain & Contracts using thirdweb

    npm i @thirdweb-dev/react @thirdweb-dev/sdk @thirdweb-dev/chains ethers@^5
    npm i @vitejs/plugin-react vite-plugin-node-polyfills -D

### Create Web3 Contracts using thirdweb

    npx thirdweb@latest create --contract

    ✔ What is your project named? … web3
    ✔ What framework do you want to use? › Hardhat
    ✔ What will be the name of your new smart contract? … CrowdFund
    ✔ What type of contract do you want to start from? › Empty Contract

    cd web3
    npm run deploy

    Connect =>
    Deploy Now
    Confirm > Sign
