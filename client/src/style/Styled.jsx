import React from 'react';
import styled from 'styled-components';

// page container is a grid
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
`;

// establish all other containers as flexboxes
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  align-content: space-around;
  gap: 1em;
`;

// intended for use with username, password, pick choice text boxes
export const Input = styled.input`
  color: rgb(41, 41, 41);
  border-radius: 4px;
  margin-left: 1em;
`;

// all buttons extend this
export const Button = styled.button`
  background-color: ${props => props.color || 'rgb(114, 33, 33)'};
  border: 1px solid darkgrey;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  &:hover {
    cursor: pointer;
    border: 1px solid grey;
  }
`;

// Intended for use with sprite container, timer box, pick choice details
export const ContextBox = styled.div``;
