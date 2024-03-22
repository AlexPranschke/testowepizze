import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
<<<<<<< HEAD
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    display: grid;
    gap: 1rem;
    align-content: start;
    &.order,
    &.menu {
      grid-column: span 1;
=======
    display: grid;
    gap: 1rem;
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    label {
      display: grid;
      gap: 1rem;
      align-content: start;
    }
    label + label {
      margin-top: 1rem;
    }
    &.order,
    &.menu {
      grid-column: span 1;
      /* Chrome is weird about Grid and fieldsets, so we add a fixed height to fix it :)  */
      height: 600px;
>>>>>>> faa2cdc4561947a75ed77b439fa2a0c55e998809
    }
  }
  .mapleSyrup {
    display: none;
  }
<<<<<<< HEAD
  /* @media (max-width: 900px) {
=======
  @media (max-width: 900px) {
>>>>>>> faa2cdc4561947a75ed77b439fa2a0c55e998809
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
<<<<<<< HEAD
  } */
=======
  }
>>>>>>> faa2cdc4561947a75ed77b439fa2a0c55e998809
`;

export default OrderStyles;
