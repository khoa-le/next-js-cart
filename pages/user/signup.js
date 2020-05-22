import { useState } from "react";
import Router from "next/router";
import styled from "styled-components";
import useUser from "../../lib/hooks/useUser";
import SignUp from "../../components/user/SignUp";

const SignupPage = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    event.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/user/login");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      <h1 className="h2 d-flex justify-content-center">Đăng Ký</h1>
      <SignupContainer>
        <SignUp errorMessage={errorMsg} onSubmit={handleSubmit} />
      </SignupContainer>
    </>
  );
};

const SignupContainer = styled.div`
  max-width: 21rem;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default SignupPage;
