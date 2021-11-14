import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateCard } from "../../utils/api";
import FormCard from "./FormCard";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const id = cardId;
  useEffect(() => {
    readDeck(deckId).then((response) => setDeck(response));
  }, [deckId]);


  


  async function handleSubmit(evt, front, back) {
    await updateCard({ front, back, id, deckId: Number(deckId) });
    history.push(`/decks/${deck.id}`);
  }

  return (
    <>
      {/* navbar with boostrap breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <FormCard handleSubmit={handleSubmit} />
    </>
  );
}

export default EditCard;
