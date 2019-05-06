import React from "react";
import axios from "axios";
import searchResults from "./searchResults";
import { ReactBingmaps } from "react-bingmaps";

class StoreLocator extends React.Component {
  props = {};
  state = {
    searchString: "",
    bingKey: "Ak7CB4zWidZFVO3KrtQyLJrj-zjp0hB2sNHt73TYwBs0C0if68JFJSMIMhHRkyJE",
    storeQuery: {
      client: "myford",
      radius: 10
    }
  };

  componentDidMount = () => {
    // this.handleFormSubmit();
  };

  changeStore = e => {
    localStorage.setItem(
      "selectedStore",
      e.currentTarget.getAttribute("dealer")
    );
    window.dispatchEvent(new Event("storeChanged"));
  };

  clearStore = e => {
    localStorage.removeItem("selectedStore");
    window.dispatchEvent(new Event("storeChanged"));
  };

  handleQueryChange = e => {
    let currentState = this.state;
    currentState.searchString = e.currentTarget.value;
    this.setState(currentState);
  };

  handleFormSubmit = e => {
    e.preventDefault();
    axios
      .post(
        "http://dev.virtualearth.net/REST/v1/Locations/q?=",
        this.state.searchString,
        this.state.bingKey
      )
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
        // "https://www.digitalservices.ford.com/sharedServices/getqldealersbyzip.do",
      });
  };

  render() {
    const dealerList = searchResults.dealerList;
    return (
      <div style={{ height: "500px" }}>
        <h1> Store Locator </h1>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter Zip Code or Address"
            onChange={this.handleQueryChange}
            value={this.state.searchString}
            name="zip"
          />
          <button type="submit">Submit</button>
        </form>
        {dealerList.map((dealer, index) => {
          return (
            <button
              key={index}
              onClick={this.changeStore}
              dealer={JSON.stringify(dealer.dealer)}
            >
              {dealer.dealer.city}
            </button>
          );
        })}
        <button onClick={this.clearStore}>Clear Store</button>
        <div>
          {/* <ReactBingmaps
            style="{{ height:500px}}"
            bingmapKey="Ak7CB4zWidZFVO3KrtQyLJrj-zjp0hB2sNHt73TYwBs0C0if68JFJSMIMhHRkyJE"
          /> */}
        </div>
      </div>
    );
  }
}

export default StoreLocator;
