<script>
import UserService from '../services/User.service';
import loading from '../components/loading.vue';
export default {
    data() {
        return {
            formlogin: {},
            isLoad: false,
            user: {}
        }
    },
    components: {
        loading
    },
    methods: {
        async login() {
            try {
                this.isLoad = true;
                this.user = await UserService.login(this.formlogin);
                this.isLoad = false;
                localStorage.setItem('infouser', JSON.stringify(this.user));
                alert("Đăng nhập thành công");
                location.href = '/';
            } catch (error) {
                console.log(error);
                alert("Thông tin đăng nhập sai");
                this.formlogin.email = '';
                this.formlogin.password = '';
                this.isLoad = false;
            }
        }
    }
}
</script>
<template>
    <loading v-if="isLoad"></loading>
    <div class="login_form">
        <div class="login-box">
            <h2>Đăng nhập</h2>
            <form @submit.prevent="login()">
                <div class="user-box">
                    <input type="email" name="" required v-model="formlogin.email">
                    <label>Email</label>
                </div>
                <div class="user-box">
                    <input type="password" name="" required v-model="formlogin.password">
                    <label>Mật khẩu</label>
                </div>
                <button type="submit" class="btn">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Đăng nhập
                </button>
            </form>
        </div>
    </div>
</template>
<style scoped>
.login_form {
    width: 100%;
    height: 713px;
    font-family: sans-serif;
    background: linear-gradient(#e1791e, #243b55);
}

.login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border-radius: 10px;
}

.login-box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
}

.login-box .user-box {
    position: relative;
}

.login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
}

.login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
}

.login-box .user-box input:focus~label,
.login-box .user-box input:valid~label {
    top: -20px;
    left: 0;
    color: var(--color--main--);
    font-size: 12px;
}

.login-box form button {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: var(--color--main--);
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px
}

.login-box button:hover {
    background: var(--color--main--);
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px var(--color--main--),
        0 0 25px var(--color--main--),
        0 0 50px var(--color--main--),
        0 0 100px var(--color--main--);
}

.login-box button span {
    position: absolute;
    display: block;
}

.login-box button span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--color--main--));
    animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
    0% {
        left: -100%;
    }

    50%,
    100% {
        left: 100%;
    }
}

.login-box button span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, var(--color--main--));
    animation: btn-anim2 1s linear infinite;
    animation-delay: .25s
}

@keyframes btn-anim2 {
    0% {
        top: -100%;
    }

    50%,
    100% {
        top: 100%;
    }
}

.login-box button span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, var(--color--main--));
    animation: btn-anim3 1s linear infinite;
    animation-delay: .5s
}

@keyframes btn-anim3 {
    0% {
        right: -100%;
    }

    50%,
    100% {
        right: 100%;
    }
}

.login-box button span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, var(--color--main--));
    animation: btn-anim4 1s linear infinite;
    animation-delay: .75s
}

@keyframes btn-anim4 {
    0% {
        bottom: -100%;
    }

    50%,
    100% {
        bottom: 100%;
    }
}
</style>