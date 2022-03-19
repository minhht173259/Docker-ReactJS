import React from 'react';
import styled from 'styled-components';
import { CgSun } from 'react-icons/cg';
import { HiMoon } from 'react-icons/hi';
import { useModeLight } from '../context/light';
import Text from '../common/Text';
import NavLink from './NavLink';

const Toggle = styled.button`
  cursor: pointer;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.theme.titleColor};
  color: ${props => props.theme.pageBackground};
  &:focus {
    outline: none;
  }
  transition: all 0.5s ease;

  position: fixed;
  top: 16px;
  right: 16px;
`;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.pageBackground};
  transition: all 0.5s ease;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.titleColor};
  transition: all 0.5s ease;
  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

const TagLine = styled.span`
  color: ${props => props.theme.tagLineColor};
  font-size: 18px;
  transition: all 0.5s ease;

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: red;
  border-radius: 50%;
  transition: all 0.5s ease;

  @media (max-width: 600px) {
    height: 150px;
    width: 150px;
  }
`;

const InfomationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  margin-top: 30px;
`;

const Line = styled.div`
  width: 1px;
  height: 20rem;
  background-color: red;
  margin-left: 50px;
  margin-right: 50px;
`;

const CellContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* width: 30%; */
`;

const LoginButton = styled.button`
  width: 150px;
  height: 1.5rem;
  text-align: center;
  background-color: transparent;
  border-radius: 5px;
  border-width: 1px;
  border-color: 'red';

  margin-top: 30px;
  align-self: center;
`;

function Portfolio() {
  const lightMode = useModeLight();

  const icon = lightMode.mode === 'light' ? <HiMoon size={40} /> : <CgSun size={40} />;

  return (
    <Page>
      <Toggle onClick={lightMode.changeLightMode}>{icon}</Toggle>
      <Container>
        <ImageContainer />
        <Title>Hoàng Trọng Minh</Title>
        <TagLine>I'm developer fullstack. Welcome to my portfolio !!!</TagLine>
        <InfomationContainer>
          <CellContainer>
            <Text large heavy>
              Trình độ học vấn
            </Text>
            <Text medium light>
              Đại học bách khoa Hà Nội
            </Text>
            <Text medium light>
              [2017 - Nay]
            </Text>

            <LoginButton>Đăng nhập</LoginButton>
          </CellContainer>
          <Line />
          <CellContainer>
            <Text large heavy>
              Thông tin liên hệ
            </Text>
          </CellContainer>
        </InfomationContainer>
      </Container>
      <NavLink />
    </Page>
  );
}

export default Portfolio;
