import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SignupForm = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>UserName</label>
        <div>
          <Field name="username" component="input" type="text" placeholder="UserName" />
        </div>
      </div>
      <div>
        <label>First Name</label>
        <div>
          <Field name="firstName" component="input" type="text" placeholder="First Name" />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field name="lastName" component="input" type="text" placeholder="Last Name" />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field name="email" component="input" type="email" placeholder="Email" />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field name="password" component="input" type="text" placeholder="Password" />
        </div>
      </div>
      <div>
        <label>Role</label>
        <div>
          <Field name="RoleId" component="select">
            <option></option>
            <option value="1">Regular</option>
            <option value="2">Role</option>
          </Field>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'signup',  // a unique identifier for this form
})(SignupForm);
