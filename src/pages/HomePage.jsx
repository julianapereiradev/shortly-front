import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { validateUser } from "../constants/functions";
import axios from "axios";
import { headersAuth, pages, requisitions } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import UrlItem from "../components/UrlItem";
import Header from "../components/Header";

export default function HomePage() {
  const { user, setUser, setUserName } = useContext(AuthContext);
  console.log("user em HomePage", user);
  const navigate = useNavigate();

  const [myurls, setMyUrls] = useState(undefined);
  const [extendUrl, setExtendUrl] = useState("");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    validateUser(user, setUser);

    axios
      .get(requisitions.getUserMe, headersAuth(user.token))
      .then((res) => {
        setMyUrls(res.data);
        setUserName(res.data.name);
      })
      .catch((erro) => {
        navigate(pages.signIn);
        alert(erro.message);
      });
  }, [user]);

  function postUrlLink(e) {
    e.preventDefault();
    setDisable(true);

    const informations = { url: extendUrl };

    axios
      .post(requisitions.postUrl, informations, headersAuth(user.token))
      .then((resp) => {
        console.log(resp.data);
        window.location.reload();
        setDisable(false);
      })
      .catch((error) => {
        alert(error.response.data);
        console.log('erro aqui:', error)
        setDisable(false);
      });
  }

  function handleRedirect() {
    window.location.reload();
}

  return (
    <>
      <Header />
      <HomeContainer>
        <HomeBox>
          <PostUrlBox>
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
          </PostUrlBox>

          <div>
          {myurls ? (
            myurls.shortenedUrls.map((item) => (
                <UrlItem key={item.id} item={item} onRedirect={handleRedirect} />
            ))
        ) : ( <ContainerText>
          <div>Você ainda não possui urls cadastradas!</div>
        </ContainerText>)}
          </div>
        </HomeBox>
      </HomeContainer>
    </>
  );
}

const HomeContainer = styled.div`
  /* border: 1px solid yellow; */
`;

const HomeBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  padding-right: 50px;
`;

const PostUrlBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;

  input {
    width: 100%;
    height: 60px;
    border-radius: 12px;
    border: 1px solid rgb(120, 177, 89, 25%);
    box-shadow: rgba(156, 156, 156, 0.2) 0px 7px 29px 0px;
    padding-left: 10px;
    font-weight: 500;
  }

  button {
    height: 60px;
    width: 200px;
    border-radius: 12px;
    border: none;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    background-color: #5D9040;
    margin-left: 40px;
  }
`;

const ContainerText = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  font-weight: 600;
  font-size: 30px;
`;
