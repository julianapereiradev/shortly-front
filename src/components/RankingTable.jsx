import styled from "styled-components";
import axios from "axios";
import { requisitions } from "../routes/routes";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function RankingTable() {
  const [ranking, setRanking] = useState(undefined);
  const [numeration, setNumeration] = useState([]);

  useEffect(() => {
    axios
      .get(requisitions.getRanking)
      .then((res) => {
        setRanking(res.data);
      })
      .catch((erro) => {
        alert(erro);
        console.log("erro:", erro);
      });
  }, []);

  useEffect(() => {
    if (ranking) {
      const numerationArray = Array.from(
        { length: ranking.length },
        (_, index) => index + 1
      );
      setNumeration(numerationArray);
    }
  }, [ranking]);

  console.log("RANKING AQUI:", ranking);

  return (
    <>
      <RankingContainer>
        {ranking ? (
          ranking.map((item, index) => {
            return (
              <RankingBox key={item.id}>
                <h1><span>{numeration[index]}</span></h1>
                <h1><span>. {item.name}</span></h1>
                <div><span>-</span></div>
                <h1><span>{item.linksCount}</span> links</h1>
                <div><span>-</span></div>
                <h1><span>{item.visitCount}</span> visualizações</h1>
              </RankingBox>
            );
          })
        ) : (
          <ThreeDots type="ThreeDots" color="#F6E4C4" height={90} width={150} />
        )}
      </RankingContainer>
    </>
  );
}

const RankingContainer = styled.div`
  border: 1px solid rgb(120, 177, 89, 25%);
  border-radius: 12px;
  box-shadow: rgba(156, 156, 156, 0.2) 0px 7px 29px 0px;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 30px;
`;

const RankingBox = styled.div`
  display: flex;
  margin: 20px;

  h1 {
    color: #000;
    font-size: 16px;

    span {
      font-weight: 600;
    }
  }

  div {
    margin-left: 5px;
    margin-right: 5px;

    span {
      font-weight: 600;
    }
  }
`;
