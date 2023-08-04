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

    function openRedirectUrl(redirect) {
        navigate(pages.redirect + redirect)
    };

    // function openRedirectUrl(redirect) {
    //     window.open(redirect);
    //   }
      

    // function redirectItem(shortUrl) {
    //     axios
    //     .get(`http://localhost:5000/urls/open/${shortUrl}`)
    //     .then((res) => {
    //         console.log(res)
    //         // openRedirectUrl(res)
    //     })
    //     .catch((erro) => {
    //     console.log('errro',erro)
    //     });
    // };

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
        <>
        <ProductBox>
            <ItemUrlBox onClick={() => openUrlId(item.id)}>
                <div>{item.url}</div> 
                <div>{item.shortUrl}</div>
                <div>Quantidade de visitantes: {item.visitCount}</div>
            </ItemUrlBox>
            <ButtonsBox>
             <DeleteIcon onClick={() => removeItem(item.id)}><ion-icon name="trash-outline"></ion-icon></DeleteIcon>
            <RedirectIcon onClick={() => openRedirectUrl(item.shortUrl)}><ion-icon name="paper-plane-outline"></ion-icon></RedirectIcon>
            </ButtonsBox>
           
            
            {/* <button onClick={() => redirectItem(item.shortUrl)}>irr direto para o link</button> */}
        </ProductBox>
        </>
    )
}

const ProductBox = styled.div`
border: 1px solid black;
margin-bottom: 30px;
display: flex;
flex-direction: row;
    height: 60px;
    border-radius: 12px;
    border: 1px solid rgb(120, 177, 89, 25%);
    box-shadow: rgba(156, 156, 156, 0.2) 0px 7px 29px 0px;
    font-weight: 500;
`

const ItemUrlBox = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: #80CC74;
border-top-left-radius: 12px;
border-bottom-left-radius: 12px;
width: 90%;
padding-left: 10px;
padding-right: 30px;
cursor: pointer;
color: #fff;
font-weight: 500;

`

const ButtonsBox = styled.div`
width: 10%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`

const DeleteIcon = styled.div`
  cursor: pointer;
  margin-right: 30px;

  ion-icon {
    font-size: 26px;
    color: #EA4F4F;
  }
`
const RedirectIcon = styled.div`
  cursor: pointer;

ion-icon {
  font-size: 26px;
  color: #3b53da;
}

`