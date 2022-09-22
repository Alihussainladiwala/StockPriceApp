import React, { useEffect, useState } from "react";
import "./Grid.css";

function Grid({ headers = [], rows = [], isButton = [], onButtonClick }) {
  const [gridElementsState, setGridElementsState] = useState([]);

  const gridStyle = (headerLength) => ({
    display: "grid",
    gridTemplateColumns: "repeat(" + headerLength + ", 1fr)",
    gridTemplateRows: "4vh",
  });

  const checkButtonType = (key) => {
    let result = isButton.filter((ele) => {
      if (ele.name.toLowerCase() === key.toLowerCase()) {
        return ele.type;
      }
    });
    if (result.length > 0) {
      return result[0].type;
    }
  };

  useEffect(() => {
    let gridElements = [...gridElementsState];
    rows.map((row) => {
      Object.keys(row).forEach(function (key, index) {
        gridElements.push([key, row[key], row]);
      });
    });

    setGridElementsState(gridElements);
  }, rows);

  return (
    <div>
      <div style={gridStyle(headers.length)}>
        {headers.map((header) => (
          <div key={header} className="grid-header">
            {header}
          </div>
        ))}

        {gridElementsState &&
          gridElementsState.map((ele, index) => (
            <div>
              {ele[0] !== undefined && checkButtonType(ele[0]) === "default" && (
                <div
                  className="grid-element-button"
                  key={ele[1]}
                  onClick={() => {
                    onButtonClick(ele[1], "default");
                  }}
                >
                  {ele[1]}
                </div>
              )}
              {ele[0] !== undefined && checkButtonType(ele[0]) === undefined && (
                <div className="grid-element" key={ele[1]}>
                  {ele[1]}
                </div>
              )}

              {ele[0] !== undefined && checkButtonType(ele[0]) === "delete" && (
                <div
                  className="grid-element-delete"
                  key={ele[1]}
                  onClick={() => {
                    onButtonClick(ele[2], "delete");
                  }}
                >
                  X
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Grid;
