# Backend API Documentation

## `/users/register` Endpoint

### Description

Registers a new user account with provided information

### HTTP Method 

`POST`

### Request Body

The request body should be in JSON format and include the following fields :

- `fullname` (object) :
    - `firstname` (string, required) : User's first name (min 3 chars). 
    - `lastname` (string, optional) : User's last name (min 3 chars).
- `email` (string, required) : User's email address (must be a valid email).
- `password` (string, required) : User's password (min 6 chars).

### Example Response 

- `user` (object) :
    - `fullname` (object).
        - `firstname` (string) : User's first name. 
        - `lastname` (string) : User's last name.
    - `email` (string) : User's email address.
    - `password` (string) : User's password.
- `token` (string) : JWT Token

## `/users/login` Endpoint

### Description

Authenticates a user using their email and password, returing a JWT token upon successful login and error on failure

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the below fields:

- `email` (string, required) : User's email address (must be a valid email).
- `password` (string, required) : User's password (min 6 chars).

### Example Response 

- `user` (object) :
    - `fullname` (object).
        - `firstname` (string) : User's first name. 
        - `lastname` (string) : User's last name.
    - `email` (string) : User's email address.
    - `password` (string) : User's password.
- `token` (string) : JWT Token


## `/users/profile` Endpoint

### Description

Retreives the people info of the currently authenticated user

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response

- `user` (object) :
    - `fullname` (object) :
        - `firstname` (string) : User's first name. 
        - `lastname` (string) : User's last name.
    - `email` (string) : User's email address.


## `/users/logout` Endpoint

### Description

Logout the current user and blacklist the token provided in cookie or headers

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header or cookie.

## `/captains/register` Endpoint

### Description

Registers a new captain account with provided information

### HTTP Method 

`POST`

### Request Body

The request body should be in JSON format and include the following fields :

- `fullname` (object) :
    - `firstname` (string, required) : Captain's first name (min 3 chars). 
    - `lastname` (string, optional) : Captain's last name (min 3 chars).
- `email` (string, required) : Captain's email address (must be a valid email).
- `password` (string, required) : Captain's password (min 6 chars).
- `vehicle` (object) :
    - `color` (string, required) : (min 3 chars)
    - `plate` (string, required) : (min 3 chars)
    - `capacity` (number, required) : (min 1)
    - `vehicleType` (string, required) : (must be 'car', 'motorcycle' or 'auto')

### Example Response 

- `captain` (object) :
    - `fullname` (object) :
        - `firstname` (string) : Captain's first name. 
        - `lastname` (string) : Captain's last name.
    - `email` (string) : Captain's email address.
    - `password` (string) : Captain's password.
    - `vehicle` (object) :
        - `color` (string) vehicle color
        - `plate` (string) vehicle number plate
        - `capacity` (number) vehicle capacity
        - `vehicleType` (string) vehicle type
- `token` (string) : JWT Token
