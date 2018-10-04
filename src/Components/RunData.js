import React from "react";
import timeChanger from "../Utils/timeChanger";
import { fetchRunnerData, fetchCategory } from "../Utils/api";
import RunInfo from "./RunInfo";
class RunData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runnerData: null,
      categoryData: null,
      navObj: {}
    };
  }

  async componentDidMount() {
    //Here we fetch data for the runner/streamer, as this is contained in a seperate endpoint than the game information

    const runnerData = await fetchRunnerData(
      this.props.runInfo[0].runs[0].run.players[0].uri.slice(8)
    );

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

    //Fetch all the information for the run category (Any%, 100%, etc)
    //The run category information is given to us in the shape of an ID and
    //We need to make a seperate API call to get the actual string name

    const categoryData = await fetchCategory(this.props.runInfo[0].category);
    newNavObj.categoryName = categoryData.name;

    this.setState({
      runnerData,
      categoryData,
      navObj: newNavObj
    });
  }

  //Once the run is finished and the user has chosen to view another
  //Send the current run to the navArray
  componentWillUnmount() {
    this.props.handleNavArray(this.state.navObj);
  }

  render() {
    return (
      <div className="run-data-container">
        {this.state.runnerData &&
          this.state.categoryData && <RunInfo>{this.state.navObj}</RunInfo>}
      </div>
    );
  }
}

export default RunData;
