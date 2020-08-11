import { useState, useEffect } from "react";
import { getPatient } from "../../src/apis";

const SearchPatient = (defaultSearchPatient) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    search(defaultSearchPatient);
  }, [defaultSearchPatient]);

  const search = (patientId) => {
    getPatient(patientId).then((data) => {
      setPatient(data[0]);
    });
  };

  return [patient, search];
};

export default SearchPatient;
