import styled from "styled-components";

export default function RankingNotLogged() {

  return (
    <ContainerLogo>
      <div>Crie uma conta para usar nosso serviço!</div>
    </ContainerLogo>
  );
}

const ContainerLogo = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  font-weight: 600;
  font-size: 30px;
`;
