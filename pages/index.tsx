import React, { useEffect, useState } from 'react';
import AvocadoSVG from '@components/SVG/Avocado';
import Image from 'next/image';
import Link from 'next/link';

import {
  AvoContainer,
  HeaderContainer,
  HeaderTitle,
  AvoCard,
  AvoDescription,
  AvoFieldContainer,
} from '@components/Index/StyledComponents';


const Home = ({ addToCart }: { addToCart: Function }) => {
  const [avocados, setAvocados] = useState<TProduct[]>([]);
  useEffect(() => {
      window.fetch('api/avocado').then(
        res => res.json(),
      ).then(
        data => setAvocados(data),
      );
    }, [],
  );


  return (
    <React.Fragment>
      <HeaderContainer>
        <HeaderTitle className='green-light'>
          <p> Hello <AvocadoSVG /> <b>Captain</b></p>
        </HeaderTitle>
      </HeaderContainer>
      <AvoContainer>
        {avocados.map((avocado: TProduct) => (
          <Link href={`avocado/${avocado.id}`}>
            <a key={avocado.id}>

              <AvoCard>

                <Image className='no-selection' src={avocado.image} width='100%' height={'100%'} />

                <h2 className='no-selection'>{avocado.name}</h2>
                <AvoDescription>
                  <AvoFieldContainer>
                    <b>Sku</b>
                    <p>#{avocado.sku}</p>
                  </AvoFieldContainer>
                  <AvoFieldContainer>
                    <b>Price</b>
                    <p>${avocado.price}</p>

                  </AvoFieldContainer>
                </AvoDescription>
              </AvoCard> </a>

          </Link>

        ))}
      </AvoContainer>
    </React.Fragment>
  );
};

export default Home;
