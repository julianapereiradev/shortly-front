import styled from "styled-components";
import { pages, requisitions } from "../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

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
      return alert('Confirmação de senha está incorreta!')
    }

    const newSignUp = { name: name, email: email, password: password, confirmPassword: confirmPassword };
    setDisable(true)

    axios.post(requisitions.postSignUp, newSignUp)
      .then((res) => {
        navigate(pages.signIn)
        setDisable(false)
      })
      .catch((erro) => {
        alert(erro.response.data.message)
        setDisable(false)
      });
  }

  return (
    <SingUpContainer>
      <form onSubmit={SignUp}>
            <div >Cadastro</div>
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
                "Cadastrar"
              )}
            </button>

            <LinkToSignUp to={pages.signIn}>
              Já tem cadastro? Clique aqui para entrar!
            </LinkToSignUp>
      </form>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.div`
  height: 100vh;
`;

const LinkToSignUp = styled(Link)`
  align-self: center;
  font-size: 18px;
  color: #ff0000;
  text-decoration: underline;
`;
