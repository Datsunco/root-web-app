import { makeAutoObservable } from "mobx";
import userService from "../services/userService";

export default class Store {
    user = {}

    isReferal = true;
    isLoading = false;
    referal = null
    userPlan = null
    userToken = null
    hash = ''
    key = 'HBYSLPPOOI321JKJ'

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

    tokens = [
        {
            "id": 2,
            "chain_name": "SOL",
            "chain_img": null,
            "wallet": "8R3V2yyoSg9PB3jJzVBefkoyp1pneYwKwNdjBcdCf6FJ",
            "explorer": "https://solscan.io/account/",
            "payment_tokens": [
                {
                    "id": "4",
                    "token_name": "USDT",
                    "token_address": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
                    "token_img": null,
                    "chain_id": 2
                },
                {
                    "id": "6",
                    "token_name": "USDC",
                    "token_address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                    "token_img": null,
                    "chain_id": 2
                }
            ]
        },
        {
            "id": 3,
            "chain_name": "BSC",
            "chain_img": null,
            "wallet": "0x137FFb2424A057A5eEa636edbCf71e9b7C090f26",
            "explorer": "https://bscscan.com/tx/",
            "payment_tokens": [
                {
                    "id": "7",
                    "token_name": "USDT",
                    "token_address": "0x55d398326f99059fF775485246999027B3197955",
                    "token_img": null,
                    "chain_id": 3
                },
                {
                    "id": "2",
                    "token_name": "BUSD",
                    "token_address": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
                    "token_img": null,
                    "chain_id": 3
                }
            ]
        },
        {
            "id": 1,
            "chain_name": "ETH",
            "chain_img": null,
            "wallet": "0x137FFb2424A057A5eEa636edbCf71e9b7C090f26",
            "explorer": "https://etherscan.io/tx/",
            "payment_tokens": [
                {
                    "id": "1",
                    "token_name": "USDC",
                    "token_address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                    "token_img": null,
                    "chain_id": 1
                },
                {
                    "id": "3",
                    "token_name": "USDT",
                    "token_address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
                    "token_img": null,
                    "chain_id": 1
                }
            ]
        },
        {
            "id": 4,
            "chain_name": "MATIC",
            "chain_img": null,
            "wallet": "0x137FFb2424A057A5eEa636edbCf71e9b7C090f26",
            "explorer": "https://solscan.io/account/",
            "payment_tokens": [
                {
                    "id": "9",
                    "token_name": "USDC",
                    "token_address": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
                    "token_img": null,
                    "chain_id": 4
                },
                {
                    "id": "8",
                    "token_name": "USDT",
                    "token_address": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
                    "token_img": null,
                    "chain_id": 4
                }
            ]
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

    setIsReferal(bool) {
        this.isReferal = bool;
    }

    setReferal(referal) {
        this.referal = referal;
    }

    setKey(key) {
        this.key = key;
    }

    setHash(hash) {
        this.hash = hash;
    }

    setToken(token){
        this.userToken = token
    }

    setSubscriptionsPlan(plans) {
        this.plans = plans?.data
    }

    setPaymentTokens(tokens){
        this.tokens = this.plans = tokens?.data
    }

    async getReferalCode() {
        this.setLoading(true)
        try {
            const response = await userService.getReferalCode(this.referal);
            if (response.status != 200) {
                this.setIsReferal(false)
            } else {
                this.setIsReferal(true)
            }
            console.log(response);
        } catch (e) {
            this.setIsReferal(false)
            console.log(e.response?.data?.message);
        } finally {
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

    async getPaymentTokens() {
        try {
            const response = await userService.getPaymentTokens();
            this.setPaymentTokens(response)
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async postReservation(email) {
        try {
            console.log(this.userPlan.id)
            const response = await userService.postReservation(String(email), this.userPlan.id, String(this.referal));
            console.log(localStorage.getItem('checkout-uid'))
            localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async getChekoutDetails(email) {
        try {
            const response = await userService.getChekoutDetails(String(email), this.userPlan.id, String(this.referal));
            console.log(response)
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }


}