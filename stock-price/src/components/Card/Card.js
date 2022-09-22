import React, { useEffect, useState } from "react";
import "./Card.css";

function Card({ cardInfo }) {
  const [cardInfoState, setCardInfoState] = useState([]);

  useEffect(() => {
    let tempCardInfo = [];
    Object.keys(cardInfo).forEach(function (key, index) {
      tempCardInfo.push([key, cardInfo[key]]);
    });
    setCardInfoState(tempCardInfo);
  }, [cardInfo]);

  return (
    <div>
      {cardInfoState.length !== 0 && (
        <div className="card">
          <div className="card-title-bar">
            <div >
              <p className="card-title">Stock Information</p>
            </div>
            <div>
              <p className="card-close"  title="Close" onClick={()=>{setCardInfoState([])}}>X</p>
            </div>
          </div>
          <div className="card-info">
            {cardInfoState.map((ele) => {
              return (
                <div className="card-item">
                  <label>{ele[0]}: </label> {ele[1]}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
