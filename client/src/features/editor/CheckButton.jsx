/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledCheckButton = styled.button`
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  border: 3px solid var(--color-grey-900);
  background-color: var(--color-grey-100);
  font-weight: 700;
  position: absolute;
  bottom: 2.4rem;
  right: 2.4rem;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

function CheckButton({ onCheck }) {
  return (
    <StyledCheckButton onClick={() => onCheck()}>Шалгах</StyledCheckButton>
  );
}

export default CheckButton;
