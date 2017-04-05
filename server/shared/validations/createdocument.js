import isEmpty from 'lodash/isEmpty';

// Client side validation
function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Title';
  }
  if (!values.content || values.content.trim() === '') {
    errors.content = 'Enter some content';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
