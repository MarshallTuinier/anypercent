//Here we define all of our API calls to be used in the app.  At the time of creation, I was unaware how headers for requests worked,
//So we use cors-anywhere to define them and all cross-origin referrences.  This will be refactored in a later version.

export const fetchGameList = async url => {
  let encodedURI = window.encodeURI(
    `https://cors-anywhere.herokuapp.com/${url}`
  );
  const response = await fetch(encodedURI);
  const data = await response.json();
  return data;
};

export const fetchGameRun = async id => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/www.speedrun.com/api/v1/games/${id}/records?top=1&scope=full-game`
  );
  const data = await response.json();
  return data.data;
};

export const fetchGameInfo = async id => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/www.speedrun.com/api/v1/games/${id}`
  );
  const data = await response.json();
  return data.data;
};

export const fetchRunnerData = async url => {
  let encodedURI = window.encodeURI(
    `https://cors-anywhere.herokuapp.com/${url}`
  );
  const response = await fetch(encodedURI);
  const data = await response.json();
  return data.data;
};

export const fetchCategory = async id => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/www.speedrun.com/api/v1/categories/${id}`
  );
  const data = await response.json();
  return data.data;
};
