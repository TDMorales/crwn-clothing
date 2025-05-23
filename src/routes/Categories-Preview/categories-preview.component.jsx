import { Fragment, React, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { Link } from "react-router-dom";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title, index) => {
        const products = categoriesMap[title];
        return (
          <Link to={`${title}`} key={`${title}-${index}`} >
            <CategoryPreview title={title} products={products} />
          </Link>
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
