<script>
export default {
    data() {
        return {
            infouser: {},
            checklogin: false
        }
    },
    methods: {
        getinfo() {
            this.infouser = JSON.parse(localStorage.getItem('infouser'));
            if(this.infouser){
                this.checklogin = true;
            }else{
                this.checklogin = false;
            }
        },
        logout(){
            this.checklogin = false;
            localStorage.removeItem('infouser');
            sessionStorage.removeItem('IdOrder');
            sessionStorage.removeItem('idUser');
            this.$router.push('/login');
        }
    },
    mounted() {
        this.getinfo();
        if(!this.checklogin){
            this.$router.push('/login');
        }
    }
}
</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse wapper-nav" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="fa-solid fa-bell"></i></a>
                </li>
                <li class="nav-item dropdown">
                    <a v-if="!checklogin" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-user"></i>
                    </a>
                    <a v-else class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" style="text-transform: capitalize;">
                        {{ infouser.firstname }}
                    </a>
                    <div v-if="checklogin" class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link class="dropdown-item" to="/profile">Trang Cá Nhân</router-link >
                        <span class="dropdown-item" @click="logout()">Đăng xuất</span>
                    </div>
                    <div v-else class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/login">Đăng nhập</a>
                        <a class="dropdown-item" href="/signup">Đăng ký</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>
<style scoped>
.wapper-nav {
    justify-content: end;
    margin-right: 150px;
}
</style>