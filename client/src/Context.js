import React, { Component } from 'react';
import Data from './Data';

import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser')
  };

  constructor() {
    super();

    this.data = new Data();
  }

  render() {

    const { authenticatedUser }  = this.state;

    // effectively stores the Data instance here in value. Along with provider methods -- To be later on passed as props for the consumer components
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn:this.signIn,
        signOut: this.signOut

      }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if(user !== null){
      this.setState(()  => {
        return { authenticatedUser: user }
      }) 
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1});
    }
    return user;
  }

  signOut = () => {
    this.setState( () => { 
      return { authenticatedUser: null,
      };
    });
  Cookies.remove('authenticatedUser');
  }
  
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

