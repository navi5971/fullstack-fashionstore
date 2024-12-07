import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./screens/home";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Itemcard from "./components/product/itemcard";
import Navbar from "./components/navbar";
import Search from "./components/search";
import SearchResults from "./components/product/searchresults";
import Dash from "./screens/dash";
import CollectionCard from "./components/collectioncard";
import CollectionsList from "./components/collectionlist";
import ProductForm from "./components/product/productfrom";
import Cartscreen from "./screens/cartscreen";
import Payment from "./screens/paymentform";
import { NotFound } from "./screens/404";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/search" exact element={<Search />} />
          <Route path="/search-results/:category" element={<SearchResults />} />
          <Route path="/dash" element={<Dash />} />
          <Route path="/additem" element={<ProductForm />} />
          <Route path="/collection" element={<CollectionsList />} />
          <Route path="/cart" element={<Cartscreen />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

