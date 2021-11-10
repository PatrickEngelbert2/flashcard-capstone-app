import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

export default function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const id = deckId;
  const [name, setName] = useState("");
  const [description, setDescription] = useState(deck.description);
  useEffect(() => {
    readDeck(deckId).then((response) => {
      setDeck(response);
      setName(response.name);
      setDescription(response.description);
    });
  }, [deckId, setName, setDeck, setDescription]);
  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    updateDeck({ name, description, id }).then((response) => {
      setDeck(response);
      history.push(`/decks/${deck.id}`);
    });
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
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder={deck.name}
            onChange={handleNameChange}
            value={name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder={deck.description}
            onChange={handleDescriptionChange}
            value={description}
            required
          ></textarea>
        </div>
        <Link
          to={`/decks/${deck.id}`}
          className="btn btn-secondary m-2"
        >
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
