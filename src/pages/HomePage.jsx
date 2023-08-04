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
  const [extendUrl, setExtendUrl] = useState('');
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    validateUser(user, setUser);

    axios
      .get(requisitions.getUserMe, headersAuth(user.token))
      .then((res) => setMyUrls(res.data))
      .catch((erro) => {
        navigate(pages.signIn);
         alert(erro.response.data.message)
      });
  }, [user]);

  function postUrlLink(e) {
    e.preventDefault();
    setDisable(true);

    const informations = { url: extendUrl }

    axios.post(requisitions.postUrl, informations, headersAuth(user.token))
        .then(resp => {
            console.log(resp.data)
            window.location.reload();
            setDisable(false);
        })
        .catch(error => {
            alert(error.response.data);
            setDisable(false);
        })
}
  

  return (
    <HomeContainer>
        <h1>Pagina Inicial</h1>
        <InputStyle>
           <h1>ADD URL:</h1>
           <input
              size={30}
              type="url"
              autoComplete="url"
              placeholder="Links que cabem no bolso"
              required
              disabled={disable}
              value={extendUrl}
              onChange={(e) => setExtendUrl(e.target.value)}
            />
            <button onClick={postUrlLink}>Encurtar link</button>
        </InputStyle>
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
const InputStyle = styled.div`
  border: 3px solid blue;
`