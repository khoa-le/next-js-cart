import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { PageContext } from "./page-context";
import { withCart } from "../../lib/withCart";
import { GlobalStyle, ThemeConfig } from "../styles/globalStyle";
import Head from "./Head";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "../cart/Cart";

class Page extends React.Component {
  render() {
    const { pageCart } = this.props;
    return (
      <ThemeProvider theme={ThemeConfig}>
        <GlobalStyle />
        <Head />
        <PageContext.Provider value={pageCart}>
          <StyledPage >
            <Header />
            <Inner className="container-fluid u-space-1">
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

export default withCart(Page);
