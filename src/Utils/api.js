//Here we define all of our API calls to be used in the app.  At the time of creation, I was unaware how headers for requests worked,
//So we use cors-anywhere to define them and all cross-origin referrences.  This will be refactored in a later version.

export const fetchGameList = url => {
  let encodedURI = window.encodeURI(
    `https://cors-anywhere.herokuapp.com/${url}`
  );
  return fetch(encodedURI).then(response => response.json());
};

export const fetchGameRun = id => {
  return fetch(
    `https://cors-anywhere.herokuapp.com/www.speedrun.com/api/v1/games/${id}/records?top=1&scope=full-game`
  )
    .then(response => response.json())
    .then(data => data.data);
};

export const fetchGameInfo = id => {
  return fetch(
    `https://cors-anywhere.herokuapp.com/www.speedrun.com/api/v1/games/${id}`
  )
    .then(response => response.json())
    .then(data => data.data);
};

export const fetchRunnerData = url => {
  let encodedURI = window.encodeURI(
    `https://cors-anywhere.herokuapp.com/${url}`
  );
  return fetch(encodedURI)
    .then(response => response.json())
    .then(data => data.data);
};

export const fetchCategory = id => {
  return fetch(
    `https://cors-anywhere.herokuapp.com/www.speedrun.com/api/v1/categories/${id}`
  )
    .then(response => response.json())
    .then(data => data.data);
};
