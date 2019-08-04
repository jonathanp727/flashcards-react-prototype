import fetch from 'cross-fetch';

export function lookup(query) {
  return fetch(`/api/word/${query}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.status >= 400) {
      throw new Error(response);
    }
    return response.json();
  });
}

export function increment(word, kindaKnew) {
  return fetch(`/api/word/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: window.USER_ID,
      wordId: word._id,
      wordJlpt: word.jlpt, 
      kindaKnew,
    }),
  }).then((response) => {
    if (response.status >= 400) {
      throw new Error(response);
    }
    return response.json();
  });
}
