import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')



/*
createApp() ==> takes in App object which has setup() method and has mount method which mounts the template 
setup()     ==> has all the setup for the app like functions, variables, watchers etc.
            ==> finally setup method returns functions, refs and computed which is used in template 
*/