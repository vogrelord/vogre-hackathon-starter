const Vue = require('vue');
const axios = require('axios');

const vue = new Vue({
    el: '#group-page',
    data:{
        groups: [],
        showForm: false,
        title: ''
    },
    created(){
        axios.get('/api/groups')
        .then(({data})=>{
            this.groups = data;
        });
    },
    methods: {
        submitAddForm(e){
            e.preventDefault();
            axios.post('/api/groups', {title: this.title})
                .then(res=>this.groups.push(res.data));
        },
        del(id){
            if(confirm('Вы уверены? Вернуть группу будет невозможно!')){
                axios.delete('/api/groups/'+id)
                    .then(res=>this.groups=this.groups.filter(g=>g.id!==id));
            };
        }
    }
});


