import { useNavigate } from "react-router-dom";
import { styled } from "styled-components"
import { headersAuth, pages } from "../routes/routes";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function UrlItem({ item }) {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function openUrlId(urlId) {
        navigate(pages.urlItem + urlId)
    };

    async function removeItem(itemId) {
        try {
            const headers = headersAuth(user?.token);
            await axios.delete(`http://localhost:5000/urls/${itemId}`, headers);
            alert(`Removendo o id ${itemId}`);
            window.location.reload(); // This will reload the page to reflect the updated list
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