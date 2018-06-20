INSERT INTO deck(name, user_id, stars, description)
VALUES(${name}, ${user_id}, ${stars}, ${description})
RETURNING *;