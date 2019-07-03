import React, { useState } from 'react';

import styles from 'styles.scss';

const Home = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="home">
      <form>
        <input value={query} onChange={setQuery} />
        <button onClick={} />
      </form>

    </div>
  );
}

export default Home;
