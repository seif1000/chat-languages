# chat-languages
chat web app where you can choose the language you want to discusse with and start chating .


##Index

+ [Demo](#demo)
+ [Features](#features)
+ [Installation](#installation)


## Demo<a name="demo"></a>
Check [Demo](https://evening-harbor-24520.herokuapp.com)


## Features<a name="features"></a>
+ Uses Express as the application Framework.
+ Authenticates via username and password [express-session](https://www.npmjs.com/package/express-session) package..
+ Passwords are hashed using [bcryptjs]https://github.com/dcodeIO/bcrypt.js package.
+ Uses [MongoDB](https://github.com/mongodb/mongo), [Mongoose](https://github.com/Automattic/mongoose) and [MongoLab(mLab)](https://mlab.com/) for storing and querying data.
+ ejs template engine [ejs](https://ejs.co/)
+ bulam css framwork [bulma](https://bulma.io/)
+ socket.io [socket.io](https://socket.io/)


## Installation<a name="installation"></a>
### Running Locally
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1. Clone or Download the repository

	```
	$ git clone https://github.com/seif1000/chat-languages.git
	$ cd  chat-languages
	```
2. Install Dependencies

	```
	$ npm install 
  
  
  3. Start the application

	```
	$ npm run dev
	```
Your app should now be running on [localhost:3000](http://localhost:3000/).
  
