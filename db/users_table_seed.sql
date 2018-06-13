CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(180),
    picture TEXT,
    auth_id TEXT
);