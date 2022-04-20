# LightBnB

## About
This project was completed by [me](https://www.linkedin.com/in/seun-oshitade-53001120b/) as part of my learnings at [Lighthouse Labs](https://www.lighthouselabs.ca/en). 

Similar to AirBnB, LightBnB works as a platform that connects property owners and users for booking accommodation based on user-defined criteria. The task was to:
* Design and build a database with `postgresql` from the Command Line based on given requirements;
* Integrate the database with the server and by extension the frontend of the web application; and 
* Set up queries to dynamically render information to to the frontend as users interact with the application.

## Selected Features
* Persist user data once they have signed up
* Render data related to logged-in user
* Search for available properties based on criteria such as location, cost, rating, etc
* Create new users and property listings with data persistence on `postgresql`
* Protect application from `SQL Injection Attacks`

## Entity RelationShip Diagram

![entity-relationship diagram](https://github.com/s-oshitade/lightbnb/blob/master/docs/entity-relationship-diagram.jpeg?raw=true)

## Getting Started
1. Create a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
4. From the LightBnB_WebApp-master directory, run the `npm run local` command.
5. Go to http://localhost:3000/ in your browser to view the app.

## Dependencies

* bcrypt
* body-parser
* cookie-session
* dotenv
* express
* nodemon
* node-postgres

## Acknowledgement
Special thanks to [Ian Bentley](https://github.com/idbentley/lighthouse-lectures/commits?author=idbentley) for his amazing delivery of the Relational Database module in my course of study!

## License
This project is open source and available under the ISC license.