import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSpinner = styled.span`
  width: 60px;
  aspect-ratio: 4;
  background: radial-gradient(circle closest-side, #000 90%, #0000) 0 /
    calc(100% / 3) 100% no-repeat;
  animation: d2 1s steps(3) infinite;

  @keyframes d2 {
    to {
      background-position: 150%;
    }
  }
`;
function Spinner() {
  return (
    <Container>
      <StyledSpinner />
    </Container>
  );
}

export default Spinner;
