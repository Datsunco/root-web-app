import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import bscLogo from '../../assets/bsc.svg'
import solLogo from '../../assets/sol.svg'
import ethLogo from '../../assets/eth.svg'
import maticLogo from '../../assets/matic.svg'
import copyButton from '../../assets/copyButton.svg'

import './Token.scss'

const Token = ({onSelect, token, id, name, wallet}) => {
    const hashTable = {
        3: bscLogo,
        2: solLogo,
        1: ethLogo,
        4: maticLogo
    }
    const { store } = useContext(Context)

    const handleOptionChange = (id) => {
        onSelect(wallet)
        // tg.MainButton.setParams({text :'Оформить', color: '#AA1A17', is_visible: true, is_active: true})
        let buts = document.getElementsByClassName('token-radio-label')
        for(let i=0; i < buts.length; i++) {
            buts[i].style.boxShadow = "4px 4px 1px 1px #151C28";
          }

        store.setToken(token)
        
        let but = document.getElementById(`${id}`);
        but.style.boxShadow = '4px 4px 1px 1px #aa1a17';
    };

    return (
        <div className='token'>
            <label className="token-radio-label" id={id} key={id}> 
            <img className='token_logo' src={hashTable[id]}/>
            <input
                type="radio"
                value={name}
                name="myRadio"
                onClick={(e) => handleOptionChange(id)} 
                className="radio-button"
            />
        </label>
        <a>{name}</a>
        </div>
    );
};

export default observer(Token);