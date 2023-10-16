import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import bscLogo from '../../assets/eth.svg'
import './Token.scss'

const Token = ({id,name, wallet }) => {
    const { store } = useContext(Context)
    return (
        <div className='token'>
            <label className="token-radio-label" id={id} key={id}> 
            <img className='token_logo' src={bscLogo}/>
            <input
                type="radio"
                value={name}
                name="myRadio"
                onClick={(e) => handleOptionChange(price)} 
                className="radio-button"
            />
        </label>
        <a>{name}</a>
        </div>
    );
};

export default observer(Token);