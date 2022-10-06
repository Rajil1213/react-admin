# React-Admin
A simple React App (bootstrapped with [`create-react-app`](https://github.com/facebook/create-react-app) using `typescript` as template) that serves as the frontend for [`go-admin`](https://github.com/Rajil1213/go-admin).

# How to run?
* `npm start`
  - Starts the server on port 3000
* `npm run build`
  - Builds the app for production to the `build` directory

# Code Structure
This section explains the code structure for the parts that are different from the default `create-react-app` template.

## [src/components](./src/components/)
This directory contains components that are common to all, if not most, pages. In short, these are the page components that get rendered the most often across all pages.

### [Menu](./src/components/Menu.tsx)
* Defines the `Menu` side bar for navigation.
* Available on private endpoints.

### [Nav](./src/components/Nav.tsx)
* Defines the top navbar.
* Houses the company logo and the sign-out button.

## [Wrapper](./src/components/Wrapper.tsx)
* Defines the wrapper for private endpoints pages.
* This includes the `Menu` and `Nav` components and wraps specific _private_ pages defined in [`pages`](./src/pages/).

## [src/pages](./src/pages/)
This directory contains page designs that are specific to certain endpoints. These pages form the main content of each web page.

### [Dashboard](./src/pages/Dashboard.tsx)
* Defines the `Dashbaord` page design.
* This page is wrapped in [`Wrapper`](./src/components/Wrapper.tsx).

### [Users](./src/pages/Users.tsx)
* Defines the `Users` page design.
* This page is wrapped in [`Wrapper`](./src/components/Wrapper.tsx).
### [Register](./src/pages/Register.tsx)
* Defines the `Register` page design.
* Redirects to `Login` page on successful registration.

### [Login](./src/pages/Login.tsx)
* Defines the Login page design.
* Redirects to root page on successful login.

