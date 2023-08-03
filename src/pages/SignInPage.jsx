import styled from "styled-components"
import { pages, requisitions } from "../routes/routes";
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

export default function SignInPage() {

  const {user, setUser} = useContext(AuthContext)
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);

  function SignIn(e) {
    e.preventDefault();
    setDisable(true);

    const login = { email: email, password: password };

    axios.post(requisitions.postSignIn, login)
      .then((res) => {
        const newUser = {
          token: res.data.token
        }
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser))
        navigate(pages.home)
        setDisable(false)
      })
      .catch((erro) => {
        alert(erro.response.data.message)
        setDisable(false)
      });
  }


  return (
    <SingInContainer>
          <form onSubmit={SignIn}>

                <input
                  type="email"
                  autoComplete="username"
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

                <button
                  type="submit"
                  disabled={disable}
                >
                  {disable ? (
                    <ThreeDots type="ThreeDots" color="#1F1712" height={20} width={50} />
                  ) : (
                    "Entrar"
                  )}
                </button>

                <LinkToSignUp to={pages.signUp}>
                  Primeira vez? Cadastre-se!
                </LinkToSignUp>
          </form>
    </SingInContainer>
  )
}

const SingInContainer = styled.div`
  height: 100vh;
`

const LinkToSignUp = styled(Link)`
  align-self: center;
  font-size: 18px;
  color: #fa9e00;
  text-decoration: underline;
`;
