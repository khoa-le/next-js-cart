import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import Head from "./Head";
import Footer from "./Footer";
import Logo from "./Logo";
import { PageContext } from "./page-context";
import { GlobalStyle, ThemeConfig } from "../styles/globalStyle";

class PageBlank extends React.Component {
  constructor(props) {
    super(props);
    this.updateCart = cart => {
      this.setState(state => ({
        cart: {
          userCart: cart,
          cartOpen: true
        }
      }));
    };
    this.toggleCart = () => {
      this.setState(state => ({
        cart: {
          userCart: state.cart.userCart,
          cartOpen: !state.cart.cartOpen
        }
      }));
    };
    this.state = {
      cart: {
        userCart: {},
        cartOpen: false
      },
      updateCart: this.updateCart,
      toggleCart: this.toggleCart
    };
  }
  componentDidMount() {
    const response = fetch("/api/checkout/cart")
      .then(r => r.json())
      .then(cart => {
        this.setState(state => ({
          cart: {
            userCart: cart
          }
        }));
      });
  }

  render() {
    const { router } = this.props;
    return (
      <ThemeProvider theme={ThemeConfig}>
        <GlobalStyle />
        <Head/>
        <PageContext.Provider value={this.state}>
          <StyledPage>
            <Logo />
            <Inner className="u-space-1">
                {this.props.children}
            </Inner>
            <Footer />
          </StyledPage>
        </PageContext.Provider>
      </ThemeProvider>
    );
  }
}

const StyledPage = styled.div`
  max-width: ${props => props.theme.maxWidth};
  background: white;
  position: relative;
  color: ${props => props.theme.black};
  margin: 0 auto;
`;

const Inner = styled.div``;

export default withRouter(PageBlank);
