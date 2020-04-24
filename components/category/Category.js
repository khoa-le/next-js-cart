import ProductListing from "../product-list/ProductListing";

const Category = ({ category, products, page }) => {
  return (
    <div>
      <h3>
        Category:[{category.category_id}]{category.name}
      </h3>
      <div className="products">
        <ProductListing products={products} page={page} />
      </div>
    </div>
  );
};

export default Category;
