
CREATE TABLE saved (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    departureDate VARCHAR,
    returnDate VARCHAR,
    destination VARCHAR,
    flightTime VARCHAR,
    hotel VARCHAR,
    activity VARCHAR,
    saved VARCHAR
);



-- CREATE TABLE hotel (
--     id SERIAL PRIMARY KEY, 
--     tripId INT,
--     name VARCHAR,
--     cost INT
-- );

-- CREATE TABLE activities (
--     id SERIAL PRIMARY KEY, 
--     tripId INT,
--     activity VARCHAR
-- );

-- CREATE TABLE favorites (
--     id SERIAL PRIMARY KEY, 
--     user VARCHAR, 
--     tripId INT,
--     destination VARCHAR
-- );