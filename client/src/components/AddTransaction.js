/*import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

/*export const AddTransaction = () =>{ 
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      text,
      amount: +amount
    }

    addTransaction(newTransaction);
    setText('');
    setAmount(0);
  };

  return(
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};*/


import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');
  const synth = window.speechSynthesis; // Access the speech synthesis API

  const { addTransaction } = useContext(GlobalContext);

  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!text.trim() && isNaN(amount)) {
      setError('Please enter both text and amount.');
      speak('Please enter both text and amount.');
    } else if (!text.trim()) {
      setError('Please enter text.');
      speak('Please enter text.');
    } else if (isNaN(amount) || +amount === 0) {
      setError('Please enter amount.');
      speak('Please enter a valid amount.');
    } else {
      const newTransaction = {
        text,
        amount: +amount,
      };

      // Add the transaction
      addTransaction(newTransaction);

      // Clear the input fields and error
      setText('');
      setAmount('');
      setError('');
      speak('Transaction added successfully.');
    }
  };

  return (
    <>
      <h3>Add new transaction</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount (negative - expense, positive - income)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
