import React, { useState } from 'react';

import history from 'services/history';

import styles from './styles.scss';

function handleLookup(e, query) {
  e.preventDefault();
  history.push(`/dict/${query}`);
}

const Home = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="home">
      <form>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <button onClick={(e) => handleLookup(e, query)} />
      </form>

    </div>
  );
}

export default Home;
