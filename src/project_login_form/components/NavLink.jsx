import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';

export default function NavLink() {
  return (
    <Container>
      <IconWrapper>
        <div>
          <FaFacebook size={40} />
        </div>
      </IconWrapper>
      <Line />
    </Container>
  );
}

function Icon({ children }) {
  const [isHover, setIsHover] = useState(false);
  const ref = useRef(null);

  return <IconWrapper>{children}</IconWrapper>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  position: fixed;
  bottom: 0;
  left: 2rem;
`;

const IconWrapper = styled.div`
  display: flex;

  position: relative;
`;

const PopoverText = styled.div`
  padding: 8px;

  position: relative;
  &::before {
    content: ' ';
    position: absolute;
  }
`;

const Line = styled.div`
  width: 1px;
  height: 2rem;
`;
