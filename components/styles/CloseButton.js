// import styled from "styled-components";
// const CloseButton = styled.button`
//   background: black;
//   color: white;
//   font-size: 3rem;
//   border: 0;
//   position: absolute;
//   z-index: 2;
//   right: 0;
// `;

const CloseButton = ({ toggleCart }) => (
  <button
    type="button"
    className="close ml-auto target-of-invoker-has-unfolds active"
    aria-controls="sidebarLoginForm"
    onClick={toggleCart}
    aria-haspopup="true"
    aria-expanded="true"
    data-unfold-event="click"
    data-unfold-hide-on-scroll="false"
    data-unfold-target="#sidebarLoginForm"
    data-unfold-type="css-animation"
    data-unfold-animation-in="fadeInRight"
    data-unfold-animation-out="fadeOutRight"
    data-unfold-duration="500"
  >
    <span aria-hidden="true">×</span>
  </button>
);
export default CloseButton;
