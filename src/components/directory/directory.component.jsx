import CategoryItem from "../category-item/category-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map(({ id, title, imageUrl, route }) => (
        <CategoryItem
          key={id}
          title={title}
          imageUrl={imageUrl}
          route={route}
        />
      ))}
    </div>
  );
};

export default Directory;
