import styled from "styled-components";
import "../assets/css/Header.css";
import HomeLogo from "../assets/images/home-logo.svg";
import SearchIcon from "../assets/images/search-icon.svg";
import NavHome from "../assets/images/nav-home.svg";
import NavNetwork from "../assets/images/nav-network.svg";
import NavJobs from "../assets/images/nav-jobs.svg";
import { connect } from "react-redux";
import { signOutAPI } from "../actions";

const Header = (props) => {
  return (
    <div className="container">
      <div className="content">
        <div className="Logo">
          <a href="/home">
            <img src={HomeLogo} alt="HomeLogo" />
          </a>
        </div>
        <div className="Section">
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <div className="SearchIcon">
            <img src={SearchIcon} alt="SearchIcon" />
          </div>
        </div>
        <div className="Nav">
          <NavListWrap>
            <NavList className="active">
              <a>
                <img src={NavHome} alt="NavHome" />
                <span>Home</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src={NavNetwork} alt="NavNetwork" />
                <span>My Network</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src={NavJobs} alt="NavJobs" />
                <span>Jobs</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-messaging.svg" alt="" />
                <span>Messaging</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-notifications.svg" alt="" />
                <span>Notifications</span>
              </a>
            </NavList>

            <User>
              <a>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>
                  Me
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>

              <SignOut onClick={() => props.signOut()}>
                <a>Sign Out</a>
              </SignOut>
            </User>

            <Work>
              <a>
                <img src="/images/nav-work.svg" alt="" />
                <span>
                  Work
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </div>
      </div>
    </div>
  );
};

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
  cursor: pointer;
`;

const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }
  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
      background-color: #afa9a9;
    }
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
