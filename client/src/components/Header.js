import React from 'react';
import { Link, useHistory } from 'react-router-dom';

//Returns simple nav bar based on whether user is signed in or not.




export default function Header(props) {

  let history = useHistory();

  function landing() {
    history.push('/')
  }


  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo" onClick={landing} >Courses</h1>
        <nav>
          {props.authenticatedUser ? (
            <>
              <span>Welcome, {props.authenticatedUser.firstName}!</span>
              <Link to="/signout">Sign Out</Link>
            </>
          ) : (
            <>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}



