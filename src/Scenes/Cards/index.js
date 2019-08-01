import React, { useState, useEffect } from 'react';
import styles from './styles.scss';

import { getUser, doCard } from 'services/card';
import { isSameDay } from 'lib/dateLogic';

const Card = ({ user, onDoCard, redoQueue }) => {
  console.log('user', user);

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
  console.log('cur word', word);

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

  if (!Array.isArray(word.entry.sense)) {
    word.entry.sense[0] = word.entry.sense;
  }

  const front = word.entry.k_ele ? (Array.isArray(word.entry.k_ele) ? word.entry.k_ele[0].keb : word.entry.k_ele.keb) : (Array.isArray(word.entry.r_ele) ? word.entry.r_ele[0].reb : word.entry.r_ele.reb);
  const back = Array.isArray(word.entry.sense[0].gloss) ? word.entry.sense[0].gloss : [word.entry.sense[0].gloss];

  return finished ? <span>Done for today!</span> : (
    <div>
      <Cardcard front={front} back={back} onClick={onClick} /> 
    </div>
  )
}

const Cardcard = ({ front, back, onClick }) => {
  const [isFlipped, flip] = useState(false);

  if (isFlipped) {
    return (
      <div>
        <span>{front}</span>
        {
          back.map((el) => {
            return <span key={el._t}>{el._t}</span>
          })
        }
        <button onClick={() => onClick(1)}>1</button>
        <button onClick={() => onClick(2)}>2</button>
        <button onClick={() => onClick(3)}>3</button>
        <button onClick={() => onClick(4)}>4</button>
        <button onClick={() => onClick(5)}>5</button>
      </div>
    );
  } else {
    return (
      <div onClick={() => flip(true)}>
        <span>{front}</span>
      </div>
    );
  }
}

const Cards = () => {
  const [data, setData] = useState({ isLoading: true, user: null, needsUpdate: true, redoQueue: [] });
  // Flip the needsUpdate value every time to trigger api update

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
