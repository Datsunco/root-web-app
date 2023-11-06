import $api from "../http";

export default class AuthService{

    static async getSubscriptionsPlan(){
        //return $api.get(`/plans/usd-crypto/initial/available`)
        return await axios
            .post('https://crypto.cmd-root.com/api/plans/usd-crypto/initial/available',
            { withCredentials: true }
        )
        
    }

    static async getPaymentTokens(){
        return $api.get(`/billing/internal/crypto/payment-tokens`)
        
    }
    

    static async getReferalCode(referal){
        return $api.get(`https://crypto.cmd-root.com/api/user/referral?referralCode=${referal}`)
        
    }

    
    static async addFavorite(deviceId, typeId){
        try{
            console.log(deviceId, typeId)
        return $api.post('/favorites/add', {deviceId, typeId})
        }catch(e){
            console.log(e)
        }
    }

    static async registration(email, password){
        return $api.post('/user/registration', {email, password})
    }

    static async logout(){
        return $api.post('/user/logout')
    }
}