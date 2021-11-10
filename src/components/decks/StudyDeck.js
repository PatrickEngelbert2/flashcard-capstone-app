import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";

export default function StudyDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const [currentCardNum, setCurrentCardNum] = useState(1);
  const [cardFront, setCardFront] = useState(true);
  useEffect(() => {
    readDeck(deckId).then((response) => setDeck(response));
  }, [deckId]);
  const card = deck.cards[currentCardNum - 1];

  function handleNext() {
    if (currentCardNum !== deck.cards.length) {
      setCurrentCardNum(currentCardNum + 1);
      setCardFront(true);
    } else {
      const result = window.confirm(
        "Restart Cards? \n\n Click 'cancel' to return to the home page."
      );
      if (result) {
        setCurrentCardNum(1);
        setCardFront(true);
      } else {
        history.push("/");
      }
    }
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
            Study
          </li>
        </ol>
      </nav>
      <div className="container">
        <h2>{deck.name}: Study</h2>
        <div className="card w-75">
          {deck.cards.length > 2 ? (
            <div className="card-body">
              <h5 className="card-title">
                Card {currentCardNum} of {deck.cards.length}
              </h5>

              {cardFront ? (
                <p className="card-text">{card.front}</p>
              ) : (
                <p className="card-text">{card.back}</p>
              )}

              <button
                type="btn"
                className="btn btn-secondary"
                onClick={() => setCardFront(!cardFront)}
              >
                Flip
              </button>

              {!cardFront ? (
                <button
                  type="btn"
                  className="btn btn-primary m-2"
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : null}
            </div>
          ) : (
            <>
              <div className="card-body">
                <h3 className="card-title">Not Enough Cards</h3>
                <p>
                  You need at least 3 cards to study. There are{" "}
                  {deck.cards.length} cards in this deck.
                </p>
                <Link
                  to={`/decks/${deck.id}/cards/new`}
                  className="btn btn-primary"
                >
                  Add Cards
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
