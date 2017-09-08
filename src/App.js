import React, { Component } from "react";
import IntroContent from './Components/IntroContent'
import VideoContent from './Components/VideoContent'
import Nav from './Components/Nav'
import { fetchGameList, fetchGameRun, fetchGameInfo } from './Utils/api'
import ReactLoading from 'react-loading'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      gameList: [],
      currentGameInfo: null,
      currentGameRun: null,
      mainSeen: false,
      hasRun: false,
      hasInfo: false,
      buttonsDisabled: true,
      navArray: [],
      showLoading: false,
    }
  }

  //This method is called each time a new run is selected.  The old navObj is passed to the navArray in order to be displayed in the sidebar
  handleNavArray = (navObj) => {
    let newArray = this.state.navArray;
    newArray.push(navObj);
    this.setState({navArray: newArray})
  }

  //Sets the App for a new game. The potentialId is an optional parameter used if a given run is to be rewatched
  handleNewGame = (...potentialId) => {
    //Clear App State
    this.setState({
      currentGameInfo: null,
      currentGameRun: null,
      hasRun: false,
      hasInfo: false,
      gameId: null,
      showLoading: true,
    })
    //Assign gameId to a random game's id, from the data pulled from the API
    let gameId = this.state.gameList[Math.floor(Math.random() * this.state.gameList.length)].id;

    //If potentialId was passed to the function, assign our gameId to that param
    console.log(potentialId)
    if (typeof potentialId[0] === 'string') {
      gameId = potentialId[0];
    }

    //Fetch the data of the randomly selected game
    fetchGameInfo(gameId)
      .then(data => {
        this.setState({
          currentGameInfo: data,
          hasInfo: true,
          gameId: gameId,
        })
      })

    //Fetch the data for the actual speedrun information of the selected game
    fetchGameRun(gameId)
      .then(data => {
        this.setState({currentGameRun: data})

        //Parameter check to see if all the neccessary information about the run exists.  If it does not, the function re-calls iteself to select another game
        if (data.length > 0 && data[0].runs.length > 0 && data[0].runs[0].run.videos && data[0].runs[0].run.videos.links) {
          this.setState({
            mainSeen: true,
            hasRun: true,
          })
        } else {
          this.handleNewGame();
        }
      })
  }

  componentDidMount = () => {
    //Here we define our listFetcher helper function, using a fetchGameList helper from the Utils folder.
    //This will populate our gameList state with all the potential games to choose from.
    const listFetcher = (url) => {
      fetchGameList(url)
      .then(data => {
        this.setState(prevState => (
          {
            gameList: prevState.gameList.concat(data.data),
            buttonsDisabled: false
          }
        ));
        //pagination to continue fetching
        data.pagination.links.forEach(obj => {
          if (obj.rel === 'next') {
            listFetcher(obj.uri);
          }
        })
      })
    }

    //Actual call to the API
    listFetcher('http://www.speedrun.com/api/v1/games?_bulk=yes&max=1000')
  }

  render() {
    return (
      <div className='home-container'>
        <Nav
          handleNewGame={this.handleNewGame}
          buttonsDisabled={this.state.buttonsDisabled}
          navArray={this.state.navArray}
        />

        {/*On first page load, we display our intro content*/}
                {!this.state.mainSeen &&
          <IntroContent
            handleNewGame={this.handleNewGame}
            buttonsDisabled={this.state.buttonsDisabled}
          />
        }

        {/*If the introContent has been bypassed, render a loading component if current data is still being fetched*/}
        {this.state.mainSeen && !(this.state.hasRun && this.state.hasInfo) &&
          <div className='loading'>
            <ReactLoading type='spinningBubbles' color='#5ab9ea' height='200px' width='200px'/>
          </div>
        }

        {/*If everything has loaded, we display the video content*/}
        {this.state.mainSeen && this.state.hasRun && this.state.hasInfo &&
          <VideoContent
            handleNavArray={this.handleNavArray}
            url={this.state.currentGameRun[0].runs[0].run.videos.links[0].uri}
            gameInfo={this.state.currentGameInfo}
            runInfo={this.state.currentGameRun}
            gameId={this.state.gameId}
          />
        }
      </div>
    )
  }
}

export default App;
