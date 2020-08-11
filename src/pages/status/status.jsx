import React, { useState, useEffect } from "react";
import { Checkbox } from "@thumbtack/thumbprint-react";

import FormInput from "../../components/form-input/form-input.component";
import Search from "../search/search";
import CustomButton from "../../components/custom-button/custom-button.component";
import Dropdown from "../../components/dropdown/Dropdown";
import SearchPatient from "../../hooks/searchPatient";
//import Checkbox from "../../components/checkbox/checkbox";
import { updatePatient} from "../../apis";

import { StatusDiv } from "./status.styles";

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

const PatientStatus = () => {
  const [selected, setSelected] = useState(options[0]);
  const [isChecked, setIsChecked] = React.useState(undefined);
  const [success, setSuccess] = React.useState(false);
  const [result, setResult] = useState({
    patient_id: "",
    patientId: "",
    patientName: "",
    bedNo: "",
    ventilator: "",
    currentStatus: "",
  });
  const { patientId, patientName, bedNo, currentStatus, ventilator } = result;
  const [patient, search] = SearchPatient("Pt7");
  useEffect(
    (result) => {
      if (patient) {
        setResult({
          ...result,
          patientId: patient.patientCode,
          patientName: patient.patientName,
          currentStatus: patient.status,
          ventilator: patient.ventilator,
          bedNo: patient.bedNo,
        });
        setSelected({ label: currentStatus, value: currentStatus });
        setIsChecked(ventilator ==="Yes"?true:false);
      }
    },
    [patient, currentStatus, ventilator]
  );

  //setSelected({ label: currentStatus, value: currentStatus });
  //setIsChecked(ventilator);

  const [error, setError] = useState(false);

  const handleChange = (name) => (event) => {
    setResult({
      ...patient,
      [name]: event.target.value,
      currentStatus: selected.value,
      ventilator: isChecked===true?"Yes":"No",
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //console.log(patient, selected.value, isChecked);
    const name = { patientCode:patientId, patientName, bedNo };
    const currentStatus = selected.value;
    const ventilator = isChecked === false ? "No" : "Yes";
    const updatedPatient = { ...name, currentStatus, ventilator };
    //const { user, token } = isAuthenticated();
    console.log(updatedPatient);
    updatePatient(updatedPatient).then((data) => {
      if (data.err) {
        setError(true);
        setSuccess(false)
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
            <h4>Patient update was not successful</h4>
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => (
    <div className="ui segment" style={{ display: success ? "" : "none" }}>
      <h4>Patient updated successfully</h4>
    </div>
  );

  return (
    <StatusDiv>
      <Search onFormSubmit={search} />
      <form className="status-form">
        <FormInput
          type="text"
          name="patientName"
          value={patientName}
          onChange={handleChange("patientName")}
          label="Patient Name"
          required
        />
        <Dropdown
          label="Current Status"
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
          type="text"
          label="Ventilator"
          isSelected=""
          onCheckboxChange=""
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
    </StatusDiv>
  );
};

export default PatientStatus;
