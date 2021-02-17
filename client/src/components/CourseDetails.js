import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import axios from 'axios';

//https://reactrouter.com/web/guides/quick-start
//

export default function CourseDetails(props) {

    let history = useHistory();
    // url id =  id
    let { id } = useParams();

    const [course, setCourse] = useState({    
        title: '', 
        User: {}, 
        description: null, 
        estimatedTime: null, 
        materialsNeeded: null
     });
    
    //fetch users
    //done with props
    //fetch course

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
             history.push('/error');
         });
         history.push('/');
     }


    //https://www.robinwieruch.de/react-fetching-data
    useEffect(()=>{
        async function fetchData(){
        await axios.get(`/api/courses/${id}`)
        .then((res)=>{
            //
            if(res.status === 200 && res.data.courses !== null){
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





    return (
        <>
            <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100">
                //https://reactjs.org/docs/conditional-rendering.html shorthand for if both props are === courses.user.id AND true
                    {
                        props.authenticatedUser && props.authenticatedUser.id === course.User.id &&
                        <span>
                        <Link to={`/courses/${id}update`} className="button" >Update Course</Link>
                        <button onClick={deleteCourse} className="button">Delete Course</button>
                        </span>
                    
                    }
                <Link to="/courses" className="button button-secondary" >Return to List</Link>
                </div>
            </div>
            </div>
            <div className="bounds course--detail">
            <div className="grid-66">
                <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="courses--title">{course.title}</h3>
                <p>By {`${course.User.firstName} ${course.User.lastName}`}</p>
                </div>
                <div className="course--description">
                <p>{course.description}</p>
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
                    <ul>
                        {course.materialsNeeded}
                    </ul>
                    </li>s
                </ul>
                </div>
            </div>
            </div>
        </>
    )
}
