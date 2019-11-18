--Database name BYO
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (100) NOT NULL,
    "last_name" VARCHAR (100),
    "email" VARCHAR (120),
    "username" VARCHAR (100),
    "password" VARCHAR (1000) NOT NULL
);

--table to store event records
CREATE TABLE "event" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (120) NOT NULL,
    "description" VARCHAR (240),
    "location" VARCHAR (120),
    "start_time" TIMESTAMP NOT NULL,
    "end_time" TIMESTAMP NOT NULL,
    "host_messages" TEXT,
    "host_id" int REFERENCES "user"
);

--table to store users events 
CREATE TABLE "user_event" (
    "id" SERIAL PRIMARY KEY,
    "invited_email" VARCHAR (120) NOT NULL,
    "attending" BOOLEAN,
    "user_id" int REFERENCES "user",
    "event_id" int REFERENCES "event" NOT NULL
);

--table to store the users restrictions

