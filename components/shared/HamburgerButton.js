export default () => (
  <button
    className="navbar-toggler btn d-md-none u-hamburger"
    type="button"
    aria-label="Toggle navigation"
    aria-expanded="false"
    aria-controls="navBar"
    data-toggle="collapse"
    data-target="#navBar"
  >
    <span id="hamburgerTrigger" className="u-hamburger__box">
      <span className="u-hamburger__inner"></span>
    </span>
  </button>
);
