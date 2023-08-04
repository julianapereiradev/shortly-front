import styled from "styled-components";
import rankinglogo from "../images/rankinglogo.jpeg";

export default function RankingLogo() {

  return (
    <ContainerLogo>
      <img src={rankinglogo} />
    </ContainerLogo>
  );
}

const ContainerLogo = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;

  img {
    width: 220px;
  }
`;
