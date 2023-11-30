// DataBox.js
import React from "react";

const DataBox = ({ data }) => {
  return (
    <ul className="data-list">
      <li>
        <h2
          style={{
            fontSize: "14px",
            margin: "0",
            padding: "0",
            color: "white",
          }}
        >
          {data.name}
        </h2>
        <p
          style={{
            color: data.color,
            fontSize: "12px",
            margin: "0",
            paddingTop: "0",
            padding: "2px",
          }}
        >
          {data.tag}
        </p>
      </li>
    </ul>
  );
};

export default DataBox;
