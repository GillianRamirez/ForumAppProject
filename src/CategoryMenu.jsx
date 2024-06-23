import React from "react";

const CategoryMenu = ({ categories, onSelectCategory }) => {
  return (
    <div className="categoryMenu">
      <h2 className="categoryMenuTitle">Categories</h2>
      <ul className="categoryList">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.id}>
              <button onClick={() => onSelectCategory(category.id)}>
                {category.name}
              </button>
            </li>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </ul>
    </div>
  );
};

export default CategoryMenu;
