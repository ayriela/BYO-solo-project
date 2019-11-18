--Database name BYO
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (100),
    "last_name" VARCHAR (100),
    "email" VARCHAR (120) NOT NULL,
    "username" VARCHAR (100) NOT NULL,
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

--junction table to store user's events 
CREATE TABLE "user_event" (
    "id" SERIAL PRIMARY KEY,
    "invited_email" VARCHAR (120) NOT NULL,
    "attending" BOOLEAN,
    "user_id" int REFERENCES "user",
    "event_id" int REFERENCES "event" NOT NULL
);

--table to store the major categories of restrictions
CREATE TABLE "restriction" (
	"id" SERIAL PRIMARY KEY,
	"category" VARCHAR (100) NOT NULL,
	"details" VARCHAR (240)
);

--data for main allergy/restriction categories
INSERT INTO "restriction" ("category","details") 
VALUES ('Dairy', 'Milk products including cream, cheese, butter, yogurt, ghee, etc.'),('Vegetarian', 'Meat products including broth/stock, gelatin. lard, fish sauce, Worcestershire sauce, etc.'),('Wheat/Gluten', 'Wheat products may include breads, crackers, cereals, flour, gravy-if thickened with flour, etc.'),('Tree Nut','Tree nuts include almonds, walnuts, pecans, hazelnuts, pine nuts, lychee nuts, etc. NOTE: Does not include Peanuts.')

--junction table to tie users to major restrictions
CREATE TABLE "user_restriction" (
    "id" SERIAL PRIMARY KEY,
    "user_id" int REFERENCES "user" NOT NULL,
    "restriction_id" int REFERENCES "restriction" NOT NULL
);