INSERT INTO response(card_id, user_id, res_time, deck_id)
VALUES(${card_id}, ${user_id}, ${res_time}, ${deck_id})
RETURNING *;