import { API } from "../backend";
//import axios from "axios";

//User and Auth
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/login`, {
    method: "POST",
     headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
  
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// export const signin = async (email, password) => {
//   return await axios({
//     method: "POST",
//     url: `${API}/signin`,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: { email: email, password: password },
//   });
// };

// export const authenticate = (data, next) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem("jwt", JSON.stringify(data));
//     next();
//     //return data;
//   }
// };

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = (user) => {
  // if (typeof window == "undefined") {
  //   return false;
  // }
  // if (localStorage.getItem("jwt")) {
  //   return JSON.parse(localStorage.getItem("jwt"));
  // } else {
  //   return false;
  // }
  return fetch(`${API}/login`, {
    method: "POST",
     headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
  
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      //return response.json();
      if(response[0].hospitalName){
        return true;
      }else {
        return false;
      }
    })
    .catch((err) => console.log(err));
};

//patient

export const createPatient = (patient) => {
  console.log("Patient is ", patient);
  return fetch(`${API}/entry`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(patient),
    //body: patient,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPatient = (patientId) => {
  return fetch(`${API}/details?patientCode=${patientId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updatePatient = (patient) => {
  console.log("Patient is ", patient);
  //return fetch(`${API}/patient/${patientId}/status/${userId}`, {
  return fetch(`${API}/updateStatus`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
    //body: patient,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const dischargePatient = (patient) => {
  console.log("Patient is ", patient);
  return fetch(`${API}/discharge?patientCode=${patient.patientId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(patient),
    //body: patient,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPatientCountBySeverity = (hospitalName,hospitalCode) => {
  return fetch(`${API}/dashboard/beds?hospitalName=${hospitalName}&hospitalCode=${hospitalCode}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getPatientCountByVentilator = () => {
  return fetch(`${API}/ptcountventilator`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
