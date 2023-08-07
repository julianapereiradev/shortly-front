import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AuthContext from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { validateUser } from "../constants/functions";
import axios from "axios";
import { headersAuth, pages, requisitions } from "../routes/routes";
import { ThreeDots } from "react-loader-spinner";
import Header from "../components/Header";

export default function UrlPage() {
  const { user, setUser } = useContext(AuthContext);
  const [urlItemId, seturlItemId] = useState(undefined);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    validateUser(user, setUser);

    axios
      .get(requisitions.getUrlById + id, headersAuth(user.token))
      .then((resp) => {
        seturlItemId(resp.data);
        console.log("resp em urlpage", resp);
      })
      .catch((error) => {
        alert(error.response.data.message);
        navigate(pages.signIn);
      });
  }, [user]);

  return (
    <UrlContainer>
      <Header />
      <ContainerTitle>
        <div>Informações da url:</div>
      </ContainerTitle>
      <InfosContainer>
        {urlItemId ? (
          <DescriptionInfo>
            <h1>
              <span>Url Original: </span><a href={urlItemId.url} target="_blank">{urlItemId.url}</a>
            </h1>
            <h1>
              <span>Url Encurtada:</span> {urlItemId.shortUrl}
            </h1>
          </DescriptionInfo>
        ) : (
          <ThreeDots type="ThreeDots" color="#000000" height={90} width={150} />
        )}
      </InfosContainer>
    </UrlContainer>
  );
}

const UrlContainer = styled.div`
  /* height: 100vh; */
`;
const ContainerTitle = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  font-weight: 600;
  font-size: 30px;
`;

const InfosContainer = styled.div`
  border: 1px solid rgb(120, 177, 89, 25%);
  border-radius: 12px;
  box-shadow: rgba(156, 156, 156, 0.2) 0px 7px 29px 0px;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 30px;
`;

const DescriptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 20px;


  a {
    color: #5d9040;

    &:visited:hover {
      color: #9c9c9c;
    }
  }

  h1 {
    color: #000;
    font-size: 18px;
    margin-top: 20px;

    span {
      font-weight: 600;
    }
  }

  
`;
