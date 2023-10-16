import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import Token from '../../components/Token/Token';
import './PaymentPage.css'

const PaymentPage = () => {
    const { store } = useContext(Context)
    return (
        <div className='checkout_block'>
            <div className='checkout_elements'>
                <a className='login_text'>ОФОРМЛЕНИЕ</a>
                <h6 className='main_checkout_text'>Перед оплатой внимательно ознакомьтесь с нашими
                    <a className='selected' href='https://crypto.cmd-root.com/terms'> Условиями </a>и
                    <a className='selected' href='https://crypto.cmd-root.com/payment_instruction'> Инструкцией по оплате </a>
                    <br/><br/>
                    Выберите сеть для оплаты
                </h6>
                <div className='chekout_buttons_block'>
                    {store.tokens.map(token => 
                        <Token id={token.id} name={token.chain_name} wallet={token.wallet}/>                   
                    )}
                </div>
                <div className='checkout_inputs_block'>
                    <a className='chekout_input_text'>Отправьте 400 USDT$ или USDC$ на адрес:</a>
                    <input className='chekout_address_input'></input>
                    <a className='chekout_input_text'>Ссылка на транзакцию/хеш</a>
                    <input className='chekout_link_input'></input>
                </div>
            </div>
        </div>
    );
};

export default observer(PaymentPage);