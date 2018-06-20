UPDATE deck
SET name = ${name}, 
user_id = ${user_id},
stars = ${stars},
description = ${description}
WHERE id = ${id};