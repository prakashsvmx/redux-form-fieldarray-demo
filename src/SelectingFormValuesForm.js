import React from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, formValueSelector } from "redux-form";

import { renderMembers, renderField } from "./MyFieldArray";
let SelectingFormValuesForm = props => {
  const { fullName, handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="members" component={renderMembers} />
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit {fullName}
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

// The order of the decoration does not matter.

// Decorate with redux-form
SelectingFormValuesForm = reduxForm({
  form: "selectingFormValues", // a unique identifier for this form
  initialValues: {
    members: Array.from(Array(10).keys()).map(() => ({
      favoriteColor: "#ff0000"
    }))
  }
})(SelectingFormValuesForm);

// Decorate with connect to read form values
const selector = formValueSelector("selectingFormValues"); // <-- same as form name
SelectingFormValuesForm = connect(state => {
  // can select values individually
  // or together as a group
  const { firstName, lastName } = selector(state, "firstName", "lastName");
  return {
    fullName: `${firstName || ""} ${lastName || ""}`
  };
})(SelectingFormValuesForm);

export default SelectingFormValuesForm;
