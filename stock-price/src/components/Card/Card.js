import React, {useEffect, useState} from "react";
import "./Card.css";

function Card({cardInfo}) {

  const [cardInfoState, setCardInfoState] = useState([])

  useEffect(()=>{

    
    let tempCardInfo = []
    Object.keys(cardInfo).forEach(function (key, index) {
      tempCardInfo.push([key, cardInfo[key]]);
      
    });
    console.log(tempCardInfo)
    setCardInfoState(tempCardInfo)


  }, [cardInfo])

  return (
    <div>
    {cardInfo.length !== 0 && <div className="card">
      <div>
        <p className="card-title">Stock Information</p>
      </div>
      <div className="card-info">
        {cardInfoState.map((ele)=>{
          return <div className="card-item"><label>{ele[0]}: </label> {ele[1]}</div>
        })}
      </div>
    </div>}
    </div>
  );
}

export default Card;
