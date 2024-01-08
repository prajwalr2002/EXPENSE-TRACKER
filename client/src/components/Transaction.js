/*import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text} <span>{sign}₹{numberWithCommas(Math.abs(transaction.amount))}</span><button onClick={() => deleteTransaction(transaction._id)} 
      className="delete-btn">x</button>
    </li>
  )
}*/
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const synth = window.speechSynthesis; // Access the speech synthesis API

  const sign = transaction.amount < 0 ? '-' : '+';

  const handleDelete = () => {
    deleteTransaction(transaction._id);
    speak('Transaction deleted successfully.');
  };

  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
  };

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}{' '}
      <span>
        {sign}${Math.abs(transaction.amount)}
      </span>
      <button onClick={handleDelete} className="delete-btn">
        x
      </button>
    </li>
  );
};
