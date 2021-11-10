import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();
  useEffect(() => {
    listDecks().then((response) => setDecks(response));
  }, []);

  //Deletes a single deck and refreshes the page. deckId is the id of the mapped deck
  const handleDelete = (deckId) => {
    const result = window.confirm(
      "Delete this deck? \n\n You will not be able to recover it."
    );

    // if we click "ok" on the prompt, it runs deleteDeck from the api utils.
    if (result) {
      deleteDeck(deckId);
      // refreshes the page on a delete
      history.go();
    }
  };
  const deckList = decks.map(({ id, name, description, cards }) => {
    return (
      <div className="card" key={id}>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <div>{cards.length} cards</div>
          <p className="card-text">{description}</p>
          <Link to={`/decks/${id}`} className="btn btn-secondary col-2">
            View
          </Link>
          <Link to={`/decks/${id}/study`} className="btn btn-primary m-2 col-4">
            Study
          </Link>
          <button
            type="btn"
            className="btn btn-danger col-2"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Link to="/decks/new">
        <button className="btn btn-primary" type="button">
          Create Deck
        </button>
      </Link>
      {deckList}
    </div>
  );
}

export default Home;
