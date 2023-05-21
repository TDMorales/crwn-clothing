import { useNavigate } from "react-router-dom";
import {
  CategoryContainer,
  BackgroundImage,
  Body,
} from "./category-item.styles.jsx";

const CategoryItem = ({ title, imageUrl, route }) => {
  const navigate = useNavigate();

  const goToPage = () => navigate(route);

  return (
    <CategoryContainer onClick={goToPage}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </CategoryContainer>
  );
};

export default CategoryItem;
