const CartItem = ({ item, onDeleteItem }) => (
  <tr>
    <td>
      <div className="media align-items-center">
        <div className="d-flex mr-3">
          <img width="64" src={`/media/product_images/${item.product.image}`} />
        </div>
        <div className="media-body">
          <h2 className="h6 mb-0">{item.product_name}</h2>
          <small className="d-block text-secondary">Small</small>
        </div>
      </div>
    </td>
    <td className="align-middle">{item.qty}</td>
    <td className="align-middle">{item.price}</td>
    <td className="align-middle text-center">
      <button
        type="button"
        className="close float-none"
        onClick={() => {
          onDeleteItem(item)
        }}
      >
        <span aria-hidden="true">×</span>
      </button>
    </td>
  </tr>
);

export default CartItem;
