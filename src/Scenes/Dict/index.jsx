import React, { useState, useEffect } from 'react';

import Entry from 'components/Entry';
import { lookup, increment } from 'services/dict';
import styles from './styles.scss';

const Word = ({ word }) => {
  console.log(word);
  let gloss;
  if (word.sense[0]) {
    gloss = word.sense[0].gloss;
  } else {
    gloss = word.sense.gloss;
  }
  return (
    <li>
      <button onClick={ () => increment(word) }></button>
      <span>{word._id}</span>
      <span>{word.jlpt ? ` n${word.jlpt.level} ` : ' '}</span>
      <span>{word.k_ele ? word.k_ele.keb : null}</span>
      <span>{word.r_ele ? word.r_ele.reb : null}</span>
      <ul style={{  }}>
        {gloss.map ?
          gloss.map((g) => (
            <li key={g._t}>{g._t}</li>
          )) : 
          <li>{gloss._t}</li>
        }
      </ul>
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
            <li>
              <button style={{display: 'inline'}} onClick={ () => increment(word) }></button>
              <Entry entry={word} key={word._id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dict;
