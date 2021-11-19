import React from 'react';
import { useSelector } from 'react-redux';
import MainItem from '../../../components/grid_page/MainItem';
import RowItem from '../../../components/grid_page/RowItem';
import { FirstColumnContainer } from '../../../styles/grid_page';

export default function FirstColumn () {
  const {grid} = useSelector(state => state)
  return (
    <FirstColumnContainer>
      <MainItem/>
      {grid.map((item, index) => <RowItem key={index} item={item}/>)}
    </FirstColumnContainer>
  )
}