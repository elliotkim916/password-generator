import React, { useState, useRef } from 'react';
import Button from '../Container/Button/Button';
import './Display.css';

const Display = () => {
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
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

          </div>
        </div>
      </div>
    </>
  );
};

export default Display;