import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import AuthContext from "../contexts/AuthContext";
import {useParams } from "react-router-dom";
import { validateUser } from "../constants/functions";
import axios from "axios";
import {requisitions } from "../routes/routes";
import { ThreeDots } from "react-loader-spinner";
import Header from "../components/Header";

export default function RedirectUrlPage() {
    const { user, setUser } = useContext(AuthContext);
    const [redirectUrl, setRedirectUrl] = useState(undefined);
    const { shortUrl } = useParams();

    useEffect(() => {
        validateUser(user, setUser);
    
        axios.get(requisitions.redirectUrl + shortUrl)
          .then(resp => {
            setRedirectUrl(resp.data)
            console.log('resp em redirecUrlpage', resp)
        })
          .catch(error => {
            alert(error)
            console.log(error)
          });
      }, [user])

    return (
        <UrlContainer>
          <Header />
             <div>Redirecionando</div>
             {redirectUrl ? ('Redireciona..') : (
          <ThreeDots type="ThreeDots" color="#000000" height={90} width={150} />
        )}
        </UrlContainer>
    )
}

const UrlContainer = styled.div`
  height: 100vh;
`