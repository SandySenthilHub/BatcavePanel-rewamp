// PollsModal.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { BASE_URL } from '../../utils/ApplicationURL';
// import './pollsModal.css';

Modal.setAppElement('#root');

const PollsModal = ({ isOpen, onRequestClose }) => {
    const [polls, setPolls] = useState([]);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentPoll, setCurrentPoll] = useState(null);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                // const response = await axios.get('http://localhost:5000/api/polls');
                const response = await axios.get(`${BASE_URL}/api/polls`);

                setPolls(response.data);
            } catch (error) {
                console.error('Error fetching polls:', error);
                setError('Error fetching polls.');
            }
        };

        if (isOpen) {
            fetchPolls();
        }
    }, [isOpen]);

    const handleDelete = async (pollId) => {
      try {
        //   const response = await axios.delete(`http://localhost:5000/api/polls/${pollId}`);
          const response = await axios.delete(`${BASE_URL}/api/polls/${pollId}`);

          console.log('Poll deleted successfully:', response.data);
          // Update state or perform any necessary actions upon successful deletion
      } catch (error) {
          console.error('Error deleting poll:', error);
          // Handle error, such as displaying an error message to the user
      }
  };

    const handleEdit = (poll) => {
        setCurrentPoll(poll);
        setEditMode(true);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            // const response = await axios.put(`http://localhost:5000/api/polls/${currentPoll._id}`, currentPoll);
            const response = await axios.put(`${BASE_URL}/api/polls/${currentPoll._id}`, currentPoll);

            setPolls(polls.map(poll => (poll._id === currentPoll._id ? response.data : poll)));
            setEditMode(false);
            setCurrentPoll(null);
        } catch (error) {
            console.error('Error updating poll:', error);
            setError('Failed to update poll.');
        }
    };

    const handleChange = (event, index) => {
        const updatedOptions = [...currentPoll.options];
        updatedOptions[index] = { ...updatedOptions[index], text: event.target.value };
        setCurrentPoll({ ...currentPoll, options: updatedOptions });
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="All Polls"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>All Polls</h2>
            <button onClick={onRequestClose} className="close-btn">Close</button>
            <ul className="poll-list">
                {polls.map(poll => (
                    <li key={poll._id} className="poll-item">
                        <h3>{poll.question}</h3>
                        <ul>
                            {poll.options.map((option, index) => (
                                <li key={index}>
                                    {option.text} - {option.votes} votes
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => handleEdit(poll)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDelete(poll._id)} className="delete-btn">Delete</button>
                    </li>
                ))}
            </ul>

            {editMode && (
                <Modal
                    isOpen={editMode}
                    onRequestClose={() => setEditMode(false)}
                    contentLabel="Edit Poll"
                    className="modal"
                    overlayClassName="overlay"
                >
                    <h2>Edit Poll</h2>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            Question:
                            <input
                                type="text"
                                value={currentPoll.question}
                                onChange={(e) => setCurrentPoll({ ...currentPoll, question: e.target.value })}
                                required
                            />
                        </label>
                        {currentPoll.options.map((option, index) => (
                            <div key={index}>
                                <label>
                                    Option {index + 1}:
                                    <input
                                        type="text"
                                        value={option.text}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                    />
                                </label>
                            </div>
                        ))}
                        <button type="submit" className="submit-btn">Update Poll</button>
                    </form>
                    <button onClick={() => setEditMode(false)} className="close-btn">Cancel</button>
                </Modal>
            )}
        </Modal>
    );
};

export default PollsModal;
