import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
// @ts-ignore
import styled from 'styled-components';
import Image from 'next/image';

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
  text-align: left;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 1.4rem 0;
    text-wrap: wrap;
    width: 100%;
    > * + * {
      width: 100%;
      margin-top: 1.4rem;
    }
  }


  > * + * {
    width: 100%;
    margin-left: 1.4rem;
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
const Avocado = ({ addToCart }: { addToCart: (product: TProduct, quantity: number) => void }) => {
  const [avocado, setAvocado]: [avocado: TProduct, setAvocado: Function] = React.useState<TProduct>(initialAvo);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
      window.fetch(`/api/avocado/${id}`).then(
        res => res.json(),
      ).then(
        (data: TProduct) => setAvocado(data),
      );
    }, [],
  );
  console.log(avocado);
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
