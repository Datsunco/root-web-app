import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import Token from '../../components/Token/Token';
import Copy from '../../components/SuccessCopyMessage/Copy';
import copyButton from '../../assets/copyButton.svg'
import copyButtonClicked from '../../assets/copyButtonClicked.svg'
import './PaymentPage.css'

const PaymentPage = () => {
    const tg = window.Telegram.WebApp;
    const navigate = useNavigate();

    const inputRef = useRef(null);
    const { store } = useContext(Context)

    const [time, setTime] = useState(15 * 60);
    const [address, setAddress] = useState(store?.userToken?.wallet);
    const [copyAddress, setCopyAddress] = useState(store?.userToken?.wallet);
    const [copySuccess, setCopySuccess] = useState(false);

    const mainButtonClicked = () => {
        tg.MainButton.hide()
        navigate('/result')
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    useEffect(() => {
        store.getPaymentTokens()
        store.getChekoutDetails()
    }, [])

    useEffect(() => {
        
        const countdown = setInterval(() => {
            if (time > 0) {
                setTime(time - 1);
            } else {
                clearInterval(countdown);
                // Действие, которое нужно выполнить после завершения таймера
            }
        }, 1000); // Обновление каждую секунду

        if (store.hash != '' && store.userToken != null) {
            console.log(store.hash)
            tg.MainButton.setParams({ text: 'Проверить транзакцию', color: '#AA1A17', is_visible: true, is_active: true })
        } else {
            tg.MainButton.setParams({ text: 'Проверить транзакцию', color: '#151C28', is_visible: true, is_active: false })
        }

        tg.onEvent('mainButtonClicked', mainButtonClicked)
        return () => {
            tg.offEvent('mainButtonClicked', mainButtonClicked)
            clearInterval(countdown);
        }
    }, [store, mainButtonClicked, time])


    const copyToClipboard = (e) => { //Функция отрабатывающая копирования в буфер обмена
        e.preventDefault();
        // navigator.clipboard.writeText(copyAddress)
        inputRef.current.select();
        document.execCommand('copy');
        document.getSelection().removeAllRanges();

        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 150);
    };

    const handleInput = (text2) => { //Функция отвечающая за обрбаботку адреса кошелька
        setCopyAddress(text2)        //(сокращет ее пополам и ставит в середине ...)
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
                <div className='checkout_header_block'>
                    <a className='checkout_header_text'>ОФОРМЛЕНИЕ</a>
                    <a className='checkout_header_timer'>{formatTime(time)}</a>
                </div>
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
                    <a className='chekout_input_text'>Отправьте <a className='selected'>{store.userPlan.price} USDT$</a> или <a className='selected'>USDC$</a> на адрес:</a>
                    <form className='checkout_address_form'>
                        <input className='chekout_address_input'
                            id='adr_in'
                            value={address}
                            onChange={handleInput}
                            readOnly />
                        {copyAddress != null ?
                            !copySuccess ?
                                <img onClick={(e) => copyToClipboard(e)} src={copyButton} className='checkout_copy_button' />
                                :
                                <img onClick={(e) => copyToClipboard(e)} src={copyButtonClicked} className='checkout_copy_button' />
                            :
                            null}
                    </form>
                    <a className='chekout_input_hash_text' >Ссылка на транзакцию/хеш</a>
                    <input className='chekout_link_input' value={store.hash} onChange={(e) => store.setHash(e.target.value)}></input>
                </div>
            </div>
            <input className='hidden_input' ref={inputRef} value={copyAddress}></input>
            {/* {copySuccess ? //Высплывающая надпись о копировании в буфер
                <Copy />
                :
                null
            } */}
        </div>
    );
};

export default observer(PaymentPage);