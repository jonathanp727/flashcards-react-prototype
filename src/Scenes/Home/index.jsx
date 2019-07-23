import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import history from 'services/history';

import styles from './styles.scss';

function handleLookup(e, query) {
  e.preventDefault();
  history.push(`/dict/${query}`);
}

const Home = () => {
  const [query, setQuery] = useState('');
  console.log('Home()');

  return (
    <div className="home">
      <form>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <button onClick={(e) => handleLookup(e, query)} />
      </form>
      <Link to="/cards">Do Cards</Link>
    </div>
  );
}

export default Home;
