--Database name BYO

--table to store users
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
	"details" VARCHAR (240),
    "question_word" varchar(120)
);

--data for main allergy/restriction categories
INSERT INTO "restriction" ("category", "details", "question_word") VALUES ('Dairy', 'Milk products including cream, cheese, butter, yogurt, ghee, etc.','Dairy'),('Vegetarian', 'Meat products including broth/stock, gelatin. lard, fish sauce, Worcestershire sauce, etc.','Meat'),('Wheat/Gluten', 'Wheat products may include breads, crackers, cereals, flour, gravy-if thickened with flour, etc.','Wheat'),('Tree Nut','Tree nuts include almonds, walnuts, pecans, hazelnuts, pine nuts, lychee nuts, etc. NOTE: Does not include Peanuts.','Tree Nuts');

INSERT INTO "restriction" ("category", "details", "question_word") VALUES 
('Egg', 'Eggs may be included in baked goods, icings, certain dressings, mayonnaise, or as binding in foods like meatballs.', 'Eggs' ),
('Peanut', 'Peanuts may be found in peanut butters, peanut oil, processed foods, sauces, chocolates and more.', 'Peanuts'),
('Shellfish', 'Shellfish includes shrimp, crab, lobster, mussels, oysters, scallops, octopus, squid, cuttlefish/squid ink, krill, prawns, crawfish', 'Shellfish'),
('Soy', 'Soy is included in soy sauce, tofu, miso, worcestershire, edamame, many processed foods like crackers, broths/soups, etc.', 'Soy' ),
('Fish', 'Fish can include all forms of canned, frozen, raw, or fresh fish. It can also be found in Caesar dressing, fish sauces, Caponata, Worcestershire, and bouillabaise.', 'Fish'),
('Vegan','These can include Dairy, Eggs, Meats, Gelatin, Honey, etc.','Animal Derived Products'),
('Sesame', 'Sesame can be found in sesame oils, dressings, seed mixes, breads, halvah, tahini, and more.', 'Sesame');

--junction table to tie users to major restrictions
CREATE TABLE "user_restriction" (
    "id" SERIAL PRIMARY KEY,
    "user_id" int REFERENCES "user" NOT NULL,
    "restriction_id" int REFERENCES "restriction" NOT NULL,
    "active" boolean default False
);

--food table to store event's foods
CREATE TABLE "food" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (120) NOT NULL,
    "ingredients" TEXT,
    "user_id" int REFERENCES "user",
    "event_id" INT REFERENCES "event");

--CREATE user_added_restriction (for next planned feature)
 CREATE TABLE "user_added_restriction" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (120) NOT NULL,
    "user_id" int REFERENCES "user");

--food_restriction junction table 
  CREATE TABLE "food_restriction" (
    "id" SERIAL PRIMARY KEY,
    "food_id" INT REFERENCES "food",
    "ingredients" TEXT,
    "restriction_id" int REFERENCES "restriction",
    "user_restriction_id" INT REFERENCES "user_added_restriction");


