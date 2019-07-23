import React, { useState, useEffect } from 'react';
import styles from './styles.scss';

import { getUser, doCard } from 'services/card';
import { isSameDay } from 'lib/dateLogic';

const Card = ({ user, onDoCard }) => {
  let cur;
  let finished = false;
  let upcoming = false;
  if (user.upcoming.length > 0) {
    cur = user.upcoming[0];
    upcoming = true;
  } else {
    cur = user.cards[0];
    if (!isSameDay(new Date(user.words[cur].card.date), new Date())) {
      finished = true;
    }
  }
  const word = user.words[cur];
  console.log(word)
  return finished ? <span>Done for today!</span> : (
    <div>
      <span>{Array.isArray(word.entry.k_ele) ? word.entry.k_ele[0].keb : word.entry.k_ele.keb}</span>
      <button onClick={() => {doCard(cur, word.jlpt, upcoming, 1); onDoCard()}}>1</button>
      <button onClick={() => {doCard(cur, word.jlpt, upcoming, 2); onDoCard()}}>2</button>
      <button onClick={() => {doCard(cur, word.jlpt, upcoming, 3); onDoCard()}}>3</button>
      <button onClick={() => {doCard(cur, word.jlpt, upcoming, 4); onDoCard()}}>4</button>
      <button onClick={() => {doCard(cur, word.jlpt, upcoming, 5); onDoCard()}}>5</button>
    </div>
  )
}

const Cards = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Flip the needsUpdate value every time to trigger api update
  const [needsUpdate, setNeedsUpdate] = useState(false);

  // Reload user on every render for easy updating
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await getUser(window.USER_ID);
      setUser(result);

      setIsLoading(false);
    }

    fetchData();
  }, [needsUpdate]);

  return (
    <div className="cards">
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <Card user={user} onDoCard={() => setNeedsUpdate(!needsUpdate)} />
      )}
    </div>
  )
}

export default Cards;
