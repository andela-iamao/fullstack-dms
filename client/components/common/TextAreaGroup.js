import React from 'react';
import classnames from 'classnames';

const TextAreaGroup =
({ field, value, label, error, type, onChange }) => (
  <div className={classnames('input-field', { 'has-error': error })}>
    <label >{label}</label>
    <textarea
      onChange={onChange}
      value={value}
      type={type}
      name={field}
      className="input-field"
    />
    {error && <span className="help-block">{error}</span>}
  </div>
);

TextAreaGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

TextAreaGroup.defaultProps = {
  type: 'text'
};

export default TextAreaGroup;
