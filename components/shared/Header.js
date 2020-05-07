import Router from 'next/router';
import NProgress from 'nprogress';
import TopBar from "./TopBar";
import LogoAndNav from "./LogoAndNav";


Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => (
  <>
    <TopBar />
    <LogoAndNav/>
  </>
);
export default Header;
