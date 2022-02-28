import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
// @ts-ignore
import styled from 'styled-components';
import Image from 'next/image';
import { GetStaticProps } from 'next';


export const getStaticPaths = async () => {
  const res = await fetch('https://captain-avocados.vercel.app/api/avocado');
  const productList: TProduct[] = await res.json();
  const paths = productList.map(({ id }) => ({
      params: { id },
    }))
  ;
  return {
    paths,
    //Incremental static generations
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => { // Work with no updatable apis
  const id: string = params?.id as string;
  const res = await fetch(`https://captain-avocados.vercel.app/api/avocado/${id}`);
  const avocado: TProduct = await res.json();
  return {
    props: {
      avocado,
    },
  };
};


const AvoContainer = styled.div`
  user-select: none;
  display: grid;
  grid-template-columns: 1fr 7fr;
  place-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 1.4rem;
  height: 100%;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: justify;
  gap: 1.5rem;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 1.4rem 0.4rem;
    width: 100%;

  }

  & > div:nth-child(1) {
    input {
      padding-left: 0.5rem;
      border: none;
      text-align: center;
      background: none;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
    }

    button {
      padding: 0.2rem;
      border: none;
      outline: none;
    }

    & > div:nth-child(2) button {
      padding: 0.2rem;

      &:nth-child(1) {
        border-radius: 0.5rem 0 0rem 0.5rem;
      }

      &:nth-child(3) {
        border-radius: 0rem 0.5rem 0.5rem 0rem;
      }

      &:hover {
        background-color: #f5f5f5;
      }
    }

    & > div:nth-last-of-type(1) button {
      margin-top: 1rem;
      border: none;
      border-radius: 5px;
      padding: 10px;
      box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.27);
      color: #5f9b5f;

      &:hover {
        transform: translateY(-3px) scale(1.1);
      }
    }
  }

`;

const initialAvo = {
  id: '',
  name: '',
  sku: '',
  price: 0,
  image: '',
  attributes: {
    description: '',
    shape: '',
    hardiness: '',
    taste: '',
  },
};
const Avocado = ({
                   addToCart,
                   avocado,
                 }: { addToCart: (product: TProduct, quantity: number) => void, avocado: TProduct }) => {
  const number: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  function changeItemsQuantity(quantity: number) {
    if (number.current === null) return;
    const parsedNumber: number = parseInt(number.current.value, 10);
    if (parsedNumber <= 0 && quantity < 0) {
      return;
    }
    number.current.value = String(parsedNumber + quantity);
  }

  return (
    <React.Fragment>

      <h1 className='text-center green-light'>{avocado.name}</h1>

      <AvoContainer>
        <div className='avocado-buy'>
          <div>
            {
              avocado.image && (<Image src={avocado.image} alt={avocado.name}
                                       width='150px' height='150px' layout='fixed' />)
            }
          </div>
          <div>
            <button onClick={() => changeItemsQuantity(-1)}>-</button>
            <input min={0} type='number' ref={number} value={number.current ? number.current.value : 0} disabled />
            <button onClick={() => changeItemsQuantity(1)}>+</button>
          </div>

          <div>
            <button onClick={() =>
              number.current === null
                ? addToCart(avocado, 0)
                : addToCart(avocado, parseInt(number.current.value, 10))}
            >Add
              to cart
            </button>
          </div>

        </div>
        <div className='attrs-container'>
          <p><b className='green-light'>Description</b><br />{avocado.attributes.description}</p>
          <p><b className={'green-light'}>Shape</b> {avocado.attributes.shape}</p>
          <p><b className={'green-light'}>Hardiness</b> {avocado.attributes.hardiness}</p>
          <p><b className={'green-light'}>Taste</b> {avocado.attributes.taste}</p>
          <p><b className={'green-light'}>Price</b> ${avocado.price}</p>
          <p><b className={'green-light'}>SKU</b> #{avocado.sku}</p>
        </div>

      </AvoContainer>
      <style jsx>
        {`
          .attrs-container {
            display: flex;
            flex-direction: column;

          }

          .attrs-container > * + *, .avocado-buy > * + * {
            margin-top: 0.4rem;
          }

          .avocado-buy {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .avocado-buy > div {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </React.Fragment>


  )
    ;
};

export default Avocado;
