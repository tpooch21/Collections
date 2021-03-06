// Modal file is rendered from app, but will only be displayed if the current state of App says to display it
// Will render an image gallery, description box, and restaurant list
// Style it as a big box, darkened background
// Overflow: auto (will scroll down for list)
// Can be functional stateless
// Will get passed a click handler from app that handles opening and closing it
// Image gallery will show 4 images, and one blurred out image in the bottom right that has the number of restaurants in the collection


// First let's just make a big box that shows up when it's told to by state

import React from 'react';
import styled from 'styled-components';
import {ModalGallery} from './ModalGallery.jsx';
import ModalDescriptionBox from './ModalDescriptionBox.jsx';
import ModalRestaurantList from './ModalRestaurantList.jsx';
import {Close} from '@styled-icons/material/Close';

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  position: fixed;
  justify-content: center;
  flex-direction: column;
`;

const ModalBox = styled.div`
  width: 720px;
  height: 750px;
  align-self: center;
  background-color: #fff;
  border-radius: 5px;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  display: block;
`;

const CloseContainer = styled.p`
  width: 720px;
  line-height: 20px;
  align-self: center;
  display: flex;
  justify-content: flex-end;
  margin: 0;
`;

const CloseButton = styled.a`
  width: 720px;
  line-height: 20px;
  font-weight: 400;
  font-size: 14px;
  text-align: right;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  color: white;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CloseIcon = styled(Close)`
  height: 24px;
  width: 24px;
  cursor: pointer;
`;

const Modal = (props) => (
    <ModalContainer>
      <CloseContainer>
        <CloseButton onClick={props.close}>
          Close
          <CloseIcon></CloseIcon>
        </CloseButton>
      </CloseContainer>
      <ModalBox>
        <ModalGallery collection={props.state.currentCollection}/>
        <ModalDescriptionBox collection={props.state.currentCollection}/>
        <ModalRestaurantList state={props.state}/>
      </ModalBox>
    </ModalContainer>
);

export default Modal;