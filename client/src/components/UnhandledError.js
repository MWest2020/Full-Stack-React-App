import React from 'react';
import { Link } from 'react-router-dom';

// export default function UnhandledError() {
//     return (
//         <div>
//             <h1>errors for the time being</h1>
//         </div>
//     )
// }


export default function UnhandledError (props) {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
  } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <UnhandledError errors={errors} />
      <form onSubmit={handleSubmit}>
        
        <div className="pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
          <button><Link to="/"></Link></button>
        </div>
      </form>
    </div>
  );
}

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
