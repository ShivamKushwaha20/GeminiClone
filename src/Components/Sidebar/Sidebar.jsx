import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { Context } from "../../context/Context";



const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {onSent, prevPrompt,newchat, setRecentPrompt } = useContext(Context);
  const loadPrompt = async(prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }
  return (
    <>
      <div className="sidebar">
        <div className="top">
          <div onClick={() => setExtended((prev) => !prev)}>
            <i className="menu fa-solid fa-bars"></i>
          </div>
          <div onClick={()=>newchat()} className="newChat">
            <i class="plus-icon fa-solid fa-plus"></i>
            {extended ? <p>New Chat</p> : null}
          </div>
          {extended ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompt.map((item, index) => {
                return (
                  <div onClick={()=>loadPrompt(item)} className="recentEntry">
                    <i class="message-Icon fa-regular fa-message"></i>
                    <p>{item.slice(0,18)}...</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="bottom">
          <div className="bottom-item recentEntry">
            <i class="help-icon fa-sharp fa-solid fa-circle-info"></i>
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recentEntry">
            <i class="history-icon fa-solid fa-clock-rotate-left"></i>
            {extended ? <p>Activity</p> : null}
          </div>
          <div className="bottom-item recentEntry">
            <i class="Setting-icon fa-solid fa-gear"></i>

            {extended ? <p>setting</p> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
