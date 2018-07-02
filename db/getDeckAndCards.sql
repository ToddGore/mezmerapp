SELECT deck.name, card.question
FROM deck
INNER JOIN card ON deck.id=card.deck_id
WHERE deck_id = $1;