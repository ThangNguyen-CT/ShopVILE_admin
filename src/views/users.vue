<script>
import leftPage from '../components/left-page.vue';
import UserService from '../services/User.service';
import loading from '../components/loading.vue';
import hearder from '../components/hearder.vue';
import router from '../router';
export default {
    data() {
        return {
            isLoad: false,
            dataUsers: [],
            toast: '',
            checkadmin:false,
        }
    },
    components: {
        leftPage,
        loading,
        hearder,
        router
    },
    computed: {
        getEmail() {
            return JSON.parse(localStorage.getItem('infouser')).email;
        }
    },
    methods: {
        async getdataUser() {
            try {
                this.isLoad = true;
                this.dataUsers = await UserService.getallUser();
                this.checkadmin = true;
                if (this.dataUsers.length == 0) {
                    this.toast = 'Chưa có người dùng nào';
                }
                this.isLoad = false;
            } catch (error) {
                console.log(error);
                this.toast = 'Bạn chưa có quyền để quản lý người dùng';
                this.isLoad = false;
                this.checkadmin = false;
            }
        },
        editUser(id) {
            sessionStorage.setItem('idUser', id);
            this.$router.push('/edituser');
        },
        async deluser(id) {
            try {
                this.isLoad = true;
                if (confirm("Bạn có chắc chắn xóa người dùng này !")) {
                    await UserService.deletel(id);
                    this.getdataUser();
                    this.isLoad = false;
                } else {
                    this.isLoad = false;
                }
            } catch (error) {
                console.log(error);
            }
        },
        gotologin(){
            this.$router.push('/login');
            localStorage.removeItem('infouser');
        }
    },
    mounted() {
        this.getdataUser();
    }
};
</script>
<template>
    <loading v-if="isLoad"></loading>
    <hearder></hearder>
    <div class="wrapper d-flex">
        <leftPage></leftPage>
        <div class="users">
            <h5 class="text-center">Danh sách người dùng</h5>
            <div class="wrapper-list">
                <ul class="info">
                    <li>STT</li>
                    <li>Tên</li>
                    <li>Email</li>
                    <li>Số điện thoại</li>
                    <li>Quyền quản trị</li>
                    <li>Ngày tạo</li>
                    <li>Hiệu chỉnh</li>
                </ul>
                <div class="list-user">
                    <h6 v-if="toast != ''" class="text-center list-user">{{ toast }}</h6>
                    <ul v-else class="list-item-user" v-for="(item, index) in dataUsers" v-show="item.email != getEmail">
                        <li>{{ index }}</li>
                        <li>{{ item.firstname }} {{ item.lastname }}</li>
                        <li>{{ item.email }}</li>
                        <li>{{ item.mobile }}</li>
                        <li>{{ item.role }}</li>
                        <li>{{ item.createdAt }}</li>
                        <li>
                            <button class="btn-warning" style="border-radius: 5px;" @click="editUser(item._id)">
                                <i class="fa-solid fa-pen" style="padding: 5px;"></i>
                            </button>
                            <button class="btn-danger" style="margin-left: 4px; border-radius: 5px;" @click="deluser(item._id)">
                                <i class="fa-sharp fa-solid fa-xmark" style="padding: 5px 8px;"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <router-link to="/signup" class="btn btn-primary" v-if="checkadmin">Tạo người dùng mới</router-link>
            <button class="btn btn-primary" v-else @click="gotologin()">Đăng nhập admin</button>
        </div>
    </div>
</template>
<style scoped>
.users {
    width: 100%;
    height: 657px;
    background-color: #f0f5f8;
}

.wrapper-list .info {
    display: flex;
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;
    background-color: #63c5de;
}

.wrapper-list .info li {
    padding: 10px 0;
}

.wrapper-list .info li,
.list-item-user li {
    width: 150px;
    margin: 0 8px;
}

.wrapper-list .info li:first-child,
.list-item-user li:first-child {
    width: 50px;
}

.wrapper-list .info li:nth-child(6),
.list-item-user li:nth-child(6) {
    width: 200px;
}

.list-user {
    height: 400px;
    overflow-y: scroll;
}

.list-item-user {
    margin: 0;
    padding: 10px 0;
    display: flex;
    list-style-type: none;
    border-bottom: 1px solid #696666;
}

.list-item-user:hover {
    cursor: pointer;
    background-color: #63c5de;
}

.list-item-user li:nth-child(2) {
    text-transform: capitalize;
}

.list-user::-webkit-scrollbar {
    width: 3px;
}

.list-user::-webkit-scrollbar-track {
    background-color: #fff;
}

.list-user::-webkit-scrollbar-thumb {
    background-color: var(--color--main--);
    border-radius: 50px;
}

@media only screen and (max-width: 600px) {

    .list-item-user,
    .wrapper-list .info {
        display: block;
    }
    .users{
        height: 100%;
    }
}

@media only screen and (min-width: 576px) and (max-width:768px) {

    .list-item-user,
    .wrapper-list .info {
        display: block;
    }
    .users{
        height: 100%;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 768px) and (max-width:992px) {

    .list-item-user,
    .wrapper-list .info {
        display: block;
    }
    .users{
        height: 100%;
    }
}

@media only screen and (min-width: 922px) and (max-width:1200px) {

    .list-item-user,
    .wrapper-list .info {
        display: block;
    }
    .users{
        height: 100%;
    }
}
</style>