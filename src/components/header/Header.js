import React from "react";
import {Link} from "react-router-dom";
import { AuthContext } from "../../App";
import {ReactComponent as Logo} from "../../assets/Vebed_Logo.svg";

import { LogoContainer, OptionsContainer, OptionLink} from "./header.styles";

const Header = () => {
  const { state, dispatch } = React.useContext(AuthContext);

  // const performRedirect = () => {
  //   return <Redirect to="/"/>;
  // };

  return (
    <div
      className="ui secondary pointing menu"
      style={{
        backgroundColor: "#1b1c1d",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        paddingTop: "13px",
        width: "100%",
      }}
    >
      <Link to="/">
        <LogoContainer to="/">
          <Logo className="logo" style={{ backgroundColor: "white" }} />
        </LogoContainer>
      </Link>
      <div className="right menu">
        <Link to='/'>
          <OptionsContainer>
            {state.isAuthenticated ? (
              <OptionLink
                style={{ WebkitTextFillColor: "white" }}
                to="/#"
                onClick={() =>
          dispatch({
            type: "LOGOUT"
          })
        }>Logout
            </OptionLink>
          ) : (
            <OptionLink style={{ WebkitTextFillColor: "white" }} to="/signin">Login</OptionLink>
          )}          
          </OptionsContainer>
        </Link>
      </div>
    </div>
  );
};

export default Header;
