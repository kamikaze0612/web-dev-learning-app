/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  color: var(--color-grey-900);
`;

function FormRow({ htmlFor, label, children }) {
  return (
    <StyledFormRow>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </StyledFormRow>
  );
}

export default FormRow;
