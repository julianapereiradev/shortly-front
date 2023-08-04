import styled from "styled-components";
import { pages, requisitions } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import Header from "../components/Header";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  function SignUp(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Confirmação de senha está incorreta!");
    }

    const newSignUp = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    setDisable(true);

    axios
      .post(requisitions.postSignUp, newSignUp)
      .then((res) => {
        navigate(pages.signIn);
        setDisable(false);
      })
      .catch((erro) => {
        alert(erro.response.data.message);
        setDisable(false);
      });
  }

  return (
    <>
      <Header />
      <SingUpContainer>
        <SingUpBox onSubmit={SignUp}>
          <input
            type="name"
            autoComplete="name"
            placeholder="Nome"
            required
            disabled={disable}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            autoComplete="email"
            placeholder="E-mail"
            required
            disabled={disable}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            autoComplete="new-password"
            required
            disabled={disable}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="confirmpassword"
            placeholder="Confirmar senha"
            autoComplete="confirm-password"
            required
            disabled={disable}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" disabled={disable}>
            {disable ? (
              <ThreeDots
                type="ThreeDots"
                color="#1F1712"
                height={20}
                width={50}
              />
            ) : (
              "Criar Conta"
            )}
          </button>
        </SingUpBox>
      </SingUpContainer>
    </>
  );
}

const SingUpContainer = styled.div`
  /* border: 3px solid red; */
`;

const SingUpBox = styled.form`
  /* border: 3px solid blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  input {
    width: 70%;
    height: 60px;
    margin-bottom: 20px;
    border-radius: 12px;
    border: 1px solid rgb(120, 177, 89, 25%);
    box-shadow: rgba(156, 156, 156, 0.2) 0px 7px 29px 0px;
    padding-left: 10px;
    font-weight: 500;
  }

  button {
    margin-top: 50px;
    height: 70px;
    width: 200px;
    border-radius: 12px;
    border: none;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    background-color: #5D9040;
  }
`;
