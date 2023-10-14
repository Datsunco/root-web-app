import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header/Header';
import Subscription from '../../components/SubscriptionPlan/Subscription';
import './MainPages.scss'

const MainPage = () => {
    const { store } = useContext(Context)
    const tg = window.Telegram.WebApp;

    useEffect(() => {
        // if (localStorage.getItem('token')) {
        //     store.checkAuth()
        //     favorites.getFavorites()
        //     cart.getDevices()
        // }

        //store.getSubscriptionsPlan()

        tg.MainButton.setParams({text :'Оформить', color: '#AA1A17', is_visible: true, is_active: false})
        if (store.userPlan != null) {
            tg.MainButton.enable()
        } else {
            tg.MainButton.disable()
        }
    }, [store])

    return (
        <div className='mainPage'>
            <h6 className='main_text'>Информация по NFT на ETH и прочих актуальных блокчейнах, эксклюзивные предложения от партнеров,
                актуальный разбор и гайды по ретродропам, коллы на фьючерсы.<br /><br />
                Входящий в стоимость подписки набор тулзов и полная поддержка - все это вы найдете <a className='selected'>в c:rypto </a></h6>
            <h3 className='main_choose_text'>ВЫБЕРИТЕ ПЛАН <a className='selected'>ПОДПИСКИ </a></h3>
            <div className='subscription_plans_block'>
                {store.plans.map(plan =>
                    <Subscription price={plan.price} period={plan.period} sale={plan.sale_percent} />
                )}
            </div>

        </div>
    );
};

export default observer(MainPage);