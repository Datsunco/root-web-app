import React, { useContext, useState, useEffect} from 'react';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import './Subscription.scss'

const Subscription = ({ price, period, sale }) => {
    const tg = window.Telegram.WebApp;
    const { store } = useContext(Context)

    const handleOptionChange = (value) => {
        tg.MainButton.setParams({text :'Оформить', color: '#AA1A17', is_visible: true, is_active: true})
        let buts = document.getElementsByClassName('radio-label')
        for(let i=0; i < buts.length; i++) {
            buts[i].style.boxShadow = "4px 4px 1px 1px #151C28";
          }
        //buts.style.boxShadow = '4px 4px 1px 1px #151C28'

        store.setPlan(value)
        
        let but = document.getElementById(`${value}`);
        but.style.boxShadow = '4px 4px 1px 1px #aa1a17';
    };


    return (
        <div>
        <label className="radio-label" id={price} key={price}> 
            <input
                type="radio"
                value={price}
                name="myRadio"
                onClick={(e) => handleOptionChange(price)} 
                className="radio-button"
            />
            <a className='month_text' >{period} месяц</a>
            <div className='line'></div>
            <a className='price_text'>{price} $</a>
            <a className='sale_text'>{sale} %</a>
        </label>
        </div>
    );
};

export default observer(Subscription);