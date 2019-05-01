import React from "react";

class SelectedStore extends React.Component {
  state = {
    selectedStore: null
  };

  componentDidMount() {
    
    window.addEventListener("storeChanged", this.onStoreChange);
  }

  onStoreChange = event => {
    console.log(localStorage.getItem("selectedStore"));
    let selectedStore = this.state.selectedStore;
    selectedStore = JSON.parse(localStorage.getItem("selectedStore"));
    this.setState({ selectedStore });
  };

  render() {
    let store = this.state.selectedStore;
    return (
      <React.Fragment>
        {store && (
          <React.Fragment>
            <h1>Selected Store</h1>
            <p>
              {store.dealerName}
              <br />
              {store.streetAddress}
              <br />
              {store.city}, {store.state} {store.zip}
              <br />
              {store.phone}
            </p>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default SelectedStore;
