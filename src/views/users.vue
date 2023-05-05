<script>
import leftPage from '../components/left-page.vue';
import UserService from '../services/User.service';
import loading from '../components/loading.vue';
import hearder from '../components/hearder.vue';
export default {
    data() {
        return {
            isLoad: false,
            dataUsers: [],
            toast: ''
        }
    },
    components: {
        leftPage,
        loading,
        hearder
    },
    computed:{
        getEmail(){
            return JSON.parse(sessionStorage.getItem('infouser')).email;
        }
    },
    methods: {
        async getdataUser() {
            try {
                this.isLoad = true;
                this.dataUsers = await UserService.getallUser();
                if (this.dataUsers.length == 0) {
                    this.toast = 'Chưa có người dùng nào';
                }
                this.isLoad = false;
            } catch (error) {
                console.log(error);
                this.toast = 'Bạn chưa có quyền để quản lý người dùng';
                this.isLoad = false;
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
            <div class="list-title-user">
                <ul class="info">
                    <li>STT</li>
                    <li>Tên</li>
                    <li>Email</li>
                    <li>Số điện thoại</li>
                    <li>Quyền quản trị</li>
                    <li>Ngày tạo</li>
                </ul>
                <h6 v-if="toast != ''" class="text-center list-user">{{ toast }}</h6>
                <div v-else class="list-user">
                    <ul class="list-item-user" v-for="(item, index) in dataUsers" v-show="item.email != getEmail">
                        <li>{{ index}}</li>
                        <li>{{ item.firstname }} {{ item.lastname }}</li>
                        <li>{{ item.email }}</li>
                        <li>{{ item.mobile }}</li>
                        <li>{{ item.role }}</li>
                        <li>{{ item.createdAt }}</li>
                        <button class="btn btn-warning" @click="editUser(item._id)">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn btn-danger" style="margin-left: 4px;" @click="deluser(item._id)">
                            <i class="fa-sharp fa-solid fa-xmark"></i>
                        </button>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.users {
    width: 100%;
    height: 100%;
    background-color: #f0f5f8;
}

.list-title-user .info {
    display: flex;
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;
    background-color: #63c5de;
}

.list-title-user .info li {
    padding: 10px 0;
}

.list-title-user .info li,
.list-item-user li {
    width: 100%;
    margin: 0 8px;
}

.list-title-user .info li:first-child,
.list-item-user li:first-child {
    width: 100px;
}

.list-user {
    height: 515px;
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
    .list-title-user .info {
        display: block;
    }
}

@media only screen and (min-width: 576px) and (max-width:768px) {

    .list-item-user,
    .list-title-user .info {
        display: block;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 768px) and (max-width:992px) {

    .list-item-user,
    .list-title-user .info {
        display: block;
    }
}

@media only screen and (min-width: 922px) and (max-width:1200px) {

    .list-item-user,
    .list-title-user .info {
        display: block;
    }
}
</style>