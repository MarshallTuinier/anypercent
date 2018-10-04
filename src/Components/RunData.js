import React from "react";
import timeChanger from "../Utils/timeChanger";
import { fetchRunnerData, fetchCategory } from "../Utils/api";
import RunInfo from "./RunInfo";
import ReactLoading from "react-loading";

class RunData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runnerData: null,
      categoryData: null,
      navObj: {},
      loading: true
    };
  }

  async componentDidMount() {
    //Here we fetch data for the runner/streamer, as this is contained in a seperate endpoint than the game information
    //Fetch all the information for the run category (Any%, 100%, etc)
    //The run category information is given to us in the shape of an ID and
    //We need to make a seperate API call to get the actual string name
    const [categoryData, runnerData] = await Promise.all([
      fetchCategory(this.props.runInfo[0].category),
      fetchRunnerData(this.props.runInfo[0].runs[0].run.players[0].uri.slice(8))
    ]);

    let newNavObj = this.state.navObj;
    newNavObj.gameName = this.props.gameInfo.names.twitch;

    //Property check to ensure the runner has a name
    if (runnerData.hasOwnProperty("names")) {
      newNavObj.runnerName = runnerData.names.international;
    } else {
      newNavObj.runnerName = runnerData.name;
    }

    //Convert the run time in seconds to HH:MM:SS
    newNavObj.time = timeChanger(
      this.props.runInfo[0].runs[0].run.times.primary_t
    );

    newNavObj.gameId = this.props.gameId;

    //Link to the runners speedrun database
    newNavObj.siteLink = runnerData.weblink;

    //Link to the runners Twitch account
    if (!!runnerData.twitch) {
      newNavObj.twitchLink = runnerData.twitch.uri;
    } else {
      newNavObj.twtichLink = "#";
    }

    newNavObj.categoryName = categoryData.name;

    this.setState({
      runnerData,
      categoryData,
      navObj: newNavObj,
      loading: false
    });
  }

  //Once the run is finished and the user has chosen to view another
  //Send the current run to the navArray
  componentWillUnmount() {
    this.props.handleNavArray(this.state.navObj);
  }

  render() {
    if (this.state.loading) {
      return (
        <div
          className="run-data-container"
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <ReactLoading
            type="spinningBubbles"
            color="#5ab9ea"
            height="100px"
            width="100px"
          />
        </div>
      );
    }
    return (
      <div className="run-data-container">
        <RunInfo>{this.state.navObj}</RunInfo>
      </div>
    );
  }
}

export default RunData;
