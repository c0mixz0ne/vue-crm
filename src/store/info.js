import { getDatabase, ref, onValue} from "firebase/database";

export default {
    state: {
        info: {}
    },
    actions: {
        async fetchInfo({dispatch, commit}){
            try {
                const uid = await dispatch('getUid');
                const starCountRef = ref(getDatabase(), `users/${uid}/info`);
                onValue(starCountRef, (snapshot) => {
                    const info = snapshot.val();
                    commit('setInfo', info);
                });
            }
            catch(e) {}
        }
    },
    getters: {
        info: s => s.info
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state){
            state.info = {}
        }
    }
}