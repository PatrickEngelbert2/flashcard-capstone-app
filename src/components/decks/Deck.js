import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";

export default function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const history = useHistory();
  //   const [card, setCard] = useState({});
  useEffect(() => {
    readDeck(deckId).then((response) => setDeck(response));
  }, [deckId]);

  const cardList = deck.cards.map(({ front, back, id }) => {
    return (
      <div className="row" key={id}>
        <div className="col-sm-11">
          <div className="card">
            <div className="card-body">
              <p className="card-text">{front}</p>
              <p className="card-text">{back}</p>
              <Link
                to={`/decks/${deck.id}/cards/${id}/edit`}
                className="btn btn-secondary"
              >
                Edit
              </Link>
              <button
                type="btn"
                className="btn btn-danger col-2 m-2"
                onClick={() => handleDeleteCard(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  //Deletes a single deck and refreshes the page. deckId is the id of the mapped deck
  const handleDeleteDeck = (deckId) => {
    const result = window.confirm(
      "Delete this deck? \n\n You will not be able to recover it."
    );

    // if we click "ok" on the prompt, it runs deleteDeck from the api utils.
    if (result) {
      deleteDeck(deckId);
      // sends us home
      history.push("/");
    }
  };

  const handleDeleteCard = (cardId) => {
    const result = window.confirm(
      "Delete this card? \n\n You will not be able to recover it."
    );

    // if we click "ok" on the prompt, it runs deleteDeck from the api utils.
    if (result) {
      deleteCard(cardId);
      // refreshes the page on a delete
      history.go();
    }
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="card" key={deck.id}>
        <div className="card-body">
          <h3 className="card-title">{deck.name}</h3>
          <p className="card-text">{deck.description}</p>
          <Link
            to={`/decks/${deck.id}/edit`}
            className="btn btn-secondary col-2"
          >
            Edit
          </Link>
          <Link
            to={`/decks/${deck.id}/study`}
            className="btn btn-primary m-2 col-4"
          >
            Study
          </Link>
          <Link
            to={`/decks/${deck.id}/cards/new`}
            className="btn btn-primary m-2 col-2"
          >
            Add Cards
          </Link>
          <button
            type="btn"
            className="btn btn-danger col-2"
            onClick={() => handleDeleteDeck(deckId)}
          >
            Delete
          </button>
        </div>
      </div>
      <h2>Cards</h2>
      {cardList}
      </div>
  );
}
