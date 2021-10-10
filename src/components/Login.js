import styled from "styled-components";
import LoginLogo from "../assets/images/login-logo.svg";
import Hero from "../assets/images/login-hero.svg";
import Google from "../assets/images/google.svg";
import "../assets/css/Login.css";
import { connect } from "react-redux";
import { signInAPI } from "../actions";
import { Redirect } from "react-router";

const Login = (props) => {
  console.log("user", props.user);
  return (
    <div className="container">
      {props.user && <Redirect to="/home" />}
      <div className="Nav">
        <a href="/">
          <img src={LoginLogo} alt="Logo" />
        </a>
        <div className="btnContainer">
          <div className="Join">Join now</div>
          <div className="SignIn">Sign in</div>
        </div>
      </div>
      <div className="section">
        <div className="Hero">
          <h1>Welcome to your professional community</h1>
          <img src={Hero} alt="Hero" />
        </div>
        <Form>
          <div className="Google" onClick={() => props.signIn()}>
            <img src={Google} alt="google" />
            Sign in with Google
          </div>
        </Form>
      </div>
    </div>
  );
};

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
