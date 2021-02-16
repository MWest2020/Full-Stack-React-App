import userEvent from '@testing-library/user-event'
import React from 'react'
import Courses from './Courses'

export default function UpdateCourse(props) {


    
    return (
        <>
            <div className="bounds course--detail">
                <h1>Update Course</h1>
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
                            placeholder="Course title..."
                            value="Build a Basic Bookcase"/>
                </div>
                    <p>By {props.user.firstName}</p>
                </div>
            <div className="course--description">
                <div>
                    <textarea id="description" 
                            name="description" 
                            className="" 
                            placeholder="Course description...">{Courses.description}
                    </textarea>
                </div>
            </div>
            </div>
            <div className="grid-25 grid-right">
            <div className="course--stats">
                <ul className="course--stats--list">
                <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value="14 hours"/></div>
                </li>
                <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials...">* 1/2 x 3/4 inch parting strip
    * 1 x 2 common pine
    * 1 x 4 common pine
    * 1 x 10 common pine
    * 1/4 inch thick lauan plywood
    * Finishing Nails
    * Sandpaper
    * Wood Glue
    * Wood Filler
    * Minwax Oil Based Polyurethane
    </textarea></div>
                </li>
                </ul>
            </div>
            </div>
            <div className="grid-100 pad-bottom">
                <button className="button" 
                        type="submit">Update Course
                </button>
                <button className="button button-secondary" 
                onclick="event.preventDefault(); location.href='course-detail.html';">
                Cancel
                </button>
            </div>
            </form>
        
        </>
    
    )
}
