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
            // //
            if(res.status === 200 && res.data.courses === null){
                history.push('/notfound')
            } else if (!props.authenticatedUser || !props.authenticatedUser.id){
                history.push('/forbidden');
            }
            
            setTitle(res.data.course.title);
            setDescription(res.data.course.description);
            setEstimatedTime(res.data.course.estimatedTime);
            setMaterialsNeeded(res.data.course.materialsNeeded);
        })
        .catch((error) =>{
            if(error.request && error.request.status === 400){
                setErrors(JSON.parse(error.request.response).errors);
            } 
            });
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
          } else if (response.status === 204) {
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
    <div className="bounds">
      <div className="grid-33 centered signin">
        
        <h2 className="validation--errors--label">{validationTitle}</h2>
        { 
          errors !== [] &&
          <div className="validation-errors">
            <ul>{errors.map(error => { return <li key={error}><p>{error}</p></li> })}</ul>
          </div>
        }
        
        
        <h1>Update Course</h1>
        <>
        <form> 
          
            <>
            
              <input 
                id="title"
                name="title" 
                type="text"
                onChange={event => setTitle(event.target.value)} 
                placeholder={props.title} />
              <textarea 
                id="description"
                name="description" 
                type="textarea"
                onChange={event => setDescription(event.target.value)} 
                placeholder={description} />
              <input
                id="estimatedTime"
                name="estimatedTime" 
                source={estimatedTime}
                onChange={event => setEstimatedTime(event.target.value) } 
                // placeholder={!estimatedTime ? estimatedTime : 'No indication given' } 

                />
              <textarea
                id="materials-needed" 
                name="materials-needed"
                source={materialsNeeded}
                onChange={event =>{ setMaterialsNeeded(event.target.value) }} 
                // placeholder={!materialsNeeded ? materialsNeeded : '' }
                />   
              <div className="grid-100 pad-bottom">
              <button 
                className="button" 
                onClick={event => handleUpdateCourse(event)} 
                type="submit">Add Course
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
          Do you have a user account? <Link to="/signin">Click here</Link> to sign in!
        </p>
      </div>
    </div>
  );
}