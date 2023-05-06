<script>
import UserService from '../services/User.service';
import hearder from '../components/hearder.vue';
import loading from '../components/loading.vue';
export default {
    data() {
        return {
            userinfo: {},
            isLoad: false,
            user: {}
        }
    },
    components: {
        hearder, loading
    },
    methods: {
        async getuserbyid() {
            try {
                const id = sessionStorage.getItem('idUser');
                this.isLoad = true;
                this.userinfo = await UserService.getById(id);
                this.isLoad = false;
            } catch (error) {
                console.log(error);
            }
        },
        async updateUser() {
            try {
                const id = sessionStorage.getItem('idUser');
                if (Object.keys(this.user).length !== 0) {
                    this.isLoad = true;
                    await UserService.update(id, this.user);
                    alert("Cập nhật thành công");
                    sessionStorage.removeItem('idUser');
                    this.$router.push('/users');
                }else{
                    alert("Vui lòng nhập thông tin bạn muốn đổi");
                }
            } catch (error) {
                console.log(error);
                alert("Email hoặc SDT người dùng đã toàn tại !!!");
                this.isLoad = false;
            }
        },
        getrole(e) {
            this.user.role = e.target.value;
        },
        back() {
            this.$router.push('/users');
        }
    },
    mounted() {
        this.getuserbyid();
    }
}
</script>
<template>
    <loading v-if="isLoad"></loading>
    <hearder></hearder>
    <div class="container">
        <h4 class="text-center mb-4" style="">Thông tin người dùng</h4>
        <div class="wrapper row">
            <div class="info-user col col-md-6 col-sm-12">
                <h6>Thông tin hiện tại </h6>
                <div class="info">
                    <p>Tên : {{ userinfo.firstname }}</p>
                    <p>Họ : {{ userinfo.lastname }}</p>
                    <p>Email : {{ userinfo.email }}</p>
                    <p>Số điện thoại : {{ userinfo.mobile }}</p>
                    <p>Quyền : {{ userinfo.role }}</p>
                </div>
            </div>
            <div class="form-update col col-md-6 col-sm-12">
                <form @submit.prevent="updateUser">
                    <h6>Thông tin chỉnh sửa </h6>
                    <div>
                        <label for="firstname">Tên </label>
                        <input type="text" v-model="user.firstname" id="firstname" class="form-control">
                    </div>
                    <div>
                        <label for="lastname">Họ </label>
                        <input type="text" v-model="user.lastname" id="lastname" class="form-control">
                    </div>
                    <div>
                        <label for="email">Email </label>
                        <input type="text" v-model="user.email" id="email" class="form-control">
                    </div>
                    <div>
                        <label for="mobile">Số điện thoại </label>
                        <input type="text" v-model="user.mobile" id="mobile" class="form-control">
                    </div>
                    <div>
                        <label for="role">Quyền</label><br>
                        <select name="role" id="role" @change="getrole">
                            <option value="">Chọn</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <button class="btn btn-danger mt-4">Lưu</button>
                    <button class="btn btn-primary mt-4" style="margin-left: 8px;" @click="back()">Trờ về</button>
                </form>
            </div>
        </div>
    </div>
</template>
<style scoped></style>