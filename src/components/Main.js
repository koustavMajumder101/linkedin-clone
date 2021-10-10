import styled from "styled-components";
import "../assets/css/Main.css";
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <>
      {props.articles.length === 0 ? (
        <span>There are no articles!!</span>
      ) : (
        <Container>
          <SharedBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt="" />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}
              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
              >
                Start a post
              </button>
            </div>
            <div className="btnContainer">
              <button>
                <img src="/images/photo-icon.jpg" alt="" />
                <span>photo</span>
              </button>
              <button>
                <img src="/images/video-icon.png" alt="" />
                <span>video</span>
              </button>
              <button>
                <img src="/images/planner.png" alt="" />
                <span>event</span>
              </button>
              <button>
                <img src="/images/writing.png" alt="" />
                <span>Write Article</span>
              </button>
            </div>
          </SharedBox>
          <Content>
            {props.loading && <img src="/images/spinner.gif" />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => {
                return (
                  <Article key={key}>
                    {console.log(article)}
                    <SharedActor>
                      <a>
                        <img src={article.actor.image} alt="" />
                        <div>
                          <span>{article.actor.title}</span>
                          <span>{article.actor.description}</span>
                          <span>{article.actor.date.toLocaleDateString()}</span>
                        </div>
                      </a>
                      <button>
                        <img src="/images/elipses.jfif" alt="" />
                      </button>
                    </SharedActor>
                    <Description>
                      {article.description}
                      <SharedImg>
                        <a>
                          {!article.SharedImg && article.video ? (
                            <ReactPlayer width={"100%"} url={article.video} />
                          ) : (
                            article.sharedImage && (
                              <img src={article.sharedImage} />
                            )
                          )}
                        </a>
                      </SharedImg>
                      <SocialCounts>
                        <li>
                          <button>
                            <img src="/images/like-icon.png" alt="" />
                            <img src="/images/clapping-icon.png" alt="" />
                            <span>75</span>
                          </button>
                        </li>
                        <li>
                          <a>{article.comments} comments</a>
                        </li>
                      </SocialCounts>
                      <SocialActions>
                        <button>
                          <img src="/images/like2-icon.png" alt="" />
                          <span>Like</span>
                        </button>
                        <button>
                          <img src="/images/comment-icon.png" alt="" />
                          <span>Comments</span>
                        </button>
                        <button>
                          <img src="/images/share-icon.png" alt="" />
                          <span>Share</span>
                        </button>
                        <button>
                          <img src="/images/send-icon.png" alt="" />
                          <span>Send</span>
                        </button>
                      </SocialActions>
                    </Description>
                  </Article>
                );
              })}
          </Content>

          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), rgb(0 0 0 / 20%);
`;
const SharedBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0px;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }
    &::nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
          width: 20px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0px;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
  }
  img {
    width: 48px;
    height: 48px;
  }
  div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 0;
    margin-left: 8px;
    overflow: hidden;
    span {
      text-align: left;
      &:first-child {
        font-size: 14px;
        font-weight: 700;
        color: rgba(0, 0, 0, 1);
      }
      &:nth-child(n + 1) {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    display: flex;
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      img {
        margin: 5px;
        width: 20px;
        height: 20px;
      }
      span {
        margin-left: 5px;
      }
    }
    a {
      margin: 17px 5px;
    }
  }
  button {
    display: flex;
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  height: 20px;
  padding: 8px 4px 8px 4px;
  background: white;
  justify-content: space-around;
  button {
    outline: none;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    min-height: 48px;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    font-weight: 600;

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
