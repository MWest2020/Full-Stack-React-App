import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import Markdown from 'react-markdown';

//https://reactrouter.com/web/guides/quick-start
//https://stackoverflow.com/questions/31875748/how-do-i-render-markdown-from-a-react-component

export default function CourseDetails(props) {

    let history = useHistory();
    // url id =  id
    let { id } = useParams();
    

    const [course, setCourse] = useState({    
        
        User: {
            id: '',
            firstName: '',
            lastName: '',
            emailAddress: ''
        },  
        title: '', 
        description: null, 
        estimatedTime: null, 
        materialsNeeded: null
     });

    
     
    
    //https://www.robinwieruch.de/react-fetching-data
    useEffect(()=>{
        async function fetchData(){
        await axios.get(`/api/courses/${id}`
        ,
       )
        .then((res)=>{
            //
            if(res.status === 200 && res.data.course !== null){
            
            console.log(res.data.courses);
            setCourse(res.data.courses);
            } else {
                history.push('/notfound');
            }
        })
        .catch((err) =>{
            history.push('/error');//pass error msg?
        });
        }
        fetchData();
    }, [history, id])

    const deleteCourse = async () => {
        await axios.delete(`/api/courses/${id}`,
           {headers: {
               Authorization: `Basic ${props.credentials}`
           }
       })
        .then(res =>{
            if(res.status === 403){
                history.push('/forbidden');
            }
        })
        .catch(()=>{
            console.log('here');
            history.push('/error');
        });
        history.push('/');
    }

    return (
        <>
            <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100">
               
                    
                    {
                        props.authenticatedUser && props.authenticatedUser.id === course.User.id &&
                        <>
                        <Link to={`/courses/${id}/update`} className="button" >Update Course</Link>
                        <button onClick={deleteCourse} className="button">Delete Course</button>
                    </>
                    }
                <Link to="/" className="button button-secondary" >Return to List</Link>
                </div>
            </div>
            </div>
            <div className="bounds course--detail">
            <div className="grid-66">
                <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="courses--title">{course.title}</h3>
                <p>By {course.User.firstName} {course.User.lastName}</p>
                
                </div>
                <div className="course--description">
                <Markdown>{course.description}</Markdown>
                </div>
            </div>
            <div className="grid-25 grid-right">
                <div className="course--stats">
                <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    {
                        course.estimatedTime !== null &&
                        <h3>{course.estimatedTime}</h3>
                    }
                    </li>
                    <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    
                        {
                            course.materialsNeeded !== null &&
                            <Markdown>{course.materialsNeeded}</Markdown>
                        }
                    
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </>
    )
}