import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      name,
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <>
                <input 
                  id="name" 
                  name="name" 
                  type="text"
                  value={name} 
                  onChange={this.change} 
                  placeholder="Name" />
                <input 
                  id="username" 
                  name="username" 
                  type="text"
                  value={username} 
                  onChange={this.change} 
                  placeholder="User Name" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    
    const { 
      context
     } = this.props;

    const {
      name, 
      username,
      password,
      } = this.state;

    const user = {
      name, 
      username,
      password
    };

    // why not const {
    // user, username, password
    // } = this.state, user;  
    
    //context hold data object which holds createUser method (which is returning an array, with or without errors)
    context.data
    .createUser(user)
    .then( errors => {
      if (errors.length) {
        this.setState( { errors } );
      } else {
        context.actions.signIn(username, password)
        .then( () =>{
          this.props.history.push('/authenticated');
        })
      }
    })
    .catch(
      err => {
        console.log(err);
        this.props.hostory.push('/error');
      })
  }

  cancel = () => {
      //simply pushes root route and thus returning
      this.props.history.push('/');
  }
}
