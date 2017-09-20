import React from "react";

//This component is passed data to be displayed in both the NavBar and underneath the Video
//Display the Runner's name, run category, time, and links to their speedrunDB/Twitch channel
const RunInfo = props => {
  return (
    <div className="run-data">
      <div className="info-container">
        <div className="run-data-game">
          <p style={{ fontWeight: "bold" }}>
            {props.children.gameName}
          </p>
          <p>
            {props.children.categoryName}
          </p>
        </div>
        <div className="run-data-runner">
          <p>
            <a
              href={props.children.siteLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#5ab9ea" }}
              title={props.children.runnerName + "'s speedrun page"}
            >
              <i className="fa fa-user-circle" aria-hidden="true" />
            </a>
            {"    "}
            <a
              href={props.children.twitchLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#5ab9ea" }}
              title={props.children.runnerName + "'s Twitch.TV"}
            >
              <i className="fa fa-twitch" aria-hidden="true" />
            </a>
            {"    "}
            <span style={{ fontWeight: "bold" }}>
              {props.children.runnerName}
            </span>
          </p>
          <p>
            <i className="fa fa-clock-o" aria-hidden="true" />{" "}
            {props.children.time}
          </p>
        </div>
        <div className="watch-again">
          <i
            className="fa fa-refresh watchAgain"
            title="Watch this run again!!"
            aria-hidden="true"
            style={{ fontSize: "20px", color: "#5ab9ea" }}
            onClick={() => props.handleNewGame(props.children.gameId)}
          />
        </div>
      </div>
    </div>
  );
};

export default RunInfo;
