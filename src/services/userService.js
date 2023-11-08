import $api from "../http";
import axios from "axios";

export default class AuthService {

    static async getSubscriptionsPlan() {
        //return $api.get(`/plans/usd-crypto/initial/available`)
        return axios.get('https://crypto.cmd-root.com/api/plans/usd-crypto/initial/available')

    }

    static async getPaymentTokens() {
        return $api.get(`/billing/internal/crypto/payment-tokens`)

    }

    static async getReferalCode(referal) {
        //return $api.get(`https://crypto.cmd-root.com/api/user/referral?referralCode=${referal}`)
        return axios.get(`https://crypto.cmd-root.com/api/user/referral?referralCode=${referal}`)

    }

    static async postReservation(email, plan_id, referral_code) {

        return $api.post(`/checkout/generate`, { email, plan_id })
                .then(response => {
                    const cookies = response.headers['set-cookie'];
                    console.log(cookies)
                    // сохраняем значение cookie в localStorage
                    localStorage.setItem('session', cookies);
                })

    }

    static async getChekoutDetails() {

        return $api.get(`/checkout/details`)

    }
}