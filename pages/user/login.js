import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import useUser from "../../lib/hooks/useUser";
import LoginForm from "../../components/user/Login";

const Login = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });
  const [errorMsg, setErrorMsg] = useState("");

  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const { forgot } = router.query;
    if (Boolean(forgot)) {
      setMessage("We sent you a reset link to reset password");
    }
  });
  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.replace("/");
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
      <h1 className="h2 d-flex justify-content-center">Đăng Nhập</h1>
      <LoginContainer>
        <LoginForm
          errorMessage={errorMsg}
          message={message}
          onSubmit={(event) => handleSubmit(event)}
        />
      </LoginContainer>
    </>
  );
};
const LoginContainer = styled.div`
  max-width: 21rem;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default Login;
