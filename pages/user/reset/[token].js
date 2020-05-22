import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import styled from "styled-components";
import Router from "next/router";
import ResetForm from "../../../components/user/Reset";

const Reset = (customer) => {
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    event.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      email: e.currentTarget.email.value,
      token: e.currentTarget.token.value,
      password: e.currentTarget.password.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    try {
      const res = await fetch("/api/user/reset", {
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
  };

  return (
    <>
      <h1 className="h2 d-flex justify-content-center">Đặt Lại Mật Khẩu</h1>
      <ResetContainer>
        <ResetForm
          customer={customer}
          onSubmit={handleSubmit}
          errorMessage={errorMsg}
        />
      </ResetContainer>
    </>
  );
};

const ResetContainer = styled.div`
  max-width: 21rem;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const getServerSideProps = async (context) => {
  const token = context.params.token;
  const user = null;
  const { email } = context.query;
  if (!token) {
    throw new Error("Token has invalid or expired");
  }
  const prisma = new PrismaClient();
  const customer = await prisma.customer.findOne({
    where: {
      email: email,
    },
  });
  console.log(customer);
  if (!customer || customer.reset_password_token !== token) {
    throw new Error("Token has invalid or expired");
  }

  return { props: { ...customer } };
};
export default Reset;
