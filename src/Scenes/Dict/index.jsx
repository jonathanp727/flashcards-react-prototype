import React, { useState, useEffect } from 'react';

import { lookup, increment } from 'services/dict';
import styles from './styles.scss';

const Word = ({ word }) => {
  console.log(word);
  return (
    <li>
      <button onClick={ () => increment(word) }></button>
      <span>{word._id}</span>
      <span>{word.jlpt ? ` n${word.jlpt.level} ` : ' '}</span>
      <span>{word.k_ele.keb}</span>
      <span>{word.r_ele.reb}</span>
      {word.sense.gloss.map ?
        word.sense.gloss.map((gloss) => (
          <span key={gloss._t}>{gloss._t}</span>
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
            <Word word={word} key={word._id}/>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dict;
