
import { getDatabase, ref, push } from "firebase/database";

export default{
    actions:{
        async addCategory({dispatch, commit}, {title, limit}){
            try {
                const uid = await dispatch('getUid')
                const category = await push(ref(getDatabase(), `users/${uid}/categories/${title}`), {
                    limit
                })
                return {title, limit, id: category.key}
            } catch (e){
                commit('setError', e)
                throw e
            }
        }
    }
}