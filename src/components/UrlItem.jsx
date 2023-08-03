import { useNavigate } from "react-router-dom";
import { styled } from "styled-components"
import { pages } from "../routes/routes";

export default function UrlItem({ item }) {
    const navigate = useNavigate();

    function openUrlId(urlId) {
        navigate(pages.urlItem + urlId)
    };

    function removeItem(itemId) {
        alert(`Esta removendo o id ${itemId}`)
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