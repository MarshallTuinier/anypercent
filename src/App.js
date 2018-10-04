import React, { Component } from "react";
import IntroContent from "./Components/IntroContent";
import VideoContent from "./Components/VideoContent";
import Nav from "./Components/Nav";
import { fetchGameList, fetchGameRun, fetchGameInfo } from "./Utils/api";
import ReactLoading from "react-loading";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameList: [],
      currentGameInfo: null,
      currentGameRun: null,
      mainSeen: false,
      loading: true,
      initialLoading: true,
      navArray: []
    };
  }

  //This method is called each time a new run is selected.  The old navObj is passed to the navArray in order to be displayed in the sidebar

  handleNavArray = navObj => {
    let newArray = this.state.navArray;
    newArray.push(navObj);
    this.setState({ navArray: newArray });
  };

  //Sets the App for a new game. The potentialId is an optional parameter used if a given run is to be rewatched
  handleNewGame = async potentialId => {
    //Clear App State
    this.setState({
      loading: true
    });
    //Assign gameId to a random game's id, from the data pulled from the API
    let gameId = this.state.gameList[
      Math.floor(Math.random() * this.state.gameList.length)
    ].id;

    //If potentialId was passed to the function, assign our gameId to that param
    if (typeof potentialId === "string") {
      gameId = potentialId;
    }

    const [gameData, runData] = await Promise.all([
      fetchGameInfo(gameId),
      fetchGameRun(gameId)
    ]);

    if (
      runData.length > 0 &&
      runData[0].runs.length > 0 &&
      runData[0].runs[0].run.videos &&
      runData[0].runs[0].run.videos.links
    ) {
      this.setState({
        mainSeen: true,
        loading: false,
        gameId: gameId,
        currentGameInfo: gameData,
        currentGameRun: runData
      });
    } else {
      this.handleNewGame();
    }
  };

  componentDidMount = async () => {
    //Here we define our listFetcher helper function, using a fetchGameList helper from the Utils folder.
    //This will populate our gameList state with all the potential games to choose from.
    const listFetcher = async url => {
      const data = await fetchGameList(url);

      //pagination to continue fetching
      data.pagination.links.forEach(obj => {
        if (obj.rel === "next") {
          listFetcher(obj.uri);
        }
      });
      this.setState(prevState => ({
        gameList: prevState.gameList.concat(data.data),
        initialLoading: false
      }));
    };

    //Actual call to the API
    listFetcher("http://www.speedrun.com/api/v1/games?_bulk=yes&max=1000");
  };

  render() {
    if (!this.state.mainSeen) {
      return (
        <div className="home-container">
          <Nav
            handleNewGame={this.handleNewGame}
            navArray={this.state.navArray}
            initialLoading={this.state.initialLoading}
          />
          <IntroContent
            handleNewGame={this.handleNewGame}
            initialLoading={this.state.initialLoading}
          />
        </div>
      );
    }
    return (
      <div className="home-container">
        <Nav
          handleNewGame={this.handleNewGame}
          navArray={this.state.navArray}
          initialLoading={this.state.initialLoading}
        />

        {/*Depending on loading state, we display either a spinner or the video content*/}

        {this.state.loading ? (
          <div className="loading">
            <ReactLoading
              type="spinningBubbles"
              color="#5ab9ea"
              height="200px"
              width="200px"
            />
          </div>
        ) : (
          <VideoContent
            handleNavArray={this.handleNavArray}
            url={this.state.currentGameRun[0].runs[0].run.videos.links[0].uri}
            gameInfo={this.state.currentGameInfo}
            runInfo={this.state.currentGameRun}
            gameId={this.state.gameId}
          />
        )}
      </div>
    );
  }
}

export default App;
