import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import './LoginPage.scss'

const LoginPage = () => {
    const { store } = useContext(Context)
    const tg = window.Telegram.WebApp;

    useEffect(() => {
        if (store.userPlan != null) {
            tg.MainButton.setParams({text :'Перейти к оплате', color: '#AA1A17', is_visible: true, is_active: true})
        } else {
            tg.MainButton.setParams({text :'Перейти к оплате', color: '#151C28', is_visible: true, is_active: false})
        }
    }, [store])

    return (
        <div>
            <div className='credintials_block'>
                <a className='login_text'>ОФОРМЛЕНИЕ</a>
                <a className='input_text'> Telegram  <a className='selected'>*</a></a>
                <input className='telegram_input' placeholder='datsunkun'></input>
                <a className='input_text'>Реферальный код</a>
                <form>

                    <input className='referal_code' />
                    <button className='referal_code_button'> Проверить</button>
                </form>

            </div>

        </div>
    );
};

export default observer(LoginPage);