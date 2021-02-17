//import React and Hooks
import React, {
  useState} from 'react';
//import Routing support for React
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';


//import components 
//
import Header from './components/Header';

//Courses routes
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import DeleteCourse from './components/DeleteCourse';

//User routes
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';

//error routes
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

import PrivateRoute from './PrivateRoute';
import './styles/global.css';
import axios from 'axios';
import Cookies from 'js-cookie';


function App() {

  //access history object for routing 
  let history = useHistory();


  //initial state is either cookies or null
  const [
    authenticatedUser, 
    setAuthenticatedUser] = useState(Cookies.getJSON('authenticatedUser') || null); 
  const [
    credentials, 
    setCredentials] = useState(Cookies.getJSON('credentials') || null);

    //handleSignIn
  const handleSignIn = async(username, password)=>{
    //fetch user for authentication and selection of courses
      let user;
    //call out to route with credentials in header
    await axios.get('/api/users', {
      headers: {
        'Authorization': `Basic ${btoa(
          `${username}:${password}`
          )}`
      }
    })//await response
    .then((res)=>{
      if(res.status === 200){
        //if ok, res.data is stored in user
        user = res.data;
        //updating credentials state
        setCredentials(btoa(`${username}:${password}`));
        //updating Cookies
        Cookies.set('credentials', JSON.stringify(btoa(`${username}:${password}`)), {expires: 1/12});  
        //updating Authenticated user state
        setAuthenticatedUser(user);
        //Cookie update (expires after 2 hours)
        Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1/12})
       } else {
         user = null;
       }
    }).catch((err)=>{
      if(err.res.status === 401){
        user = null;
      } else {
        history.push('/error');
      }
    })
    return user;
  }




  

    //handleSignOut
    const handleSignOut = () => {
      Cookies.remove('authenticatedUser');
      Cookies.remove('credentials');
      setAuthenticatedUser(null);
      setCredentials(null);
    }

  return (
    <Router>
      <div>
        <Header authenticatedUser={authenticatedUser}/>

        <Switch>
          <Route exact path="/" render={() => (<Courses authenticatedUser={authenticatedUser}/>)}/>

          //Private routes


          <Route exact path="/courses/:id" render={() => (<CourseDetails credentials={credentials} authenticatedUser={authenticatedUser}/>)}/>

          <Route path="/signin" render={() => (<UserSignIn handleSignIn={handleSignIn}/>)}/>
          <Route path="/signup" render={() => (<UserSignUp handleSignIn={handleSignIn}/>)}/>
          <Route path="/signout" render={() => (<UserSignOut handleSignOut={handleSignOut}/>)}/>
          <Route path="/error" component={UnhandledError}/>
          <Route path="/forbidden" component={Forbidden}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;