import React from 'react';
import './App.css'

function deleteModal({ show, handleClose, handleDelete, idToDelete, setIdToDelete }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>Delete by ID</h2>
        <input
          type="number"
          placeholder="Enter ID"
          value={idToDelete}
          onChange={(e) => setIdToDelete(e.target.value)}
        />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default deleteModal;
