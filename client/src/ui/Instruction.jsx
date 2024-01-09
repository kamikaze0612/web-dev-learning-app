import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useInstruction } from "../context/InstructionContext";
import Spinner from "./Spinner";

const StyledInstruction = styled.div`
  height: 20vh;
  width: 100%;
`;

const Container = styled.div`
  padding: 0.8rem 1.2rem;
  border-top: 4px solid var(--color-grey-800);
  border-bottom: 4px solid var(--color-grey-800);
  background-color: var(--color-grey-100);
  height: 100%;
  overflow-y: auto;
`;

const Heading = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
`;

const InstructionText = styled.p`
  font-size: 1.6rem;
  line-height: 1.7;
`;

function Instruction() {
  const { id } = useParams();
  const { data, isLoading } = useInstruction();
  if (isLoading) return <Spinner />;

  return data ? (
    <StyledInstruction>
      <Container>
        <Heading>Алхам {id}</Heading>
        <InstructionText>{data[id - 1].instruction}</InstructionText>
      </Container>
    </StyledInstruction>
  ) : (
    <Spinner />
  );
}

export default Instruction;
