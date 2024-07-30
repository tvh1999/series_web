# Frontend Mentor - Web series full stack app

This is a solution to the [Entertainment web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Navigate between Home, Movies, TV Series, and Bookmarked Shows pages
- Add/Remove bookmarks from all movies and TV series
- Search for relevant shows on all pages
- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Bonus: Build this project as a full-stack application
- Bonus: If you're building a full-stack app, we provide authentication screen (sign-up/login) designs if you'd like to create an auth flow

### Links

- Solution URL: [This is my github repository](https://github.com/tvh1999/series_web)
- Live Site URL: [This is my live site](https://series-web-hoangs-projects-f65475ba.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind](https://tailwindcss.com/) - For styles
- Server actions - Connecting frontend with backend, hosting backend functions inside.
- [MongoDB](https://www.mongodb.com/) - Hosting the database of the app.
- [Mongoose](https://mongoosejs.com/) - Providing a layer on top of MongoDB. Allow devs to code backend, interact with mongoDB with much ease.

### What I learned

This project has been the pet project that I do alongside with my Next.js learning path. There are a lot to say but I don't want to indulge in it too much.

### Continued development

There are still some minor bugs in styling as I try to apply the backend processes along with Next.js resources in general. Also these bugs originate from my attempt at doing the theme mode (dark and light) and the project figma didn't provide any theme colors at all so I have to guess while doing it, which is terrible.

There is one particularly bug that I have not been able to fix: When the user delete their account from the project and there are no user accounts left in the database, this will delete all of the app series as well. I have made a temporary workaround by creating a server action function that will reload all of the app's series in case there are no users in the app AFTER THEY HAVE DELETED THEM ALL (which mean by default, this function will simply not run unless that particularly event happened)

## Author

- Frontend Mentor - [@tvh1999](https://www.frontendmentor.io/profile/tvh1999)
