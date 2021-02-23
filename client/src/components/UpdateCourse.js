import React, { useState, useEffect} from 'react';

import { Link, useHistory, useParams} from 'react-router-dom';
import axios from 'axios';

export default function UpdateCourse(props) {


    const {id} = useParams();

    let history = useHistory();
  
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ estimatedTime, setEstimatedTime ] = useState(null);
    const [ materialsNeeded, setMaterialsNeeded ] = useState(null);
    const [ validationTitle, setValidationTitle] = useState([]);  
    const [ errors, setErrors] = useState([]);
 
    useEffect(()=>{
        async function fetchData(){
        await axios.get(`/api/courses/${id}`)
        .then((res)=>{
            
            if(res.status === 200 && res.data.courses === null){
                history.push('/notfound')
            } else if (props.authenticatedUser === null && props.authenticatedUser.id !== res.data.courses.User.id){
                history.push('/forbidden');
            }
            // props.authenticatedUser && props.authenticatedUser.id === course.User.id
            setTitle(res.data.courses.title);
            setDescription(res.data.courses.description);
            setEstimatedTime(res.data.courses.estimatedTime);
            setMaterialsNeeded(res.data.courses.materialsNeeded);
        })
        .catch((error) =>{
            // if(error.request && error.request.status === 400){
            //     setErrors(JSON.parse(error.request.response).errors);
            // } 
            // else {
            //   history.push('/error')
            // }
            alert('here');
            history.push('/error')
          })
        }
        fetchData();
    }, [history, id, props.authenticatedUser])



    const handleUpdateCourse = async (event) => {
        
      event.preventDefault();

    
      await axios.put(`/api/courses/${id}`, {
            
            title: title,
            description: description,
            userId: props.authenticatedUser.id, 
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded
      }, {
          headers: {
          Authorization: `Basic ${props.credentials}`
      }}
      ).then((response) => {
          if (response.status === 204) {
              console.log('added course to database')
              history.push(`/courses/${id}`);
          } else if (response.status === 403) {
            history.push('/forbidden');
          }
      })
      .catch((error) => {
          if (error.request.status === 400) {
              setErrors(JSON.parse(error.request.response).errors)
          }  else {
            console.log('here-io')
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
      <div>
          <div className="bounds course--detail">
              <h1>Update Course</h1>
              <div>
              <div>
                  <h2 className="validation--errors--label">{validationTitle}</h2>
                  <div>
                      { errors !== [] && <h2 className="validation--errors--label">Validation errors</h2> &&
                          <div className="validation-errors">
                            <ul>  { 
                              errors.map( error => { 
                                return <li key={error}><p>{error}</p></li> })
                            }
                            </ul>
                          </div>
                      }
                  </div>
              </div>
              <form>
                  <div className="grid-66">
                  <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div>
                        <input id="title" 
                              name="title" 
                              type="text" 
                              className="input-title course--title--input" 
                              onChange={ e => setTitle(e.target.value) } 
                              value={title}/>
                      </div>
                        <p>By {
                          props.authenticatedUser ? `${props.authenticatedUser.firstName} ${props.authenticatedUser.lastName}` : ''
                          }
                        </p>
                  </div>
                  <div className="course--description">
                      <div>
                        <textarea id="description" 
                                name="description" 
                                className="" 
                                onChange={ e => setDescription(e.target.value) } 
                                value={description}>
                        </textarea>
                      </div>
                  </div>
                  </div>
                  <div className="grid-25 grid-right">
                  <div className="course--stats">
                      <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div>
                            <input id="estimatedTime" 
                                  name="estimatedTime" 
                                  type="text" 
                                  className="" 
                                  onChange={ e => setEstimatedTime(e.target.value) } 
                                  value={estimatedTime !== null ? estimatedTime : "Not specified."}/>
                          </div>
                      </li>
                      <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div>
                            <textarea id="materialsNeeded" 
                                      name="materialsNeeded" 
                                      className="" 
                                      onChange={ e => setMaterialsNeeded(e.target.value) } 
                                      value={materialsNeeded !== null ? materialsNeeded : "None."}>
                            </textarea>
                          </div>
                      </li>
                      </ul>
                  </div>
                  </div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" 
                            onClick={e => handleUpdateCourse(e)} 
                            type="submit">Update Course
                    </button>
                    <Link to={`/courses/${id}`} onClick={cancel} className="button button-secondary">Cancel</Link>
                  </div>
              </form>
              </div>
          </div>
      </div>
  );
}