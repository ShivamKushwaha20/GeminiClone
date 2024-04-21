import React, { useContext } from "react";
import "./Main.css";
import { Context } from "../../../context/Context.jsx";
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  return (
    <>
      <div className="main">
        <div className="nav">
          <p>Gemini</p>
          <img src="public/user_icon-BYrw3k3X.png" alt="userPhoto" />
        </div>
        <div className="mainContainer">
          {!showResult ? (
            <>
              <div className="greeting">
                <p>
                  <span>Hello, Dev</span>
                </p>
                <p>How can I help you today?</p>
              </div>
              <div className="cards">
                <div className="card">
                  <p>
                    Suggest Beautiful places to see on an upcomming road trip
                  </p>
                  <img src="./public/compass.png" alt="" />
                </div>
                <div className="card">
                  <p>some thing is written</p>
                  <img src="./public/Bulb.png" alt="" />
                </div>
                <div className="card">
                  <p>Some thing is written</p>
                  <img src="./public/message.png" alt="" />
                </div>
                <div className="card">
                  <p>Something is written</p>
                  <img src="./public/code.png" alt="" />
                </div>
              </div>
            </>
          ) : (
            <div className="result">
              <div className="result-title">
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                {loading ? (
                  <div className="loading">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          )}
          <div className="main-bottom">
            <div className="search-box">
              <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Enter your prompt here.."
              />
              <div>
                <img src="./public/image.png" alt="" />
                <img src="./public/mic.png" alt="" />
                <img onClick={() => onSent()} src="./public/send.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
