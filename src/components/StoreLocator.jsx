import React from "react";
import searchResults from "./searchResults";

class StoreLocator extends React.Component {
  // constructor() {
  //   super();
  //   const storeChangeEvent = new Event("storeChanged");
  // }
  componentDidMount() {
    // console.log(searchResults[0].dealerList);
    // console.log(Object.keys(searchResults));
  }

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

  render() {
    console.log(searchResults);
    const dealerList = searchResults.dealerList;
    return (
      <React.Fragment>
        <h1> Store Locator </h1>
        {dealerList.map((dealer, index) => {
          console.log(dealer);
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
      </React.Fragment>
    );
  }
}

export default StoreLocator;
