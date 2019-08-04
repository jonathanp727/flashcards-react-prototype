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
      <button onClick={ () => increment(word, false) }>Didn't know</button>
      <button onClick={ () => increment(word, true) }>Kinda knew</button>
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
            <li key={word._id}>
              <button style={{display: 'inline'}} onClick={ () => increment(word, false) }>Didn't know</button>
              <button style={{display: 'inline'}} onClick={ () => increment(word, true) }>Kinda knew</button>
              <Entry entry={word} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dict;
