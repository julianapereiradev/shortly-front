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
      const numerationArray = Array.from({ length: ranking.length }, (_, index) => index + 1);
      setNumeration(numerationArray);
    }
  }, [ranking]);

  console.log('RANKING AQUI:', ranking)

  return (
    <>
      <div>Ranking Table</div>
      <div>
          {ranking ? ( ranking.map((item, index) => {
            return (
                <div style={{display: 'flex'}} key={item.id}>
               <div>{numeration[index]}</div>
                <div> . {item.name}</div>
                <div> - {item.linksCount} links</div>
                <div> - {item.visitCount} visualizações</div>
                </div>
            )
        })) : (
            <ThreeDots type="ThreeDots" color="#F6E4C4" height={90} width={150} />
          )}
          </div>
    </>
  );
}
