import React, { useState, useRef } from 'react';
import Button from '../Container/Button/Button';
import Container from '../Container/Container';
import { generatePassword, copyToClipBoard } from '../../utils/Helper';
import Tooltip from '../Container/Tooltip/Tooltip';
import './Display.css';

const Display = () => {
  const [rangeValue, setRange] = useState();
  const [passwordProps, setPasswordProps] = useState();
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [tooltip, setTooltip] = useState(false);
  let pwdDescription = '';

  const setBackgroundColor = password => {
    if (password && password.length === 1 && password.length <= 5) {
      pwdDescription = 'Bad password';
      return '#cb473e';
    } else if (password && password.length >= 6 && password.length <= 10) {
      pwdDescription = 'Weak password';
      return '#f07d58';
    } else if (password && password.length > 10) {
      pwdDescription = 'Strong password';
      return '#55a95d';
    } else {
      pwdDescription = 'Bad password';
      return '#cb473e';
    }
  };

  const generateNewPassword = () => {
    const pwd = rangeValue > 3 ? generatePassword(passwordProps, rangeValue) : generatePassword(passwordProps, 3);
    setPassword(pwd);
  };

  const copyClipboard = () => {
    copyToClipBoard(passwordRef.current);
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 2000);
  };
  
  return (
    <>
      <div className="row">
        <div className="col-12 password-display-container" style={{ backgroundColor: setBackgroundColor(password) }}>
          <div>
            <div className="password-display">
              <input 
                type="text" 
                className="password-display-input" 
                ref={passwordRef} 
                value={password} // password is displayed in the read-only input field
                readOnly 
              />
            </div>
            <div className="password-description">
              {
                password && password.length > 10 ?
                <>
                  <i className="fas fa-check-circle"></i> {pwdDescription}
                </> :
                <>
                  <i className="fas fa-exclamation-circle"></i> {pwdDescription}
                </>
              }
            </div>
          </div>
          <div className="password-display-icons">
            <Button 
              className="copy-btn"
              iconClass="far fa-copy"
              handleClick={copyClipboard}
            />
            <Button 
              className="generate-btn"
              iconClass="fas fa-sync-alt"
              handleClick={generateNewPassword}
            />
            <Tooltip 
              message="Copied"
              position="left"
              displayTooltip={tooltip}
            />
          </div>
        </div>
      </div>
      <Container 
        setPassword={setPassword}
        setRange={setRange}
        setPasswordProps={setPasswordProps}
      />
    </>
  );
};

export default Display;