// import React, { useState, useEffect} from 'react';

// import { Link, useHistory} from 'react-router-dom';
// import axios from 'axios';

// export default function DeleteCourse(props) {

//     let history = useHistory();
  
  
//     const [ title, setTitle ] = useState(null);
//     const [ description, setDescription ] = useState(null);
//     const [ estimatedTime, setEstimatedTime ] = useState(null);
//     const [ materialsNeeded, setMaterialsNeeded ] = useState(null);
//     const [ validationTitle, setValidationTitle] = useState([]);  
//     const [ errors, setErrors] = useState([]);
 

//     const handleDeleteCourse = async (event) => {
        
//       event.preventDefault();

    
//       await axios.delete(`/api/courses/:id`, {
            
//             title: title,
//             description: description,
//             userId: props.authenticatedUser.id, 
//             estimatedTime: estimatedTime,
//             materialsNeeded: materialsNeeded
//       }, {headers: {
//           Authorization: `Basic ${props.credentials}`
//       }}
//       ).then((response) => {
//           if (response.status === 201) {
//               console.log('added deleted from database')
//               history.push('/');
//           }
//       })
//       .catch((error) => {
//           if (error.request.status === 400) {
//               setErrors(JSON.parse(error.request.response).errors)
//           } else {
//               history.push('/error');
//           }
//       })
//     } 
    
  
//     const cancel = () => {
//     history.push('/');
//     }

  
//   // The Validation Errors text only gets set if error(s) exist,
//     // and this updates every time the errors object changes.
//     useEffect(() => {
//       if (errors.length > 0) {
//           setValidationTitle("Validation errors");
//       }
//     },[errors]);

   
//   return (
//     <div className="bounds">
//       <div className="grid-33 centered signin">
        
//         <h1>Delete Course</h1>
//         <>
//         <form> 
          
//             <>
            
//               <input 
//                 id="title"
//                 name="title" 
//                 type="text"
//                 onChange={event => setTitle(event.target.value)} 
//                 placeholder="Title" />
//               <input 
//                 id="description"
//                 name="description" 
//                 type="textarea"
//                 onChange={event => setDescription(event.target.value)} 
//                 placeholder="Description" />
//               <textarea 
//                 id="estimatedTime"
//                 name="estimatedTime" 
//                 source={estimatedTime}
//                 onChange={event => setEstimatedTime(event.target.value) } 
//                 placeholder="Estimated Time" />
//               <textarea
//                 id="materials-needed" 
//                 name="materials-needed"
//                 source={materialsNeeded}
//                 onChange={event =>{ setMaterialsNeeded(event.target.value) }} 
//                 placeholder="Materials Needed" />   
//               <div className="grid-100 pad-bottom">
//               <button 
//                 className="button" 
//                 onClick={event => handleCreateCourse(event)} 
//                 type="submit">Add Course
//               </button>
//               <button 
//                 className="button button-secondary" 
//                 onClick={cancel} 
//                 type="submit">Cancel
//               </button>
//               </div>           
//             </>
          
//           </form>
//         </>
        
//         <p>
//           Do you have a user account? <Link to="/signin">Click here</Link> to sign in!
//         </p>
//       </div>
//     </div>
//   );
// }
