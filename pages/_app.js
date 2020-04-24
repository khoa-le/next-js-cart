import App from "next/app";
import Page from "../components/shared/Page";

import "../public/assets/css/bootstrap.min.css";
import "../public/assets/css/style.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || Page;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
