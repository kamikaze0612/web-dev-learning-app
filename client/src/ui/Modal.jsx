/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useInstruction } from "../context/InstructionContext";

const Overlay = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;

const StyledModal = styled.div`
  padding: 3.2rem;
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  background-color: var(--color-grey-100);
  border: 4px solid var(--color-grey-900);
  z-index: 1000;
`;

const Heading = styled.h2`
  font-size: 3rem;
  font-weight: 700;
`;

const Text = styled.p`
  font-size: 1.8rem;
  line-height: 1.8;
  text-align: center;
`;

const Button = styled(Link)`
  &:link,
  &:visited {
    padding: 1.2rem 2.4rem;
    font-size: 1.8rem;
    font-weight: 700;
    background-color: var(--color-grey-100);
    border: 3px solid var(--color-grey-900);
  }

  &:hover,
  &:active {
    background-color: var(--color-grey-50);
  }
`;

const Icon = styled.img`
  width: 9.6rem;
  height: 9.6rem;
`;

function Modal({ onShow }) {
  const { id } = useParams();
  const { data } = useInstruction();

  return (
    <Overlay>
      <StyledModal>
        <Icon src="/correct.svg" />
        <Heading>Баяр хүргэе!</Heading>
        <Text>Зөв хариуллаа. Дараагийн шат руу явцгаая</Text>
        <Button
          onClick={() => onShow(false)}
          to={`step/${id != data.length ? +id + 1 : 1}`}
        >
          Шилжих
        </Button>
      </StyledModal>
    </Overlay>
  );
}

export default Modal;
