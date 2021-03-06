import React, { useState, useEffect } from "react";
import { Checkbox } from "@thumbtack/thumbprint-react";

import CustomButton from "../../components/custom-button/custom-button.component";
import Search from "../search/search";
import SearchPatient from "../../hooks/searchPatient";
import { ExitDiv } from "./exit.styles";
import { dischargePatient } from "../../apis";

const Exit = () => {
  const [isChecked, setIsChecked] = React.useState(undefined);
  const [success, setSuccess] = React.useState(false);
  const [result, setResult] = useState({
    patient_id: "",
    patientId: "",
    patientName: "",
    bedNo: "",
    currentStatus: "",
  });
  const { patientId, patientName, bedNo, currentStatus } = result;
  const [patient, search] = SearchPatient("1055");
  useEffect(
    (result) => {
      if (patient) {
        setResult({
          ...result,
          patientId: patient.patientCode,
          patientName: patient.patientName,
          currentStatus: patient.status,
          bedNo: patient.bedNo,
        });
      }
    },
    [patient]
  );
  const [error, setError] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    //console.log(patient, selected.value, isChecked);
    //const name = { patientName, bedNo };
    //const currentStatus = selected.value;
    const discharged = isChecked === undefined ? "false" : isChecked;
    const updatedPatient = { patientId, discharged };
    //const { user, token } = isAuthenticated();
    console.log(updatedPatient);
    dischargePatient(updatedPatient).then(
      (data) => {
        if (data.err) {
          setSuccess(false);
          setError(true);
        } else {
          setError(false);
          setSuccess(true);
        }
      }
    );
  };

  const errorMessage = () => {
    return (
      <div className="column" style={{ display: error ? "" : "none" }}>
        <div className="ui segment">
          <div
            className="ui red message"
            style={{ display: error ? "" : "none" }}
          >
            <h4>Patient status not updated</h4>
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => (
    <div className="ui segment" style={{ display: success ? "" : "none" }}>
      <h4>Patient discharged successfully</h4>
    </div>
  );

  return (
    <ExitDiv>
      <Search onFormSubmit={search} />
      {/*<Checkbox
          type="text"
          label="Discharge formality"
          isSelected=""
          onCheckboxChange=""
          required
        />*/}
      <br></br>
      Patient Name: {patientName}
      <br></br>
      Current Status : {currentStatus}
      <br></br>
      Bed No : {bedNo}
      <br></br>
      <form className="entry-form">
        <Checkbox
          name="Discharge Formality"
          isChecked={isChecked}
          onChange={setIsChecked}
        >
          Discharge Formality
        </Checkbox>
        <CustomButton onClick={onSubmit} type="submit">
          Submit
        </CustomButton>
      </form>
      {successMessage()}
      {errorMessage()}
    </ExitDiv>
  );
};

export default Exit;
