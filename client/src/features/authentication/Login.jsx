import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import styled from "styled-components";

import FormRow from "../../ui/FormRow";
import { LIVE_URL } from "../../ui/AppLayout";

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
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("pass1234");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const res = await axios({
      method: "post",
      url: `${LIVE_URL}/api/v1/users/login`,
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    });

    setIsLoading(false);
    if (res.status == 200) {
      toast.success("Logged in successfully");
      setTimeout(() => navigate("/home"), 1000);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Heading>Log In</Heading>
        <FormRow htmlFor="email" label="Email">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
            defaultValue="demo@example.com"
          />
        </FormRow>

        <FormRow htmlFor="password" label="Password">
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            defaultValue="pass1234"
          />
        </FormRow>
        <SubmitButton type="submit">
          {isLoading ? "Logging in..." : "Log in"}
        </SubmitButton>
      </Form>
    </Container>
  );
}

export default Login;
