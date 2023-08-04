import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
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
    
        axios.get(requisitions.getUrlById + id, headersAuth(user.token))
          .then(resp => {
            seturlItemId(resp.data)
            console.log('resp em urlpage', resp)
        })
          .catch(error => {
            alert(error.response.data.message)
            navigate(pages.signIn);
          });
      }, [user])

    return (
        <UrlContainer>
          <Header />
             <div>Pagina da Url Id</div>
             {urlItemId ? (
                <div>
                <div>Id:{urlItemId.id}</div>
                <div>shortUrl:{urlItemId.shortUrl}</div>
                <div>url:{urlItemId.url}</div>
                <div> visitCount:{urlItemId.visitCount}</div>
                </div>
        ) : (
          <ThreeDots type="ThreeDots" color="#000000" height={90} width={150} />
        )}
        </UrlContainer>
    )
}

const UrlContainer = styled.div`
  height: 100vh;
`