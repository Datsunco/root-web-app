import React, { useContext, useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import Token from '../../components/Token/Token';
import './PaymentPage.css'
import copyButton from '../../assets/copyButton.svg'

const PaymentPage = () => {
    const tg = window.Telegram.WebApp;

    const inputRef = useRef(null);
    const { store } = useContext(Context)
    const [address, setAddress] = useState(store?.userToken?.wallet);
    const [copyAddress, setCopyAddress] = useState(store?.userToken?.wallet);
    const [hash, setHash] = useState('')

    const mainButtonClicked = () => {
        navigate('/chekout')
    }

    useEffect(() => {
        
        if (hash != '' && store.userToken != null) {
            tg.MainButton.setParams({text :'Проверить транзакцию', color: '#AA1A17', is_visible: true, is_active: true})
        } else {
            tg.MainButton.setParams({text :'Проверить транзакцию', color: '#151C28', is_visible: true, is_active: false})
        }
        tg.onEvent('mainButtonClicked', mainButtonClicked)
    }, [store, mainButtonClicked])

    

    const copyToClipboard = () => {
        navigator.clipboard.writeText(copyAddress)
        
    };

    const handleInput = (text2) => {
        setCopyAddress(text2)
        const input = document.getElementById('adr_in')

        const textLength = text2.length;
        const quart = Math.floor(textLength / 4);
        const leftText = text2.slice(0, quart);
        const rightText = text2.slice(textLength - quart);
        const newText = leftText + '...' + rightText;
        setAddress(newText);
    };

    return (
        <div className='checkout_block'>
            <div className='checkout_elements'>
                <a className='login_text'>ОФОРМЛЕНИЕ</a>
                <h6 className='main_checkout_text'>Перед оплатой внимательно ознакомьтесь с нашими
                    <a className='selected' href='https://crypto.cmd-root.com/terms'> Условиями </a>и
                    <a className='selected' href='https://crypto.cmd-root.com/payment_instruction'> Инструкцией по оплате </a>
                    <br /><br />
                    Выберите сеть для оплаты
                </h6>
                <div className='chekout_buttons_block'>
                    {store.tokens.map(token =>
                        <Token onSelect={(e) => handleInput(e)} token={token} id={token.id} name={token.chain_name} wallet={token.wallet} />
                    )}
                </div>
                <div className='checkout_inputs_block'>
                    <a className='chekout_input_text'>Отправьте 400 USDT$ или USDC$ на адрес:</a>
                    <form className='checkout_address_form'>
                        <input className='chekout_address_input'
                            id='adr_in'
                            value={address}
                            onChange={handleInput}
                            ref={inputRef}
                            readOnly />
                    <button onClick={() =>copyToClipboard()} className='checkout_copy_button' src={copyButton} />
                    </form>
                    <a className='chekout_input_text' value={hash} onChange={(e) => setHash(e.target.value)}>Ссылка на транзакцию/хеш</a>
                    <input className='chekout_link_input'></input>
                </div>
            </div>
        </div>
    );
};

export default observer(PaymentPage);