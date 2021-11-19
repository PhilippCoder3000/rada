import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleOneCheckbox } from '../../app/store/grid';
import { RowItemContainer } from '../../styles/grid_page';
import Button from '../global/Button';
import Checkbox from '../global/InputCheckbox';
import BurgerMenu from './BurgerMenu';

export default function RowItem ({item}) {
  const dispatch = useDispatch()
  const [showBurgerMenu, setShowBurgerMenu] = useState(false)
  const setChanges = () => {
    dispatch(toggleOneCheckbox(item.checkedId))
  }
  const clickShowBurgerMenu = () => {
    setShowBurgerMenu(!showBurgerMenu)
  }
  return (
    <RowItemContainer>
      <Checkbox format="only-checkbox-input" checked={item.checked} setChanges={setChanges} />
      <Button format='first-column-item' onClick={clickShowBurgerMenu} />
      <BurgerMenu show={showBurgerMenu} setShow={setShowBurgerMenu} item={item}/>
    </RowItemContainer>
  )
}