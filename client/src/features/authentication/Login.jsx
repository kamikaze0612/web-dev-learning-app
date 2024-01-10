import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-100);
`;

const Form = styled.form`
  width: 40rem;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  padding: 3.2rem;
  border: 2px solid var(--color-grey-800);
  background-color: var(--color-grey-0);
`;

const Heading = styled.h2`
  font-size: 3rem;
  color: var(--color-grey-800);
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  color: var(--color-grey-900);
`;

const Input = styled.input`
  display: block;
  padding: 0.6rem 1.2rem;
  border-radius: 0.8rem;
  border: 1px solid var(--color-grey-700);
`;

const SubmitButton = styled.button`
  align-self: center;
  padding: 0.8rem 1.6rem;
  border-radius: 1.2rem;
  border: 2px solid var(--color-grey-800);
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/users/login",
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    });

    if (res.statusText === "OK") {
      toast.success("Logged in successfully");
      navigate("/");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Heading>Log In</Heading>
        <FormRow>
          <Label htmlFor="email">Enter your email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="password">Enter your password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </FormRow>
        <SubmitButton type="submit">Log in</SubmitButton>
      </Form>
    </Container>
  );
}

export default Login;
