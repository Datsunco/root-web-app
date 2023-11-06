import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header/Header';
import Subscription from '../../components/SubscriptionPlan/Subscription';
import './MainPages.scss'

const MainPage = () => {
    const { store } = useContext(Context)
    
    const navigate = useNavigate();
    const tg = window.Telegram.WebApp;

    const mainButtonClicked = () => {
        navigate('/login')
    }


    useEffect(() => {
        // if (localStorage.getItem('token')) {
        //     store.checkAuth()
        //     favorites.getFavorites()
        //     cart.getDevices()
        // }

        store.getSubscriptionsPlan()


        if (store.userPlan != null) {
            tg.MainButton.setParams({ text: 'Оформить', color: '#AA1A17', is_visible: true, is_active: true })
        } else {
            tg.MainButton.setParams({ text: 'Оформить', color: '#151C28', is_visible: true, is_active: false })
        }
        tg.onEvent('mainButtonClicked', mainButtonClicked)
        return () => {
            tg.offEvent('mainButtonClicked', mainButtonClicked)
        }
    }, [mainButtonClicked])

    return (
        <div className='mainPage'>
            <h6 className='main_text'>Информация по NFT на ETH и прочих актуальных блокчейнах, эксклюзивные предложения от партнеров,
                актуальный разбор и гайды по ретродропам, коллы на фьючерсы.<br /><br />
                Входящий в стоимость подписки набор тулзов и полная поддержка - все это вы найдете <a className='selected'>в c:rypto </a></h6>
            <h3 className='main_choose_text'>ВЫБЕРИТЕ ПЛАН <a className='selected'>ПОДПИСКИ </a></h3>
            <div className='subscription_plans_block'>
                {store.plans.map(plan =>
                    <Subscription plan={plan} price={plan.price} priceWithoutSale={plan.price_without_sale} period={plan.period} sale={plan.sale_percent} />
                )}
            </div>
            <div className='instruct'>
                    Перед покупкой убедитесь что вы прочитали<br />
                    <a className='selected' href='https://crypto.cmd-root.com/terms'>пользовательское соглащение</a> и
                    <a className='selected' href='https://crypto.cmd-root.com/payment_instruction'> инструкцию по оплате</a>
            </div>
        </div>
    );
};

export default observer(MainPage);