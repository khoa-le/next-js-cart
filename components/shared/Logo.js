import Link from "next/link";

const Logo = () => (
    <Link href="/">
      <a className="navbar-brand u-header__navbar-brand" aria-label="Front">
        <img
          src="/assets/images/logo_transparent.png"
          width="150"
          alt="Next Js Cart"
        />
      </a>
    </Link>

);

export default Logo;
