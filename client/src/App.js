import React, {
  useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';


//import component correctly
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import PrivateRoute from './PrivateRoute';
import './styles/global.css';





export default function App() {





  <Router>
    <div>
      <Header/>

      <Switch>
        <Route exact path="/" render={{Courses} }/>
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <PrivateRoute path="/settings" component={AuthWithContext}/>
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
}
