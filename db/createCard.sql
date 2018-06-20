INSERT INTO card(deck_id, question, answer_1, answer_2, answer_3, answer_4, image, correct_answer)
VALUES(${deck_id}, ${question}, ${answer_1}, ${answer_2}, ${answer_3}, ${answer_4}, ${image}, ${correct_answer})
RETURNING *;