import $api from "../http";
import axios from "axios";

export default class AuthService{

    static async getSubscriptionsPlan(){
        //return $api.get(`/plans/usd-crypto/initial/available`)
        return axios.get('https://crypto.cmd-root.com/api/plans/usd-crypto/initial/available')
        
    }

    static async getPaymentTokens(){
        return $api.get(`/billing/internal/crypto/payment-tokens`)
        
    }

    static async getReferalCode(referal){
        //return $api.get(`https://crypto.cmd-root.com/api/user/referral?referralCode=${referal}`)
        return axios.get(`https://crypto.cmd-root.com/api/user/referral?referralCode=${referal}`)
        
    }

    static async postReservation(email, id, referal){

        return $api.post(`https://crypto.cmd-root.com/api/checkout/generate`, { email, id})
        
    }
}