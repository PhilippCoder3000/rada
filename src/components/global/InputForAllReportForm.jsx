import React from 'react';
import { useSelector } from 'react-redux';
import { InputForAllReportFormStyle } from '../../styles/global/Input';

export default function InputForAllReportForm (value) {
  const {formsValue} = useSelector(state => state)
  return (
    <InputForAllReportFormStyle
    type="text"
      value={value}
    />
  )
}