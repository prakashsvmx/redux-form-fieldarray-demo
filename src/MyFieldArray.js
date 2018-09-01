import React from "react";
import { connect } from "react-redux";
import { Field, formValueSelector } from "redux-form";

export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);
const renderMember = ({ member, index, hasEmailValue, favoriteColorValue }) => {
  return (
    <li key={index}>
      <button
        type="button"
        title="Remove Member"
        onClick={() => fields.remove(index)}
      />
      <h4>Member #{index + 1}</h4>
      <Field
        name={`${member}.firstName`}
        type="text"
        component={renderField}
        label="First Name"
      />
      <div>
        <label htmlFor="hasEmail">Has Email?</label>
        <div>
          <Field
            name={`${member}.hasEmail`}
            id="hasEmail"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div>{hasEmailValue}</div>
      {hasEmailValue && (
        <div>
          <label>Email</label>
          <div>
            <Field
              name={`${member}.email`}
              component="input"
              type="email"
              placeholder="Email"
            />
          </div>
        </div>
      )}
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name={`${member}.favoriteColor`} component="select">
            <option />
            <option value="#ff0000">Red</option>
            <option value="#00ff00">Green</option>
            <option value="#0000ff">Blue</option>
          </Field>
        </div>
      </div>
      {favoriteColorValue && (
        <div
          style={{
            height: 80,
            width: 200,
            margin: "10px auto",
            backgroundColor: favoriteColorValue
          }}
        />
      )}
    </li>
  );
};

const selector = formValueSelector("selectingFormValues");
export const ConnectedMember = connect((state, props) => {
  const hasEmailValue = selector(state, `${props.member}.hasEmail`);
  const favoriteColor = selector(state, `${props.member}.favoriteColor`);
  debugger;
  return {
    hasEmailValue: hasEmailValue,
    favoriteColorValue: favoriteColor
  };
})(renderMember);

export const renderMembers = ({
  fields,
  hasEmailValue,
  favoriteColorValue,
  meta: { error, submitFailed }
}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Member
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <ConnectedMember index={index} member={member} />
    ))}
  </ul>
);
