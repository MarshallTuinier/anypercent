//Helper function to convert time given in total seconds to a format of HH:MM:SS to be used in the RunInfo component
const timeChanger = timeInSeconds => {
  let minutes = Math.floor(timeInSeconds / 60);
  let secondsRemaining = Math.round(timeInSeconds - minutes * 60);
  if (secondsRemaining < 10) {
    secondsRemaining = `0${secondsRemaining}`;
  }
  if (minutes < 60) {
    return `${minutes}:${secondsRemaining}`;
  }
  let hours = Math.floor(minutes / 60);
  let minutesRemaining = minutes - hours * 60;
  if (minutesRemaining < 10) {
    minutesRemaining = `0${minutesRemaining}`;
  }
  return `${hours}:${minutesRemaining}:${secondsRemaining}`;
};

export default timeChanger;
