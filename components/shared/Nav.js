import Link from "next/link";

const Nav = () => (
  <div id="navBar" className="collapse navbar-collapse py-0">
    <ul className="navbar-nav u-header__navbar-nav mx-md-auto">
    <li className="nav-item hs-has-mega-menu u-header__nav-item hs-mega-menu-opened" data-event="hover" data-animation-in="slideInUp" data-animation-out="fadeOut" data-position="left">
        <Link href="/">
          <a className="nav-link u-header__nav-link pl-0">Home</a>
        </Link>
      </li>
      <li>
        <Link href="/categories">
          <a className="nav-link u-header__nav-link pl-0">Categories</a>
        </Link>
      </li>
      <li>
        <Link href="/products">
          <a className="nav-link u-header__nav-link pl-0">Products</a>
        </Link>
      </li>
    </ul>
  </div>
);

export default Nav;
