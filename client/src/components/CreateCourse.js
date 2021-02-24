import React, { useState, useEffect} from 'react';

import { Link, useHistory} from 'react-router-dom';
import axios from 'axios';

export default function CreateCourse(props) {

    let history = useHistory();
    
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ estimatedTime, setEstimatedTime ] = useState(null);
    const [ materialsNeeded, setMaterialsNeeded ] = useState(null);
    const [ validationTitle, setValidationTitle] = useState([]);  
    const [ errors, setErrors] = useState([]);
    ;

    const handleCreateCourse = async (event) => {
        
      event.preventDefault();

      
      await axios.post(`/api/courses`, {
           
            User: JSON.stringify({ 
              id: props.authenticatedUser.id, 
              firstName: props.authenticatedUser.firstName,
              lastName: props.authenticatedUser.lastName, 
              emailAddress: props.authenticatedUser.emailAddress
            }),
            
            title: title,
            description: description,
            userId: props.authenticatedUser.id, 
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded,
            
            
              

      }, {
          headers: {
          Authorization: `Basic ${props.credentials}`
      }}
      ).then((response) => {
          if (response.status === 201) {
              console.log('added course to database')
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
    
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
        <div>
            <h2 className="validation--errors--label">{validationTitle}</h2>
            
                { errors !== [] && 
                  <div className="validation-errors">
                    <ul>{errors.map(error => { return <li key={error}>{error}</li> })}
                    </ul>
                  </div>
                }
            
        </div>
        <form> 
          <div className="grid-66">
            <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input 
                    id="title"
                    name="title" 
                    type="text"
                    className="input-title course-title--input"
                    onChange={event => setTitle(event.target.value)} 
                    placeholder="Course Title..." />
                  <p>By {props.authenticatedUser ? props.authenticatedUser.firstName + " " + props.authenticatedUser.lastName : ""}
                  </p>
                </div>
              </div>
             
            <div className="course--description">
              <div>
                <textarea 
                  source={description}
                  id="description"
                  // className=""
                  name="description" 
                  type="textarea"
                  
                  rows="10"
                  onChange={event => setDescription(event.target.value)} 
                  placeholder="Course Description..." />
              </div>
            </div>
            </div> 
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                      <div>
                        <input 
                          id="estimatedTime"
                          className="course--time--input"
                          name="estimatedTime" 
                          type="text" 
                          onChange={ event => setEstimatedTime(event.target.value) } placeholder="Hours"/>
                      </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                      <div>
                        <textarea 
                          id="materialsNeeded" 
                          // className=""
                          name="materialsNeeded" 
                          source={materialsNeeded} 
                          onChange={ event => setMaterialsNeeded(event.target.value) }
                          placeholder="List materials..."
                          />
                      </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button 
                className="button" 
                onClick={event => handleCreateCourse(event)} 
                type="submit">Add Course
              </button>
              <button 
                className="button button-secondary" 
                onClick={cancel} 
                type="submit">Cancel
              </button>
            </div>           
        </form>
      </div> 
    </div>
  );
}
