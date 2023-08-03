import { useNavigate } from "react-router-dom";
import { styled } from "styled-components"
import { pages } from "../routes/routes";

export default function UrlItem({ item }) {
    const navigate = useNavigate();

    function openUrlId(urlId) {
        navigate(pages.urlItem + urlId)
    };

    return (
        <ProductBox onClick={() => openUrlId(item.id)}>
            <TextBox>
                <div>idddd: {item.id}</div>
                <div>shortUrl: {item.shortUrl}</div>
                <div>url: {item.url}</div> 
                <div>visitCount: {item.visitCount}</div>
            </TextBox>
        </ProductBox>
    )
}

const ProductBox = styled.div`
border: 1px solid black;
`

const TextBox = styled.div`
    font-size: 4.0vw;
`