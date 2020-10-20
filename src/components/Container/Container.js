import React, { useState } from 'react';
import Slider from './Slider/Slider';
import Checkbox from './Checkbox/Checkbox';
import { generatePassword, setPasswordLength } from '../../utils/Helper';
import './Container.css';

const Container = (props) => {
  const [rangeValue, setRangeValue] = useState(12);
  const [minMaxValue, setMinMaxValue] = useState({
    min: 1,
    max: 60
  });
  const { min, max } = minMaxValue;
  const [checkbox, setCheckbox] = useState({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true
  });
  const [checked, setChecked] = useState(false);
  const [checkedName, setCheckedName] = useState('');
  const { uppercase, lowercase, symbols, numbers } = checkbox;

  const { setPassword, setRange, setPasswordProps } = props;

  const passwordGenerated = (checkbox, rangeValue) => {
    const pwd = rangeValue > 3 ? generatePassword(checkbox, rangeValue) : generatePassword(checkbox, 3);
    setPassword(pwd);
    setPasswordProps(checkbox);
  }

  const onChangeCheckbox = e => {};

  const onChangeSlider = e => {
    console.log('container val', e.target.value);
    setRangeValue(e.target.value);
    setPasswordLength(e.target.value);
    setRange(e.target.value);
    passwordGenerated(checkbox, e.target.value);
  };

  const CHECKBOX_LIST = [
    {
      id: 0,
      name: 'uppercase',
      label: 'Uppercase',
      isChecked: true
    },
    {
      id: 1,
      name: 'lowercase',
      label: 'Lowercase',
      isChecked: true
    },
    {
      id: 2,
      name: 'symbols',
      label: 'Symbols',
      isChecked: true
    },
    {
      id: 3,
      name: 'numbers',
      label: 'Numbers',
      isChecked: true
    }
  ];

  return (
    <div className="password-settings">
      <h3 className="h3"> Use the slider, and select from the options.</h3>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <Slider 
              min={parseInt(min, 10)}
              max={parseInt(max, 10)}
              step={1}
              defaultLength={parseInt(rangeValue, 10)}
              value={parseInt(rangeValue, 10)}
              onChangeValue={onChangeSlider}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="row checkbox-container">
            {
              CHECKBOX_LIST.map(checkbox => 
                <Checkbox 
                  key={checkbox.id}
                  name={checkbox.name}
                  checked={checkbox.isChecked}
                  label={checkbox.label}
                  value={checkbox.isChecked}
                  onChange={onChangeCheckbox}
                  disabled={
                    checked && checkbox.isChecked && checkedName === checkbox.name
                  }
                />  
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;