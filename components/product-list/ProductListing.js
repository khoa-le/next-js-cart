import styled from "styled-components";
import { GlobalConfiguration } from "../../utils/global";
import ProductListingItem from "./ProductListingItem";
import Pagination from "./Pagination";

const ProductListingWrapper = styled.div``;

const ProductListing = ({ products }) => {
  return (
    <div className="container">
      <ProductListingWrapper className="row mx-gutters-5">
        {products.length == 0 ? (
          <p>Product listing was empty</p>
        ) : (
          <>
            {Object.keys(products).map((key) => {
              if (key < GlobalConfiguration.ProductListing.PerPage) {
                const product = products[key];
                return (
                  <ProductListingItem
                    product={product}
                    key={product.product_id}
                  />
                );
              }
            })}
          </>
        )}
      </ProductListingWrapper>
      <Pagination numberProducts={products.length}></Pagination>
    </div>
  );
};
export default ProductListing;
