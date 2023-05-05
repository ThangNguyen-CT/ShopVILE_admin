<script>
import UserService from '../services/User.service';
import loading from '../components/loading.vue';
export default {
    data() {
        return {
            formsingup: {},
            rfpwd: '',
            isLoad: false
        }
    },
    components: {
        loading
    },
    methods: {
        async signup() {
            try {
                if (this.formsingup.password == this.rfpwd) {
                    this.isLoad = true;
                    await UserService.register(this.formsingup);
                    this.isLoad = false;
                    if (confirm('Đăng ký thành công')) {
                        this.$router.push('/login');
                    }
                } else {
                    alert("Nhập lại password không đúng !!");
                }
            } catch (error) {
                console.log(error);
                alert("Thông tin của bạn bị trùng !!");
            }
        }
    }
}
</script>
<template>
    <loading v-if="isLoad"></loading>
    <section class="h-100" style="background: linear-gradient(#e1791e, #243b55);">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px; margin: 40px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                    <form class="mx-1 mx-md-4" @submit.prevent="signup()">

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" id="fistname" class="form-control" required
                                                    v-model="formsingup.firstname" />
                                                <label class="form-label" for="fistname">Tên </label>
                                            </div>
                                            <div class="form-outline flex-fill mb-0" style="margin-left: 6px;">
                                                <input type="text" id="lastname" class="form-control" required
                                                    v-model="formsingup.lastname" />
                                                <label class="form-label" for="lastname">Họ </label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="email" id="email" class="form-control" required
                                                    v-model="formsingup.email" />
                                                <label class="form-label" for="email">Email</label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-phone fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" id="sdt" class="form-control" required
                                                    v-model="formsingup.mobile" />
                                                <label class="form-label" for="sdt">Số điện thoại</label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="password" id="pwd" class="form-control" required
                                                    v-model="formsingup.password" />
                                                <label class="form-label" for="pwd">Mật khẩu </label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="password" id="pwdrf" class="form-control" required
                                                    v-model="rfpwd" />
                                                <label class="form-label" for="pwdrf">Nhập lại mật khẩu </label>
                                            </div>
                                        </div>

                                        <div class="form-check d-flex justify-content-center mb-5">
                                            <input class="form-check-input me-2" type="checkbox" value=""
                                                id="form2Example3c" required />
                                            <label class="form-check-label" for="form2Example3">
                                                Bạn chấp nhận <a href="https://shop-vila-fe.vercel.app/policy/policyBM">điều
                                                    khoản của chúng tôi</a>
                                            </label>
                                        </div>
                                        <div class="mb-3">
                                            <span>Bạn có thể đi đến trang</span><router-link to="/login"> đăng
                                                nhập</router-link>
                                        </div>
                                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button type="submit" class="btn btn-primary btn-lg">Đăng ký</button>
                                        </div>

                                    </form>

                                </div>
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        class="img-fluid" alt="Sample image">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped></style>