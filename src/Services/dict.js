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
