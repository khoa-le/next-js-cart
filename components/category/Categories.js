import Link from "next/link";
const Categories = ({ categories }) => {
  return (
    <div>
      <h3>Categories</h3>
      <div className="categories">
        {Object.keys(categories).map((key) => {
          const category = categories[key];
          return (
            <li key={category.category_id}>
              <Link href={`/categories/${category.category_id}`}>
                <a>{category.name}</a>
              </Link>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
