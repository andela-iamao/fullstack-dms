// asyncValidate.js

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/*, dispatch */) => {
  return sleep(1000) // simulate server latency
    .then(() => {
      if ([ 'foo@foo.com', 'bar@bar.com' ].includes(values.email)) {
        throw { email: 'Email already Exists' }
      }
    })
}

// export default asyncValidate

// MaterialUiForm.js

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
// import asyncValidate from './asyncValidate'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'email', 'favoriteColor', 'notes' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error } }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
  />
)

const renderSelectField = ({ input, label, meta: { touched, error }, children}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    />
)

const MaterialUiForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="username" component={renderTextField} label="Username"/>
      </div>
      <div>
        <Field name="firstName" component={renderTextField} label="First Name"/>
      </div>
      <div>
        <Field name="lastName" component={renderTextField} label="Last Name"/>
      </div>
      <div>
        <Field name="email" component={renderTextField} label="Email"/>
      </div>
      <div>
        <Field name="password" component={renderTextField} label="Email"/>
      </div>
      <div>
        <Field name="favoriteColor" component={renderSelectField} label="Role">
          <MenuItem value="Red" primaryText="Red"/>
          <MenuItem value="Green" primaryText="Green"/>
          <MenuItem value="Blue" primaryText="Blue"/>
        </Field>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'MaterialUiForm',  // a unique identifier for this form
  validate,
  asyncValidate
})(MaterialUiForm)
