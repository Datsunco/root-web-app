import { makeAutoObservable } from "mobx";
import userService from "../services/userService";

export default class Store {
    user = {}

    isReferal = true;
    isLoading = false;
    referal = null
    userPlan = null
    
    plans = [
        {
            "id": 1,
            "period": 1,
            "price": 70.00,
            "sale_percent": 0,
            "price_without_sale": 70
        },
        {
            "id": 4,
            "period": 12,
            "price": 630.00,
            "sale_percent": -25,
            "price_without_sale": 840
        },
        {
            "id": 3,
            "period": 6,
            "price": 350.00,
            "sale_percent": -17,
            "price_without_sale": 420
        },
        {
            "id": 2,
            "period": 3,
            "price": 190.00,
            "sale_percent": -10,
            "price_without_sale": 210
        }
    ]

    constructor() {
        makeAutoObservable(this);
    }


    setPlan(price) {
        this.userPlan = price;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setReferal(bool) {
        this.isReferal = bool;
    }

    setSubscriptionsPlan(plans){
        this.plans = devices?.data?.result?.dataList
    }



    

    async getReferalCode(referal) {
        this.setLoading(true)
        try {
            const response = await userService.getReferalCode(referal);
            if (response.status != 200){
                this.setReferal(false)
            } else {
                this.setReferal(true)
            }
        } catch (e) {
            this.setReferal(false)
            console.log(e.response?.data?.message);
        } finally{
            this.setLoading(false)
        }
    }

    async getSubscriptionsPlan() {
        try {
            const response = await userService.getSubscriptionsPlan();
            this.setSubscriptionsPlan(response)
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async parse(catalogId){
        try{
            const response = await ProxyService.parse(catalogId);
            console.log(response?.data?.result?.dataList)
            this.setDevices(response)
        } catch(e){
            console.log(e);
            console.log(e.response?.data?.message);

        }finally{
            this.setParsed(true)
        }
    }

}