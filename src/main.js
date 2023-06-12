import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import dateFilterPlugin from './utils/dateFilter.plugin'
// import currencyFilterPlugin from './utils/currencyFilter.plugin.js[off]'
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged} from 'firebase/auth'
import Loader from './components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

initializeApp({
    apiKey: "AIzaSyAe1xXCRhSKZ4BID28XI73BqHls-iGLpkg",
    authDomain: "vue-crm-cz.firebaseapp.com",
    projectId: "vue-crm-cz",
    storageBucket: "vue-crm-cz.appspot.com",
    messagingSenderId: "82555873365",
    appId: "1:82555873365:web:44786d16862b4327c28cdc",
    measurementId: "G-HZ88CR8SNW"
})

let app

onAuthStateChanged(getAuth(), () => {
    if (!app){
        app = createApp(App)
        .use(store)
        .use(router)
        .use(messagePlugin)
        .use(dateFilterPlugin)
        // .use(currencyFilterPlugin)
        .component('Loader', Loader)
        .mount('#app')
    }
})



