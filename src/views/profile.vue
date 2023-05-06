<script>
import hearder from '../components/hearder.vue';
export default{
    data(){
        return{
            infouser:{}
        }
    },
    components:{
        hearder
    },
    methods:{
        getuser(){
            this.infouser = JSON.parse(localStorage.getItem('infouser'));
        }
    },
    mounted(){
        this.getuser();
    }
}
</script>
<template>
    <hearder></hearder>
    <div class="container">
        <h6 class="text-center">Thông tin của bạn</h6>
        <div class="info">
            <p>Tên người dùng : {{ infouser.firstname }} {{ infouser.lastname }}</p>
            <p>Email : {{ infouser.email }}</p>
            <p>Số điện thoại : {{ infouser.mobile }}</p>
        </div>
        <router-link to="/" class="btn btn-primary">Trở về</router-link>
    </div>
</template>
<style scoped>
    .info p:first-child{
        text-transform: capitalize;
    }
</style>