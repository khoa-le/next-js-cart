import { useState } from "react";
import styled from "styled-components";
import Forgot from "../../components/user/Forgot";
import useUser from "../../lib/hooks/useUser";
import Router from "next/router";

const ForgotPage = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (errorMsg) setErrorMsg("");

    const body = {
      username: e.currentTarget.username.value,
    };

    try {
      const res = await fetch("/api/user/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.replace("/user/login?forgot=true");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.log("An unexpected error happend occourred", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      <h1 className="h2 d-flex justify-content-center">Quên Mật Khẩu</h1>
      <ForgotContainer>
        <Forgot errorMessage={errorMsg} onSubmit={handleSubmit} />
      </ForgotContainer>
    </>
  );
};

const ForgotContainer = styled.div`
  max-width: 21rem;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default ForgotPage;
