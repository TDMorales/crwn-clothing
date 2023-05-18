import { React } from "react";

import { Routes, Route } from "react-router-dom";

import "./shop.styles.scss";
import CategoriesPreview from "../Categories-Preview/categories-preview.component";
import CategoryPage from "../Category/categoryPage.component";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<CategoryPage />} />
    </Routes>
  );
};

export default Shop;
