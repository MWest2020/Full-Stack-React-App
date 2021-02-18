import React, { useEffect} from 'react';
import { useHistory } from 'react-router-dom';


export default function UserSignOut(props) {
  
  let history = useHistory();

  useEffect(() => {
    
    props.handleSignOut();
    history.push('/')
  })

  return (
    <></>
  )
}
