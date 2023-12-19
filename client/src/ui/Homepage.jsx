import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Heading = styled.h1`
  font-size: 5.2rem;
  text-align: center;
  font-weight: 700;
`;

const StartButton = styled.button`
  font-size: 2rem;
  padding: 0.8rem 1.6rem;
  font-weight: 600;
  background-color: var(--color-grey-0);
  color: var(--color-grey-900);
  border: 2px solid var(--color-grey-900);
  border-radius: 12px;
  text-transform: uppercase;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const StyledHomepage = styled.div`
  background-color: var(--color-grey-100);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;
`;

function Homepage() {
  const navigate = useNavigate();

  return (
    <StyledHomepage>
      <Heading>WEB開発学習</Heading>
      <StartButton onClick={() => navigate("/lesson")}>Start</StartButton>
    </StyledHomepage>
  );
}

export default Homepage;
