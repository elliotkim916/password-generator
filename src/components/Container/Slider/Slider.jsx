import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './Slider.css';

const Slider = (props) => {
  const { step, min, max, value, defaultLength, onChangeValue } = props;
  const [range, setRange] = useState();
  const rangeRef = useRef();

  const activeRangeColor = '#4aa1f3';
  const rangeBackground = '#d7dcdf';

  const handleChange = maxNum => e => {
    onChangeValue(e);
    setRange(e.target.value);
    const progress = (value / maxNum ) * 100 + '%';
    const newBackgroundStyle =`linear-gradient(90deg, ${activeRangeColor} 0% ${progress}, ${rangeBackground} ${progress} 100%)`;
    rangeRef.current.style.background = newBackgroundStyle;
  }
  
  if (range !== defaultLength || !range) {
    setRange(defaultLength);
  }
  
  const progress = (range / max) * 100 + '%';
  // console.log('progress', progress);
  // console.log('range', range);
  const styleInput = {
    background: `linear-gradient(90deg, ${activeRangeColor} 0% ${progress}, ${rangeBackground} ${progress} 100%)`
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <input
          style={styleInput}
          ref={rangeRef} 
          className="range-slider"
          type="range"
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={handleChange(max)}
        />
        <span className="range-slider-value">100</span>
      </div>
    </div>
  );
};

Slider.propTypes = {
  step: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultLength: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired
};

export default Slider;