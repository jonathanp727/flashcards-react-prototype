import fetch from 'cross-fetch';

export function getUser(userId) {
  return fetch(`/api/user/${userId}`, {
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

export function doCard(wordId, wordJlpt, upcoming, quality) {
  return fetch(`/api/card/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: window.USER_ID,
      wordId: wordId,
      wordJlpt: wordJlpt,
      upcoming,
      response: quality,
    }),
  }).then((response) => {
    if (response.status >= 400) {
      throw new Error(response);
    }
    return response.json();
  });
}