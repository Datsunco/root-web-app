import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import './LoginPage.scss'
import buttonLogo from '../../assets/button.svg'


const LoginPage = () => {
    const { store } = useContext(Context)
    const [referal, setReferal] = useState('')
    const tg = window.Telegram.WebApp;

    const mainButtonClicked2 = () => {
        console.log(1)
        navigate('/checkout')
    }

    useEffect(() => {

        tg.MainButton.setParams({ text: 'Перейти к оплате +', color: '#AA1A17', is_visible: true, is_active: true })

        tg.onEvent('mainButtonClicked', mainButtonClicked2)
        console.log(2)
    }, [store, mainButtonClicked2])

    const handleClick = () => {
        store.getReferalCode()
        console.log('test')
    }


    return (
            <div className='credentials_block'>
                <a className='login_text'>ОФОРМЛЕНИЕ</a>
                <a className='input_text'> Telegram  <a className='selected'>*</a></a>
                {/* tg.initDataUnsafe.user.id */}
                <input className='telegram_input' placeholder={'dat'} readonly="readonly"></input>
                <a className='input_text'>Реферальный код</a>
                <form className='referal_input'>

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
    );
};

export default observer(LoginPage);