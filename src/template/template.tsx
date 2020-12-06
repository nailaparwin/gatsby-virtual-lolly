import { Link } from "gatsby";
import React from "react";
import Lolly from "../components/Lolly";
import "../styles/main.css";

const Template = ({ pageContext: { data } }) => {
  return (
    <div className="createLolly">
      <Lolly
        fillLollyTop={data.flavourTop}
        fillLollyMiddle={data.flavourMiddle}
        fillLollyBottom={data.flavourBottom}
      />
      <div className="info">
        <div className="details">
          <p id="recipient" className="recipient">
            {data.recipientName}
          </p>
          <div id="message" className="message">
            {data.message}
          </div>
          <p id="from" className="from">
            — {data.senderName}
          </p>
        </div>
        <p className="bytheway">
          {data.sender}
          made this virtual lollipop for you. You can
          <Link to="/createNew">make your own</Link> to send to a friend
        </p>
      </div>
    </div>
  );
};

export default Template;
