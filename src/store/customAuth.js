import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from "firebase/auth"
import { getDatabase, ref, set } from "firebase/database";



export default{
    actions:{
        async login({dispatch, commit}, {email, password}){
            try {
                await signInWithEmailAndPassword(getAuth(), email, password)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async logout({commit}){
            await signOut(getAuth())
            commit('clearInfo')
        },
        getUid(){
            const user = getAuth().currentUser
            return user ? user.uid : null
        },
        async register({dispatch, commit}, {email, password, name}){
            try {
                await createUserWithEmailAndPassword(getAuth(), email, password)
                // const uid = getAuth().currentUser ? getAuth().currentUser.uid : null
                const uid = await dispatch('getUid')
                await set(ref(getDatabase(), `users/${uid}/info`), {
                    bill: 0,
                    name
                })
           } catch(e) {
                commit('setError', e)
                throw e
           }
        },
    }
}