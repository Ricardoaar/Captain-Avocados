import React from 'react';
// @ts-ignore
import styled from 'styled-components';
import Link from 'next/link';

const StyledFooter = styled.footer`
  background-color: rgba(119, 217, 84, 0.33);
  text-align: center;
  font-size: 0.8rem;

  padding: 1rem 0;
  color: #666;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  box-sizing: border-box;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Link href='https://github.com/captainrun'>
        <a target='_blank'> Created by
          <b className='green-light'>@captainrun</b>
        </a>
      </Link>
    </StyledFooter>
  );
};

export default Footer;
