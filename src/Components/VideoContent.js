import React from 'react';
import parseUrl from 'parse-url';
import RunData from './RunData';
import placeholderImage from '../Assets/placeholderImage.png';
const VideoContent = props => {
  //The VideoConent object gets the URL from out data, and displays the video
  //However, our data from the API comes from multiple video sources (twitch/Youtube)
  //and different link formats for each.  Below, we parse our URLobject to find the source,
  //then extract the actual ID for the video based on the given link
  let id;
  let url;
  const urlObj = parseUrl(props.url);
  if (urlObj.resource === 'www.twitch.tv') {
    if (urlObj.pathname.indexOf('/videos/') > -1) {
      id = urlObj.pathname.slice(urlObj.pathname.indexOf('/videos/') + 8);
    } else if (urlObj.pathname.indexOf('/v/') > -1) {
      id = urlObj.pathname.slice(urlObj.pathname.indexOf('/v/') + 3);
    } else if (urlObj.pathname.indexOf('/c/') > -1) {
      id = urlObj.pathname.slice(urlObj.pathname.indexOf('/c/') + 3);
    }
    //Below we set our URL to the actual embedded link to be played in the iframe based on the video source
    url = `https://player.twitch.tv/?video=v${id}&autoplay=true`;
  } else if (urlObj.resource === 'www.youtube.com') {
    id = urlObj.search.slice(2);
    url = `https://www.youtube.com/embed/${id}?autoplay=1`;
  } else if (urlObj.resource === 'youtu.be') {
    id = urlObj.pathname.slice(1);
    url = `https://www.youtube.com/embed/${id}?autoplay=1`;
  } else {
    url = '';
  }
  return (
    <div className="video-content">
      <div className="iframe-container">
        {/*Below is a bit of a 'hack.' We get a placeholder image to be scaled along the inside of the iframe container based on the window size.
           This allows us to essentially attach the video to that image, making the iframe video responsive with a fixed aspect ratio without having
           to define set heights and widths to the video component
        */}
        <img
          className="ratio"
          src={placeholderImage}
          alt="Placeholder for resizing video. Ignore this!"
        />

        {/*Display the video*/}
        <iframe
          src={url}
          allowFullScreen="true"
          scrolling="no"
          title="speedrun video"
        />
      </div>

      {/*Display the information for the run*/}
      <RunData {...props} />
    </div>
  );
};

export default VideoContent;
