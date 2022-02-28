// @ts-ignore
import styled from 'styled-components';

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  width: 90%;
  margin: 0 auto 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 480px) {
    width: 100%;
  }
  text-align: center;

  > ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    > * + * {
      margin-top: 1rem;
    }

    > li {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      place-items: center;
      @media (max-width: 480px) {
        gap: 0;
      }

      > div {
        display: flex;
        justify-content: center;
        align-items: center;

        > button {
          margin: 0.2rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          width: 85%;
          border-radius: 100%;
          transition: transform 0.1s ease-in-out;

          &:hover {
            background: #f5f5f5;
            transform: scale(1.1);
          }

          &:nth-of-type(1) {
            color: #59c738;
          }

          &:nth-child(2) {
            color: rgba(220, 34, 34, 0.89);
          }
        }

      }

    }
  }
`;


