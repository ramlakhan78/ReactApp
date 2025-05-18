import React, { useState } from 'react';

const UpdateTask = ({ task, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate({ ...task, title, description });
    }
  };

  return (
    <div className="update-task">
      <h2>Update Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="task-title">Title</label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="task-desc">Description</label>
          <textarea
            id="task-desc"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Update</button>
          <button type="button" onClick={onCancel} style={{ marginLeft: '8px' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;