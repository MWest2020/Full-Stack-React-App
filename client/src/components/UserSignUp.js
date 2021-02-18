import React, { useState, useEffect} from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';




export default function UserSignUp(props) {

  let history = useHistory();
  
  
  const [ firstName, setFirstName ] = useState(null);
  const [ lastName, setLastName ] = useState(null);
  const [ emailAddress, setEmailAddress ] = useState(null);
  const [ password, setPassword ] = useState(null);
  const [ confirmPassword, setConfirmPassword] = useState(null); 
  const [ errors, setErrors ] = useState([]);
  const [validationTitle, setValidationTitle] = useState([ null ]);


 

    const handleSignIn = (e) => {
        
      setErrors([]);

    e.preventDefault();

    if (password === confirmPassword) {
      axios.post(`/api/users`, {
              firstName: firstName,
              lastName: lastName,
              emailAddress: emailAddress,
              password: password
      }).then((response) => {
          if (response.status === 201) {
              props.handleSignIn(emailAddress, password);
              history.push('/');
          }
      })
      .catch((error) => {
          if (error.request.status === 400) {
              setErrors(JSON.parse(error.request.response).errors)
          } else {
              history.push('/error');
          }
      })
  } else {
      setErrors([ `Passwords don't match.` ]);
  }

  
  }
  const cancel = () => {
    history.push('/');
  }

  
  // The Validation Errors text only gets set if error(s) exist,
    // and this updates every time the errors object changes.
    useEffect(() => {
      if (errors.length > 0) {
          setValidationTitle("Validation errors");
      }
  },[errors]);

   
  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        
        <h2 className="validation--errors--label">{validationTitle}</h2>
        { 
          errors !== [] &&
          <div className="validation-errors">
            <ul>{errors.map(error => { return <li key={error}><p>{error}</p></li> })}</ul>
          </div>
        }
        
        
        <h1>Sign Up</h1>
        <>
        <form> 
          
            <>
            
              <input 
                id="first-name"
                name="first-name" 
                type="text"
                onChange={event => setFirstName(event.target.value)} 
                placeholder="First Name" />
              <input 
                id="last-name"
                name="last-name" 
                type="text"
                onChange={event => setLastName(event.target.value)} 
                placeholder="Last Name" />
              <input 
                id="emailAddress"
                name="emailAddress" 
                type="text"
                onChange={event => setEmailAddress(event.target.value) } 
                placeholder="Email Address" />
              <input 
                id="password" 
                name="password"
                type="password"
                onChange={event =>{ setPassword(event.target.value) }} 
                placeholder="Password" />   
              
              <input 
                id="confirm-password" 
                name="confirm-password"
                type="password"
                onChange={event =>{ setConfirmPassword(event.target.value) }} 
                placeholder="Confirm Password" />   
              <div className="grid-100 pad-bottom"></div>
              <button 
                className="button" 
                onClick={handleSignIn} 
                type="submit">Sign Up
              </button>
              <button 
                className="button button-secondary" 
                onClick={cancel} 
                type="submit">Cancel
              </button>
                           
            </>
          
          </form>
        </>
        
        <p>
          Do you have a user account? <Link to="/signin">Click here</Link> to sign in!
        </p>
      </div>
    </div>
  );
}

