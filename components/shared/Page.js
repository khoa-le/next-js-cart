import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Router, { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import Head from "./Head";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "../cart/Cart";
import { PageContext } from "./page-context";
import { GlobalStyle, ThemeConfig } from "../styles/globalStyle";

class Page extends React.Component {
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
    const { router } = this.props;

    return (
      <ThemeProvider theme={ThemeConfig}>
        <GlobalStyle />
        <Head />
        <PageContext.Provider value={this.state}>
          <StyledPage>
            <Header />
            <Inner className="u-space-1">
              <>
                {this.props.children}
                <Cart></Cart>
              </>
            </Inner>
            <Footer />
          </StyledPage>
        </PageContext.Provider>
      </ThemeProvider>
    );
  }
}

const StyledPage = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  background: white;
  position: relative;
  color: ${(props) => props.theme.black};
  margin: 0 auto;
`;

const Inner = styled.div``;

export default withRouter(Page);
