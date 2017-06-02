
'use strict';

// add vue
const Vue = require('vue');

Vue.component('form-login', require('../../js/vue-components/FormLogin.vue'));
new Vue({
    el: '#app',
    data: {
    	message: 'testing' 	
    }
});