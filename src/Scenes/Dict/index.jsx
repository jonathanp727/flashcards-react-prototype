import React, { useState, useEffect } from 'react';

import { lookup } from 'services/dict';
import styles from './styles.scss';

const Word = ({ word }) => {

  return (
    <li>
      <span>{word.k_ele.keb}</span>
      <span>{word.r_ele.reb}</span>
      {word.sense.gloss.map ?
        word.sense.gloss.map((gloss) => (
          <span>{gloss._t}</span>
        )) : 
        <span>{word.sense.gloss._t}</span>
      }
    </li>
  );
}

const Dict = (props) => {
  const { query } = props.match.params;

  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await lookup(query);
      setWords(result);

      setIsLoading(false);
    }

    fetchData();
  }, [query]);

  return (
    <div className="dict">
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <ul>
          {words.map(word => (
            <Word word={word} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dict;
