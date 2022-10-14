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
This directory contains components that are common to most, if not all, pages. In short, these are the page components that get rendered the most often across all pages.

### [Menu](./src/components/Menu.tsx)
* Defines the `Menu` side bar for navigation.
* Available on private endpoints.

### [Nav](./src/components/Nav.tsx)
* Defines the top navbar.
* Houses the company logo and the sign-out button.

### [Wrapper](./src/components/Wrapper.tsx)
* Defines the wrapper for private endpoints pages.
* This includes the `Menu` and `Nav` components and wraps specific _private_ pages defined in [`pages`](./src/pages/).
* Pages wrapped with this redirect to `login` page if unauthenticated.

## [src/models](./src/models/)
This directory contains class definitions for database models, alongwith methods to manipulate them.

### [permission](./src/models/permission.ts)
* Defines the `Permission` database model (table).
* Contains two fields namely, `id` and `name`.

### [role](./src/models/role.ts)
* Defines the `Role` database model (table).
* Contains two fields namely, `id` and `name`.

### [user](./src/models/user.ts)
* Defines the `User` database model (table).
* Contains the following fields:
  * `id`
  * `first_name`
  * `last_name`
  * `email`
  * `role` (instantiation of the `Role` model defined in [role](./src/models/role.ts))
* Contains the getter `name` to get the full name of the user.

## [src/pages](./src/pages/)
This directory contains page designs that are specific to certain endpoints. These pages form the main content of each web page.

### [users](./src/pages/users)
This is a separate subdirectory to house the various pages pertaining to `User` activities. All pages are wrapped in [`Wrapper`](./src/components/Wrapper.tsx).

#### [Users](./src/pages/users/Users.tsx)
* Defines the main `Users` page design.
* Lists the user `id`, `name`, `email` and associated `actions`.
* Handles deletion of existing users.

#### [UserCreate](./src/pages/users/UserCreate.tsx)
* Defines the page that handles the creation of new users.
* Contains a form for getting the following user inputs:
  * `first_name`
  * `last_name`
  * `email`
  * `role_id` (displayed as the `role_name` in the form)

#### [UserEdit](./src/pages/users/UserEdit.tsx)
* Defines the page to handle the editing of existing users.
* Pre-populates the edit form with the existing values.

### [roles](./src/pages/roles/)
This is a separate directory to house the various pages pertaining to `role` activities. All pages are wrapped in [`Wrapper`](./src/components/Wrapper.tsx).

#### [Roles](./src/pages/roles/Roles.tsx)
* Defines the main `roles` page. 
* Lists the role `id`, `name` and associated `actions`.
* Handles the deletion of existing roles.

#### [RoleCreate](./src/pages/roles/RoleCreate.tsx)
* Defines the page to create new roles.
* Lists the available permissions as checkboxes for selection.

#### [RoleEdit](./src/pages/roles/RoleEdit.tsx)
* Defines the page to edit existing roles.
* Pre-populates the form fields with existing values for the role.
### [Dashboard](./src/pages/Dashboard.tsx)
* Defines the `Dashbaord` page design.
* This page is wrapped in [`Wrapper`](./src/components/Wrapper.tsx).

### [Register](./src/pages/Register.tsx)
* Defines the `Register` page design.
* Redirects to `Login` page on successful registration.

### [Login](./src/pages/Login.tsx)
* Defines the Login page design.
* Redirects to root page on successful login.

