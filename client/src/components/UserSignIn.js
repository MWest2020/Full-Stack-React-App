import React, { useState} from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
export default function UserSignIn(props) {

  let history = useHistory();
  let location = useLocation();
     
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState([]);
  
  const submit = (event) => {
    event.preventDefault();
    props.handleSignIn(email, password)
    .then( user => {
      
        if(!user) {
          setErrors([ 'Sign-in not succesful' ]);
        } else {
          
          if(location.state){
            history.push(location.state.from);
          } else {
            history.push('/')
          }
        }
      
    })
    .catch(
      (err) => {
        console.log(err);
        history.push('/error');
      })
  }
  

  const cancel = () => {
    history.push('/');
  }
  
  
  
  
  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <>
        <form> 
          
            <>
            { errors !== [] && 
              <ul className="validation--errors--label">{errors.map(error => { return <li key={'error' + error.index}><p>{error}</p></li> })}</ul>
            }
              <input 
                id="email"
                name="email" 
                type="text"
                 
                onChange={event => setEmail(event.target.value)} 
                placeholder="Email Address" />
              <input 
                id="password" 
                name="password"
                type="password"
                
                onChange={event =>{ setPassword(event.target.value)}} 
                placeholder="Password" />   
              <div className="grid-100 pad-bottom">
              <button 
                className="button" 
                onClick={submit} 
                type="submit">Sign In
              </button>
              <button 
                className="button button-secondary" 
                onClick={cancel} 
                type="submit">Cancel
              </button>
              </div>               
            </>
          
          </form>
        </>
        
        <p>
          Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
        </p>
      </div>
    </div>
  );
}

