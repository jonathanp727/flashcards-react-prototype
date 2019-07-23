import React, { useState, useEffect } from 'react';
import styles from './styles.scss';

import { getUser, doCard } from 'services/card';
import { isSameDay } from 'lib/dateLogic';

const Card = ({ user, onDoCard, redoQueue }) => {
  console.log('Card()');

  let cur;
  let finished = false;
  let upcoming = false;
  let isRedo = false;
  if (user.upcoming.length > 0) {
    cur = user.upcoming[0];
    upcoming = true;
  } else {
    cur = user.cards[0];
    if (!isSameDay(new Date(user.words[cur].card.date), new Date())) {
      if (redoQueue.length === 0) {
        finished = true;
      } else {
        isRedo = true;
        cur = redoQueue[0];
      }
    }
  }
  const word = user.words[cur];

  const onClick = (quality) => {
    if (!isRedo) {
      doCard(cur, word.jlpt, upcoming, quality);
    }
    if (quality < 4 && !isRedo) {
      onDoCard(cur, null);
    } else if(quality >= 4 && isRedo) {
      onDoCard(null, cur);
    } else if(isRedo) {
      onDoCard(null, null, true);
    } else {
      onDoCard(null, null);
    }
  }

  return finished ? <span>Done for today!</span> : (
    <div>
      <span>{Array.isArray(word.entry.k_ele) ? word.entry.k_ele[0].keb : word.entry.k_ele.keb}</span>
      <button onClick={() => onClick(1)}>1</button>
      <button onClick={() => onClick(2)}>2</button>
      <button onClick={() => onClick(3)}>3</button>
      <button onClick={() => onClick(4)}>4</button>
      <button onClick={() => onClick(5)}>5</button>
    </div>
  )
}

const Cards = () => {
  console.log('Cards()');
  const [data, setData] = useState({ isLoading: true, user: null, needsUpdate: true, redoQueue: [] });
  // Flip the needsUpdate value every time to trigger api update
  console.log(data.redoQueue);

  // Reload user on every render for easy updating
  useEffect(() => {
    const fetchData = async () => {
      const result = await getUser(window.USER_ID);

      setData(prevState => ({ ...prevState, isLoading: false, user: result }));
    }

    fetchData();
  }, [data.needsUpdate]);

  // push and pull are IDS of cards to be added or removed from redoQueue, null if not necessary
  // Shift rotates the array by 1 so that a new card is at the front
  const onDoCard = (push, pull, shift=false) => {
    const newQ = data.redoQueue.filter(el => el !== pull);
    if (push) newQ.push(push);
    if (shift) {
      const temp = newQ.shift();
      newQ[newQ.length] = temp;
    }
    setData({ redoQueue: newQ ,isLoading: true, user: null, needsUpdate: !data.needsUpdate });
  }

  return (
    <div className="cards">
      {data.isLoading ? (
        <div>loading...</div>
      ) : (
        <Card user={data.user} onDoCard={onDoCard} redoQueue={data.redoQueue} />
      )}
    </div>
  )
}

export default Cards;
