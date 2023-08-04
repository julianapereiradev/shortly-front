import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import { headersAuth, pages, requisitions } from "../routes/routes"

export default function Header() {

  const navigate = useNavigate()
  const { user, setUser, userName, setUserName } = useContext(AuthContext)

  async function logout() {
    try {
      await axios.delete(requisitions.logout, headersAuth(user.token));
    } catch (error) {
      alert(error);
    }

    localStorage.removeItem('user');
    setUser(0);
    navigate(pages.signIn)
  }

  return (
    <ContainerHeader>
      <h1>{userName}</h1>
      <button onClick={() => navigate(pages.home)}>Home</button>
      <h1>LOGO SHORTLY</h1>
      <h2>rota de ranking</h2>
      <div>
        <button onClick={() => logout()}>Sair</button>
      </div>
    </ContainerHeader>
  )
}

const ContainerHeader = styled.header` 
 border: 5px solid green
`