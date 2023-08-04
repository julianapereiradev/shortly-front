import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { headersAuth, pages, requisitions } from "../routes/routes";
import logoinicio from "../images/logoinicio.png";

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser, userName, setUserName } = useContext(AuthContext);

  async function logout() {
    try {
      await axios.delete(requisitions.logout, headersAuth(user.token));
    } catch (error) {
      alert(error);
    }

    localStorage.removeItem("user");
    setUser(0);
    setUserName(0);
    navigate(pages.ranking);
  }

  return (
    <ContainerHeader>
      {user ? (
        <>
          <ContainerMenu>
            <h1>Seja bem-vindo(a), {userName}!</h1>
            <ContainerButtons>
              <button onClick={() => navigate(pages.home)}>Home</button>
              <button onClick={() => navigate(pages.ranking)}>Ranking</button>
              <button onClick={() => logout()}>Sair</button>
            </ContainerButtons>
          </ContainerMenu>
          <ContainerLogo>
            <img src={logoinicio} />
          </ContainerLogo>
        </>
      ) : (
        <>
          <ContainerMenu>
            <h1>{""}</h1>
            <ContainerButtons>
              <button onClick={() => navigate(pages.signIn)}>Entrar</button>
              <button onClick={() => navigate(pages.signUp)}>Cadastrar</button>
            </ContainerButtons>
          </ContainerMenu>
          <ContainerLogo>
            <img src={logoinicio} />
          </ContainerLogo>
        </>
      )}
    </ContainerHeader>
  );
}

const ContainerHeader = styled.header`
  height: 200px;
  /* border: 1px solid green; */
`;

const ContainerMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: #5d9040;
    font-size: 14px;
    font-weight: 600;
  }
`;
const ContainerButtons = styled.div`
  button {
    margin-left: 15px;
    border: none;
    background-color: #fff;
    color: #5d9040;
    font-size: 14px;
    font-weight: 600;

    &:hover {
      color: #9c9c9c;
    }
  }
`;

const ContainerLogo = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;

  img {
    width: 300px;
  }
`;
