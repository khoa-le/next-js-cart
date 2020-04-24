import styled from "styled-components";
import Link from "next/link";

const ProductListingItemWrap = styled.div`
  color: red;
`;
const PriceBox = styled.div`
  text-decoration: line-through;
`;

const ProductListingItem = ({ product }) => {
  return (
    <ProductListingItemWrap className="col-sm-6 col-lg-4 mb-9">
      <Link href={`/products/${product.product_id}`}>
        <a className="d-block text-dark text-center transition-3d-hover">
          <img
            className="img-fluid rounded"
            src={`/media/product_images/${product.image}`}
            alt={product.name}
          />
          <span className="pt-4 px-4">
            <h2 className="h5 mb-1">{product.name}</h2>
            {product.discounted_price > 0 ? (
              <>
                <PriceBox>{product.price}</PriceBox>
                <span className="d-block">{product.discounted_price}</span>
              </>
            ) : (
              <span className="d-block">{product.price}</span>
            )}
          </span>
        </a>
      </Link>
    </ProductListingItemWrap>
  );
};

export default ProductListingItem;
