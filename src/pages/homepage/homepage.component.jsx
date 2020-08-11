import React, { useState, useEffect } from "react";

import { AuthContext } from "../../App";
import { API } from "../../backend";
import { HomePageContainer, Circle,RectBox } from "./homepage.styles";

const HomePage = () => {
  const { state: authState } = React.useContext(AuthContext);
  const [result, setResult] = useState({hospital:"", totalBeds:0, Severe:0,Moderate:0,Normal:0 });
  const [ventilator, setVentilator] = useState({totalVentilators:0,Used:0});
  //   const [severityResult, setSeverityResult] = useState({
  //     currentStatus: "",
  //     patientCount: "",
  //   });
  //const { currentStatus, patientCount } = severityResult;
  const hospitalCode = JSON.parse(localStorage.getItem('user') || null);
  const hospitalName = JSON.parse(localStorage.getItem('name') || null);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(`${API}/dashboard/beds?hospitalName=${hospitalName}&hospitalCode=${hospitalCode}`, { signal: signal, method: "GET" })
      .then((results) => results.json())
      .then((data) => {
        console.log('data is ' ,data);
        setResult({...result,hospital:data[0].hospital, totalBeds: data[0].totalBeds,Severe: data[0].Severe, Moderate: data[0].Moderate, Normal:data[0].Normal });
      });

    // fetch(`${API}/ptcount`, { signal: signal, method: "GET" })
    //   .then((results) => results.json())
    //   .then((data) => {
    //     //console.log(data);
    //     setCount(data[0].ptCount);
    //   });

    fetch(`${API}/dashboard/ventilators?hospitalName=${hospitalName}&hospitalCode=${hospitalCode}`, { signal: signal, method: "GET" })
      .then((results) => results.json())
      .then((data) => {
        //console.log(data);
        setVentilator({...ventilator,totalVentilators: data[0].totalVentilators,Used: data[0].Used});
      });

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  
  console.log('result is',result);
  const {totalBeds,Severe,Moderate,Normal} = result;
  const count = Severe+Moderate+Normal;
  const {totalVentilators,Used} = ventilator;
  // const cards = () => {
  //   return result.map((item) => (
  //     //  color = "#ff0000",
  //     //  if (item._id == "Severe") {
  //     //   color = "#ff0000";
  //     //  }

  //     <Circle
  //       key={item._id}
  //       style={{
  //         backgroundColor:
  //           item._id === "Severe"
  //             ? "#ff0000"
  //             : item._id === "Mild"
  //             ? "#FFFF00"
  //             : "#FF8C00",
  //       }}
  //     >
  //       <div
  //         style={{
  //           textAlign: "center",
  //           margin: "auto",
  //           padding: "70px 30px",
  //         }}
  //       >
  //         <h4>{item._id}</h4>
  //         <p>{item.ptCount}</p>
  //       </div>
  //     </Circle>
  //   ));
  // };

  return (
    <HomePageContainer>
    <h1 style={{position:"center"}}><strong>{hospitalName}</strong></h1>
      <h2 style={{position:"relative",left:"-330px"}}>Beds</h2>
      <RectBox>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "10px 40px",
          justifyContent: "space-between",
          flexWrap: "wrap",
          margin: "30px",
          gap: "20px",
        }}
      >
        <Circle style={{ backgroundColor: "#FF0000" }}>
          <div
            style={{
              textAlign: "center",
              margin: "auto",
              padding: "30px 30px",
            }}
          >
            <h3>Severe</h3>
            <p><strong>{Severe}</strong></p>
          </div>
        </Circle>

        <Circle style={{ backgroundColor: "#FFFF00" }}>
          <div
            style={{
              textAlign: "center",
              margin: "auto",
              padding: "30px 30px",
            }}
          >
            <h3>Moderate</h3>
            <p><strong>{Moderate}</strong></p>
          </div>
        </Circle>

        <Circle style={{ backgroundColor: "#FF8C00" }}>
          <div
            style={{
              textAlign: "center",
              margin: "auto",
              padding: "30px 30px",
            }}
          >
            <h3>Mild</h3>
            <p><strong>{Normal}</strong></p>
          </div>
        </Circle>

        <Circle style={{ backgroundColor: "#008000" }}>
          <div
            style={{
              textAlign: "center",
              margin: "auto",
              padding: "30px 30px",
            }}
          >
            <h3>Free</h3>
            <p><strong>{totalBeds - count}</strong></p>
          </div>
        </Circle>
      </div>
      </RectBox>
      <h2 style={{position:"relative",left:"-200px"}}>Ventilators</h2>
      <RectBox style={{width:"700px"}}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "10px 40px",
          justifyContent: "space-between",
          flexWrap: "wrap",
          margin:"30px 90px 30px 90px",
          gap: "20px",
        }}
      >
        <Circle
          style={{
            backgroundColor: "#FF8C00",
          }}
        >
          <div
            style={{
              textAlign: "center",
              margin: "auto",
              padding: "30px 30px",
            }}
          >
            <h3>Used</h3>
            <p><strong>{Used}</strong></p>
          </div>
        </Circle>
        <Circle
          style={{
            backgroundColor: "#008000",
          }}
        >
          <div
            style={{
              textAlign: "center",
              margin: "auto",
              padding: "30px 30px",
            }}
          >
            <h3>Free</h3>
            <p><strong>{totalVentilators - Used}</strong></p>
          </div>
        </Circle>
      </div>
      </RectBox>
    </HomePageContainer>
  );
};

export default HomePage;
