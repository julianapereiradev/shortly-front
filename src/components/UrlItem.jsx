import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components"
import { headersAuth, pages, requisitions } from "../routes/routes";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function UrlItem({ item }) {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();


    function openUrlId(urlId) {
        navigate(pages.urlItem + urlId)
    };

    function redirectItem(shortUrl) {
        axios
        .get(requisitions.redirectUrl + shortUrl, headersAuth(user.token))
        .then((res) => {
            console.log(res)
            window.location.reload();
        })
        .catch((erro) => {
        console.log('errro',erro)
        });
    };

    async function removeItem(itemId) {
        try {
            const headers = headersAuth(user?.token);
            await axios.delete(requisitions.deleteUrlById + itemId, headers);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }

    return (
        <ProductBox>
            <TextBox onClick={() => openUrlId(item.id)}>
                <div>idddd: {item.id}</div>
                <div>shortUrl: {item.shortUrl}</div>
                <div>url: {item.url}</div> 
                <div>visitCount: {item.visitCount}</div>
            </TextBox>
                <button onClick={() => redirectItem(item.shortUrl)}>ir direto para o link</button>
                <button onClick={() => removeItem(item.id)}>remover</button>
        </ProductBox>
    )
}

const ProductBox = styled.div`
border: 1px solid black;
margin-bottom: 25px;
`

const TextBox = styled.div`
    font-size: 4.0vw;
border: 1px solid red;
`