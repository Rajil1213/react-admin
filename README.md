# React-Admin
A simple React App (bootstrapped with [`create-react-app`](https://github.com/facebook/create-react-app) using `typescript` as template) that serves as the frontend for [`go-admin`](https://github.com/Rajil1213/go-admin). This project is based on [this Udemy course](https://udemy.com/course/the-complete-react-golang-course). However, the source code has been updated to reflect modern changes as of the time of this writing.

# How to run?
* `npm start`
  - Starts the server on port 3000
* `npm run build`
  - Builds the app for production to the `build` directory
* `docker-compose up --build`
  - Creates a container that runs the app via `nginx` on port 80 (http).

# Code Structure
This section explains the code structure for the parts that are different from the default `create-react-app` template.

## [src/components](./src/components/)
This directory contains components that are common to most, if not all, pages. In short, these are the page components that get rendered the most often across all pages.

### [ImageUpload](./src/components/ImageUpload.tsx)
* Defines the button and form-data to handle the uploading of images.

### [Menu](./src/components/Menu.tsx)
* Defines the `Menu` side bar for navigation.
* Available on private endpoints.

### [Nav](./src/components/Nav.tsx)
* Defines the top navbar.
* Houses the company logo and the sign-out button.
* Connects to the `Redux` store for `User` information (`name`)

### [Paginator](./src/components/Paginator.tsx)
* Defines the `Previous` and `Next` buttons to handle moving through paginated results.
* Increments or decrements the page number as required in the parent element that invokes this using an emitter function as argument.

### [Wrapper](./src/components/Wrapper.tsx)
* Defines the wrapper for private endpoints pages.
* This includes the `Menu` and `Nav` components and wraps specific _private_ pages defined in [`pages`](./src/pages/).
* Pages wrapped with this redirect to `login` page if unauthenticated.
* Performs the `API` call to `profile` to fetch user profile information which is used to update the `Redux` store and used across multiple pages/components.

## [src/models](./src/models/)
This directory contains class definitions for database models, alongwith methods to manipulate them.

### [order-item](./src/models/order-item.ts)
* Defines the `OrderItem` database model (table).
* Contains the following fields:
  * `id`
  * `product_title`
  * `price`
  * `quantity`

### [order](./src/models/order.ts)
* Defines the `Order` database model (table).
* Contains the following fields:
  * `id`
  * `name`
  * `email`
  * `total`
  * `order_items` (a list of `OrderItems`)

### [permission](./src/models/permission.ts)
* Defines the `Permission` database model (table).
* Contains two fields namely, `id` and `name`.

### [Product](./src/models/Product.ts)
* Defines the `Product` database model (table).
* Contains the following fields:
  * `id`
  * `title`
  * `description`
  * `image`
  * `price`

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

### [orders](./src/pages/orders/)
This directory contains a single file [Orders.tsx](./src/pages/orders/Orders.tsx) that:
* Defines the orders page.
* Lists the orders (one per line) and corresponding order items underneath each line.
* Shows/Hides order items corresponding to each order based on a `View` action button.
* Is wrapped in [`Wrapper`](./src/components/Wrapper.tsx).

### [products](./src/pages/products/)
This directory houses the various pages pertaining to actions on the `Product` model. All pages are wrapped in [`Wrapper`](./src/components/Wrapper.tsx).

#### [ProductCreate](./src/pages/products/ProductCreate.tsx)
* Defines the page to create new product.
* Contains a form for getting the following user inputs:
  * `Title`
  * `Description`
  * `Image` (either a URL string or local file upload is supported)
  * `Price` (floating-point input with a precision of 0.01)

#### [ProductEdit](./src/pages/products/ProductEdit.tsx)
* Defines the page to edit exisiting products (when the `Edit` action button is clicked).
* Pre-populates the edit form with existing values for the product.

#### [Products](./src/pages/products/Products.tsx)
* Defines the main page that displays the various products.
* Lists the product `image`, `title`, `description`, `price` and associated actions for each product.
* Also implements the `Delete` action for the selected product.
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

### [Profile](./src/pages/Profile.tsx)
* Defines the `Profile` page design.
* Allows to edit general information of the user: `First Name`, `Last Name`, `Email` and private information: `Password` through two separate forms.
* Pre-populates the general information with the user's information.
* To prevent three separate calls to the `profile` API (from `profile` endpoint, `Nav` and `Wrapper`), a Redux store is implemented/connected.

## [redux](./src/redux/)
This directory defines the components for `Redux` integration (based partly on [`RTK`](https://redux-toolkit.js.org/))

### [actions](./src/redux/actions/)
This directory contains a single file [`setUserAction.ts`](./src/redux/actions/setUserAction.ts) that defines an action creator of `type` `SET_USER` and `payload` `user: User`. This is no longer required by `RTK` so everything here is commented out.

### [reducers](./src/redux/reducers/)
This directory contains a single file [`setUserReducer.ts`](./src/redux/reducers/setUserReducer.ts) that creates a slice based on `RTK` and exports the `actions` and `reducers` associated.

### [configureStore](./src/redux/configureStore.ts)
* Creates a store for the `User` model based on `RTK`.
* As the `User` model is not serializable, `serializableCheck` is disabled in the middleware.
