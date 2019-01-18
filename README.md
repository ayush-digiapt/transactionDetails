# (Magic) BEANS Application #

The name is inspired from the story of Jack and the Beanstalk. If you haven't been read that story during your childhood, head right here https://en.wikipedia.org/wiki/Jack_and_the_Beanstalk to know what you've missed.

This application will hold a base structure for building Web Applications based on the following technology stack

1. SQL (MySQL) (v5.7)
1. Express (v4.13.4)
1. AngularJS (v1.5.7)
1. Node.js (v6.2), LTS -> Start: 2016-10-01, Maintenance: 2018-04-01, End: 2019-04-01, Ref: https://github.com/nodejs/LTS

## Guidelines ##

Use LTS versions as much as possible for technologies

## How-To ##

Ref: http://expressjs.com/en/starter/generator.html

```
#!shell
$ npm install express-generator -g
```


```
#!shell
$ express --hbs myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/public/images
   create : myapp/views
   create : myapp/views/index.hbs
   create : myapp/views/layout.hbs
   create : myapp/views/error.hbs
   create : myapp/bin
   create : myapp/bin/www
```
   
install dependencies:
```
#!shell
     $ cd myapp && npm install
```
##Get beans-app src##
```
#!shell
Pull the latest beans-app source code.
Copy all the beans source files into your project directory. This includes the  beans generator,templates etc.
```
##Install Dependencies##
```
#!shell
Run "npm install". This will run the beans provided package.json which contains the libraries required for beans.
```
##Set the listening port on server##
```
#!shell
Change the port# to a desired value in bin/www file.
```
##Set the run configurations on server##
```
#!shell
Copy the config and lib folder from "beans-prototype-app" from git repo and change the DB parameters in config/demo.js.
```

```
#!shell
Create a "models" folder, directly under project root, which shall serve as a place holder for sequelize generated js model files.
```
##Create mysql schema.##
```
#!shell
Login into mysql and create the application's DB schema.
```

##Generate application models##
```
#!shell
Run the following command in your project folder.

sequelize-auto -o "./models" -d <dbname> -h localhost -u <dbuser> -p 3306 -x <dbpassword> -e mysql
sequelize-auto -o "./models" -d transactionDetails -h localhost -u transactionDetails -p 3306 -x transactionDetails -e mysql
```
##Beans backend code generator##
```
#!shell
cd <project-dir>
Run "node beans-gen-be.js" to create back end routes and controllers.
This will create a route file and controller for every table in the DB.
```
##Beans frontend code generator##
```
#!shell
cd <project-dir>
Run "node beans-gen-fe.js" to create front end routes,controllers,services,views and module definition .
```
```
#!shell
copy the index.html and bower.json(provided by beans) into <project-dir>/public and 
modify it to include all the front end angular files.
```
#install front end dependencies:#
```
#!shell
cd <project-dir>/public 
bower install
```
##Set up SPA's index.html##
```
#!shell
Modify the <project-dir>/public/index.html to include the module(table name) that you want to load. 
Wire together all the required files, for the angular module to get loaded.
```

##run the app:##
```
#!shell
     Do a "npm start" and access the webapp from your browser.
```
