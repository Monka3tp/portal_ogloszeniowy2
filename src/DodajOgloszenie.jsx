import React, { useState } from "react";

function AddAnnouncement() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nowe ogłoszenie:", { title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <h2>Dodaj Ogłoszenie</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Tytuł:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Opis:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "8px" }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: "10px 15px", cursor: "pointer" }}>
          Dodaj
        </button>
      </form>
    </div>
  );
}

export default AddAnnouncement;
