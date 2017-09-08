import React from 'react';
import RunInfo from './RunInfo'

//This component defines our Navbar on the right hand side of the page, consisting of a headline, a button to find more runs,
//and the navArray to show previous run information
const Nav = (props) => {
  return (
    <div className='nav'>
      <div className='nav-top'>
        <div className='nav-title'>
          anypercent.com
        </div>
        <div className='button-container'>
          <button onClick={props.handleNewGame} disabled={props.buttonsDisabled} className='button'>
            Find a Run
          </button>
        </div>
      </div>
      <div className='previous-runs'>

        {/*Below, we want to navArray to display the newest runs first, so we reverse the order then map over it to pass each object to our RunInfo component*/}
        {props.navArray.slice().reverse().map(obj => {
          return (
            <RunInfo handleNewGame={props.handleNewGame}>
              {obj}
            </RunInfo>
          )
        })

        }

      </div>
    </div>
  )
}


export default Nav;
