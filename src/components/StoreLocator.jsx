import React from "react";
import axios from "axios";
import searchResults from "./searchResults";
import { ReactBingmaps } from "react-bingmaps";

class StoreLocator extends React.Component {
  props = {};
  state = {
    searchParams: {
      zip: 60614,
      client: "myford",
      radius: 50
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
    currentState.searchParams.zip = e.currentTarget.value;
    this.setState(currentState);
  };

  handleFormSubmit = e => {
    e.preventDefault();
    axios
      .post(
        "https://www.digitalservices.ford.com/sharedServices/getqldealersbyzip.do",
        this.state.searchParams
      )
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
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
            value={this.state.searchParams.zip}
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
          <ReactBingmaps
            style="{{ height:500px}}"
            bingmapKey="Ak7CB4zWidZFVO3KrtQyLJrj-zjp0hB2sNHt73TYwBs0C0if68JFJSMIMhHRkyJE"
          />
        </div>
      </div>
    );
  }
}

export default StoreLocator;
