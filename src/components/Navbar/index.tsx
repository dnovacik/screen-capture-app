/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import Styled from 'styled-components'

const { minimize, close } = window.ipcRenderer.window

export default () => {
  return (
    <Navbar.Wrapper>
      <Navbar.Draggable />
      <Navbar.Left></Navbar.Left>
      <Navbar.Right>
        <Navbar.ButtonWrapper onClick={() => minimize()}>
          <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg"
            x="0px" y="0px" viewBox="0 0 14 2" width="15px" height="20px">
            <line fill="none" stroke="#F6F2EB" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" x1="1" y1="1" x2="13" y2="1" />
          </svg>
        </Navbar.ButtonWrapper>
        <Navbar.ButtonWrapper onClick={() => close()}>
          <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg"
            x="0px" y="0px" viewBox="0 0 12.6 12.6" height="15px">
            <line fill="none" stroke="#F6F2EB" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" x1="1" y1="1" x2="11.6" y2="11.6" />
            <line fill="none" stroke="#F6F2EB" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" x1="11.6" y1="1" x2="1" y2="11.6" />
          </svg>
        </Navbar.ButtonWrapper>
      </Navbar.Right>
    </Navbar.Wrapper>
  )
}

const Navbar = {
  Wrapper: Styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  Draggable: Styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    -webkit-app-region: drag;
  `,
  Left: Styled.div`
    display: flex;
    -webkit-app-region: no-drag;
    display: flex;
    margin: 10px;
    z-index: 1;
  `,
  Right: Styled.div`
    display: flex;
    -webkit-app-region: no-drag;
    display: flex;
    margin: 10px 10px 0 0;
    z-index: 1;
  `,
  ButtonWrapper: Styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: 15px;

    &:hover {
      & > svg > line {
        stroke: ${props => props.theme.colors.dark['shade-1']};
      }
    }
  `
}
