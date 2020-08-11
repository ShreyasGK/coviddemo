import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";

import Header from "./components/header/Header";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import { GlobalStyle } from "./global.styles";

import Home from "./pages/home/home";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const EntryPage = lazy(() => import("./pages/entry/entry"));
const PatientStatus = lazy(() => import("./pages/status/status"));
const Exit = lazy(() => import("./pages/exit/exit"));

const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  name: null
  //token: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.hcode));
      localStorage.setItem("name", JSON.stringify(action.payload.name));
      //localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.hcode,
        name: action.payload.name
        //token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        name: null
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  //const { user } = isAuthenticated({ hospitalCode :'HSP1', password:"qwert123" });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || null)
    const name = JSON.parse(localStorage.getItem('name') || null)

    if(user && name ){
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          name
        }
      })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route
                exact
                path="/"
                render={() => (state.isAuthenticated ? <HomePage /> : <Home />)}
              />
              <Route
                exact
                path="/signin"
                render={() =>
                  state.isAuthenticated ? (
                    <Redirect to="/" />
                  ) : (
                    <SignInAndSignUpPage />
                  )
                }
              />
              <Route
                render={() =>
                  state.isAuthenticated  ? (
                    <div className="left">
                      <div
                        className="ui visible sidebar inverted vertical menu"
                        style={{ top: 90 }}
                      >
                        <Link to="/" className="item">
                          Insights
                        </Link>
                        <Link to={{ pathname: "/entry" }} className="item">
                          Entry
                        </Link>
                        <Link to={{ pathname: "/status" }} className="item">
                          Patient Status
                        </Link>
                        <Link to={{ pathname: "/exit" }} className="item">
                          Exit
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )
                }
              />
              <Route exact path="/entry" component={EntryPage} />
              <Route exact path="/status" component={PatientStatus} />
              <Route exact path="/exit" component={Exit} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
