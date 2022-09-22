import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Grid from "../Grid/Grid";
import "./Home.css";
import Filter from "../Filter/Filter";
import Axios from "axios";
import properties from "../../properties";
import Card from "../Card/Card";

function Home() {
  const title = "Stock Price App";
  const headers = ["Symbol", "Last Price", "Tag", "Actions"];
  const list = ["forFriends", "watching", "favourite"];
  const isButton = [
    { name: "action", type: "delete" },
    { name: "id", type: "default" },
  ];
  const [stockPricesState, setStockPricesState] = useState([]);
  const [stockPricesGrid, setStockPricesGrid] = useState([]);
  const [stockInfo, setStockInfo] = useState("");
  const [gridKey, setGridKey] = useState("");

  const buttonClickFilter = (key) => {
    if (key !== "All") {
      let stockPrices = [...stockPricesState];
      let result = stockPrices.filter((ele) => ele.tag === key);

      setStockPricesGrid(modifyFieldsForGrid(result));
    } else {
      setStockPricesGrid(modifyFieldsForGrid([...stockPricesState]));
    }
    setGridKey(key);
  };

  let getStockPrices = async () => {
    let stockPrices = {};
    try {
      stockPrices = await Axios.get(properties.url + "stock-prices");
    } catch (err) {
      console.error(err);
    }

    return stockPrices;
  };

  let deleteStocks = async (id) => {
    try {
      await Axios.delete(properties.url + "stock-prices/" + id);
    } catch (err) {
      console.error(err);
    }
  };

  let buttonClickGrid = (name, type) => {
    let stockPrices = [...stockPricesState];
    if (type === "default") {
      let result = stockPrices.filter((ele) => ele.id === name);
      setStockInfo(result[0]);
    } else if (type == "delete") {
      deleteStocks(name.id).then(() => {
        fetchStockPrices(name.id);
      });
    }
  };

  let modifyFieldsForGrid = (stockPrices) => {
    let gridArr = [];
    stockPrices.forEach((ele) => {
      let tempObj = JSON.parse(JSON.stringify(ele));
      tempObj.action = "";
      delete tempObj.marketCap;
      gridArr.push(tempObj);
    });
    return gridArr;
  };

  let fetchStockPrices = (key = "") => {
    getStockPrices().then((stockPrices) => {
      setStockPricesState(stockPrices.data);
      setStockPricesGrid(modifyFieldsForGrid(stockPrices.data));
      setGridKey(key);
    });
  };
  useEffect(() => {
    fetchStockPrices();
  }, []);

  return (
    <div>
      <NavBar title={title} />
      <div className="home-filter">
        <div className="home-filter-element">
          <Filter list={list} onButtonClick={buttonClickFilter} />
        </div>
      </div>
      <div className="home-grid">
        <Grid
          headers={headers}
          rows={stockPricesGrid}
          isButton={isButton}
          key={gridKey}
          onButtonClick={buttonClickGrid}
        />
      </div>
      <div className="app-card">
        <Card cardInfo={stockInfo} />
      </div>
    </div>
  );
}

export default Home;
