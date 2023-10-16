import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import './LoginPage.scss'
import buttonLogo from '../../assets/button.svg'


const LoginPage = () => {
    const { store } = useContext(Context)
    const tg = window.Telegram.WebApp;

    useEffect(() => {
        if (store.userPlan != null) {
            tg.MainButton.setParams({ text: 'Перейти к оплате', color: '#AA1A17', is_visible: true, is_active: true })
        } else {
            tg.MainButton.setParams({ text: 'Перейти к оплате', color: '#151C28', is_visible: true, is_active: false })
        }
    }, [store])

    const handleClick = () => {
        store.getReferalCode(referal)
    }

    return (
        <div>
            <div className='credintials_block'>
                <a className='login_text'>ОФОРМЛЕНИЕ</a>
                <a className='input_text'> Telegram  <a className='selected'>*</a></a>
                <input className='telegram_input' placeholder={tg.initDataUnsafe.user.id} readonly="readonly"></input>
                <a className='input_text'>Реферальный код</a>
                <form>

                    {store.isReferal ? 
                        <input
                        className='referal_code'
                        onChange={(e) => store.setReferal(e.target.value)}
                        value={store.referal} />
                        :
                        <input
                        className='referal_code_wrong'
                        onChange={(e) => store.setReferal(e.target.value)}
                        value={store.referal} />
                    }
                    {!store.isLoading ?
                        <button className='referal_code_button' onClick={() => handleClick()}> Проверить</button>
                        : <img src={buttonLogo}/>
                    }
                </form>

            </div>

        </div>
    );
};

export default observer(LoginPage);