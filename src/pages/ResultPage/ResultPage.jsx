import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import rootLogo from '../../assets/rootLogo.svg'
import copyButton from '../../assets/copyButton.svg'
import copyButtonClicked from '../../assets/copyButtonClicked.svg'
import './ResultPage.scss'

const ResultPage = () => {
    const { store } = useContext(Context)
    const [copySuccess, setCopySuccess] = useState(false);
    const inputRef = useRef(null);

    const copyToClipboard = (e) => { //Функция отрабатывающая копирования в буфер обмена
        e.preventDefault();

        inputRef.current.select();
        document.execCommand('copy');
        document.getSelection().removeAllRanges();

        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 150);
    };

    return (
        <div className='result_block'>
            <div className='result_elements'>
                <div className='result_header_block'>
                    <div className='result_header_main_block'>
                        <a className='result_header_main_text'>ОФОРМЛЕНИЕ</a>
                        <img src={rootLogo} className='result_header_logo' />
                    </div>
                    <a className='result_header_secondary_text'>
                        <a className='selected'>Спасибо</a> за вашу покупку
                    </a>
                </div>
                <div className='result_input_block'>
                    <a className='result_input_text'>ВАШ ЛИЦЕНЗИОННЫЙ КЛЮЧ</a>
                    <form className='result_key_form'>
                        <input className='result_key_input'
                            id='adr_in'
                            value={store.key}
                            ref={inputRef}
                            readOnly />
                        {!copySuccess ?
                            <img onClick={(e) => copyToClipboard(e)} src={copyButton} className='result_copy_button' />
                            :
                            <img onClick={(e) => copyToClipboard(e)} src={copyButtonClicked} className='checkout_copy_button' />
                        }
                    </form>
                </div>
                <div className='result_instruction_block'>
                    <a className='result_instrulction_main_text'>АКТИВАЦИЯ</a>
                    <div className='result_instrulction_secondary_block'>
                        <a className='result_instrulction_secondary_text'>
                            - Перейдите в <a className='selected' href='https://crypto.cmd-root.com/dashboard'> Дешборд </a>
                            и залогиньтесь с<br /> вашим Discord аккаунтом<br />
                        </a>
                        <a className='result_instrulction_secondary_text'>
                            - Введите ваш ключ: {store.key}<br />
                        </a>
                        <a className='result_instrulction_secondary_text'>
                            - Перейдите в дискорд и вы увидите что были добавлены на сервер
                            <a className='selected'> c:rypto</a><br />
                        </a>
                        <a className='result_instrulction_secondary_text'>
                            - Ознакомьтесь с каналом <a className='selected'>#starting-info</a>,<br />
                            изучайте и наслаждайтесь<br />
                        </a>
                    </div>
                    <a className='result_instrulction_last_text'>
                        Мы также отправили инструкции по активации и ваш лицензионный ключ вам в
                        Telegram боте.
                    </a>
                </div>
            </div>
        </div>
    );
};

export default observer(ResultPage);