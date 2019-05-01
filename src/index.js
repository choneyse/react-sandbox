import React from "react";
import { render } from "react-dom";
import SelectedStore from "./components/SelectedStore";
import StoreLocator from "./components/StoreLocator";

render(<SelectedStore />, document.querySelector("#selected-store"));
render(<StoreLocator />, document.querySelector("#store-locator"));
