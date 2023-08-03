import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { validateUser } from "../constants/functions";
import axios from "axios";
import { headersAuth, pages, requisitions } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import UrlItem from "../components/UrlItem";


export default function HomePage() {
  const { user, setUser } = useContext(AuthContext);
  console.log("user em HomePage", user);
  const navigate = useNavigate();

  const [myurls, setMyUrls] = useState(undefined);

  useEffect(() => {
    validateUser(user, setUser);

    axios
      .get(requisitions.getUserMe, headersAuth(user.token))
      .then((res) => setMyUrls(res.data))
      .catch((error) => {
        navigate(pages.signIn);
        alert(error.response.data);
      });
  }, [user]);

  console.log('myUrls', myurls)

  return (
    <HomeContainer>
        <h1>Pagina Inicial</h1>
        <div>
          {myurls ? (myurls.shortenedUrls.map(item => <UrlItem key={item.id} item={item} />)) : (
            <ThreeDots type="ThreeDots" color="#F6E4C4" height={90} width={150} />
          )}
          </div>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  height: 100vh;
`