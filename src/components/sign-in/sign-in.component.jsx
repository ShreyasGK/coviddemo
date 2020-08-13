import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../App";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signin } from "../../apis";

import { SignInContainer, ButtonsBarContainer } from "./sign-in.styles";

const SignIn = () => {
  
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    hospitalCode: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

  const [values, setValues] = useState(initialState);

  const { hospitalCode, password, isAuthenticated } = values;
  //const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ hospitalCode, password }).then(res => {
      if (!res.Error) {
        return res[0];
      }
      throw res;
    }).then(resJson => {
      console.log(resJson);
      dispatch({
          type: "LOGIN",
          payload: resJson
      })
    })     
  };

  // const loadingMessage = () => {
  //   return (
  //     loading && (
  //       <div className="ui red message">
  //         <h2>Loading...</h2>
  //       </div>
  //     )
  //   );
  // };

  // const performRedirect = () => {
  //   //console.log("redir");
  //   if (isAuthenticated) {
  //     console.log("isauth", isAuthenticated);
  //     return <Redirect to="/" />;
  //   }
  // };

  // const errorMessage = () => {
  //   return (
  //     <div className="column" style={{ display: error ? "" : "none" }}>
  //       <div className="ui segment">
  //         <div
  //           className="ui red message"
  //           style={{ display: error ? "" : "none" }}
  //         >
  //           {error}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <SignInContainer>
      <span>Sign in with your email and password</span>

      <form>
        <FormInput
          name="hospitalCode"
          type="text"
          handleChange={handleChange("hospitalCode")}
          value={hospitalCode}
          label="hospitalCode"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange("password")}
          label="password"
          required
        />
        <ButtonsBarContainer>
          <CustomButton onClick={onSubmit} type="submit">
            Sign in
          </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
