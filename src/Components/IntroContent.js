import React from "react";
import ReactLoading from "react-loading";

//Landing page to intoduce the concept of the site
const IntroContent = props => {
  return (
    <div className="main-content">
      <h1>Welcome to anypercent.com</h1>
      <h2>
        Find new, awesome games and runners by watching the{" "}
        <i>best of the best</i>.
      </h2>
      <p>
        {" "}
        We've all seen hundreds of Super Mario 64, Ocarina of Time, and Super
        Metroid runs. These are all great, and have brought thousands of viewers
        to the speedrunning scene. But what about the smaller, more esoteric
        titles? Those games and runners deserve some love, and this is your
        chance to give it to them! Here at anypercent, all games are created
        equal. As you chose a random game, you'll then be presented with a
        world-record-setting speedrun for that title. The category for the run
        can range from Any%, to 100%, and everything in between.
      </p>
      <h2>Watch random, record-setting speedruns!</h2>
      <p>
        Watch runs. Follow runners. Maybe be inspired set a record yourself.
        This is <span className="bold">anypercent</span>.
      </p>
      <button
        className="button"
        onClick={props.handleNewGame}
        disabled={props.initialLoading}
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "0"
        }}
      >
        {" "}
        {props.initialLoading ? (
          <ReactLoading
            type="spinningBubbles"
            color="#FFF"
            height="50px"
            width="50px"
          />
        ) : (
          "Get Started"
        )}
      </button>
    </div>
  );
};

export default IntroContent;
