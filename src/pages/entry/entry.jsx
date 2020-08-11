import React, { useState } from "react";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import Dropdown from "../../components/dropdown/Dropdown";
//import Checkbox from "../../components/checkbox/checkbox";
import { Checkbox } from "@thumbtack/thumbprint-react";
import { createPatient } from "../../apis";

import { EntryDiv } from "./entry.styles";

const options = [
  {
    label: "Severe",
    value: "Severe",
  },
  {
    label: "Moderate",
    value: "Moderate",
  },
  {
    label: "Normal",
    value: "Normal",
  },
];

const Entry = () => {
  const [selected, setSelected] = useState(options[0]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [values, setValues] = useState({
    patientCode: "",
    patientName: "",
    bedNo: "",
    address:"",
    hospital : JSON.parse(localStorage.getItem('name') || null)
  });
  const [error, setError] = useState(false);
  const { patientCode, patientName, bedNo, hospital, address } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //console.log(values, selected.value, isChecked);
    const name = { patientCode, patientName, bedNo,hospital, address };
    const currentStatus = selected.value;
    const ventilator = isChecked === false ? "No" : "Yes";
    const patient = { ...name, currentStatus, ventilator };
    //const { user, token } = isAuthenticated();
    console.log(patient);
    createPatient(patient).then((data) => {
      if (data.err) {
        setError(true);
        setSuccess(false);
      } else {
        setError(false);
        setSuccess(true);
      }
    });
  };

  const errorMessage = () => {
    return (
      <div className="column" style={{ display: error ? "" : "none" }}>
        <div className="ui segment">
          <div
            className="ui red message"
            style={{ display: error ? "" : "none" }}
          >
             <h4>There was a problem,patient not created</h4>
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => (
    <div className="ui segment" style={{ display: success ? "" : "none" }}>
      <h4>Patient created successfully</h4>
    </div>
  );

  return (
    <EntryDiv>
      <form className="entry-form">
        <FormInput
          type="text"
          name="patientCode"
          value={patientCode}
          onChange={handleChange("patientCode")}
          label="Patient ID"
          required
        />
        <FormInput
          type="text"
          name="patientName"
          value={patientName}
          onChange={handleChange("patientName")}
          label="Patient Name"
          required
        />
        <FormInput
          type="text"
          name="address"
          value={address}
          onChange={handleChange("address")}
          label="address"
          required
        />
        <FormInput
          type="text"
          name="hospital"
          value={hospital}
          onChange={handleChange("hospital")}
          label="hospital"
          required
        />
        <Dropdown
          label="Current Status"
          name="currentStatus"
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
        <FormInput
          type="text"
          name="bedNo"
          value={bedNo}
          onChange={handleChange("bedNo")}
          label="Bed #"
          required
        />
        {/*<Checkbox
          name="ventilator"
          label="Ventilator"
          checked={isSelected}
          onChange={onCheckboxChange}
          required
        />*/}
        <Checkbox
          name="ventilator"
          isChecked={isChecked}
          onChange={setIsChecked}
        >
          Ventilator
        </Checkbox>
        <CustomButton onClick={onSubmit} type="submit">
          Submit
        </CustomButton>
      </form>
      {successMessage()}
      {errorMessage()}
    </EntryDiv>
  );
};

export default Entry;
