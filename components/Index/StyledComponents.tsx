// @ts-ignore
import styled from 'styled-components';

export const AvoDescription = styled.div`
  border-top: 1px solid #888585;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  text-align: left;
`;

export const AvoFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;


  position: relative;
  z-index: 1;
`;

export const AvoContainer = styled.div`
{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  width: 80%;
  row-gap: 2rem;
  column-gap: 2rem;
  margin: 0 auto 2rem;
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

}
`;

export const AvoCard = styled.div`{
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  &:hover {
    box-shadow: 0 0 10px 8px rgba(69, 199, 121, 0.61);
    cursor: pointer;
  }

}`;

export const HeaderTitle = styled.h1`

  margin-bottom: 1rem;

  > p {
    display: flex;
    align-items: center;
    font-size: 2.5rem;
    font-weight: bold;
    @media (max-width: 370px) {
      flex-direction: column;
    }
  }

`;
