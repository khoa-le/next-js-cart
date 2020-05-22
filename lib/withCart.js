import Router, { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";


export const withCart = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.updateCart = (cart) => {
        this.setState((state) => ({
          cart: {
            userCart: cart,
            cartOpen: true,
          },
        }));
      };
      this.toggleCart = (isCartOpen) => {
        this.setState((state) => ({
          cart: {
            userCart: state.cart.userCart,
            cartOpen: isCartOpen,
          },
        }));
      };
      this.state = {
        cart: {
          userCart: {},
          cartOpen: false,
        },
        updateCart: this.updateCart,
        toggleCart: this.toggleCart,
      };
    }
    componentDidMount() {
      const response = fetch("/api/checkout/cart")
        .then((r) => r.json())
        .then((cart) => {
          this.setState((state) => ({
            cart: {
              userCart: cart,
            },
          }));
        });
  
      Router.events.on("routeChangeComplete", (url) => {
        this.toggleCart(false);
      });
    }
    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent pageCart={this.state} {...this.props} />;
    }
  };
};
