const Vue = require('vue');
const axios = require('axios');

const vue = new Vue({
    el: '#abon-types',
    data:{
        abon_types: []
    },
    created(){
        axios.get('/api/abonement_types')
        .then(({data})=>{
            this.abon_types = data;
        });
    }
});


