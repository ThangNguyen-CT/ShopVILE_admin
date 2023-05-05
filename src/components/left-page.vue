<template>
    <div class="left_page">
        <div class="img_admin">
            <img src="../assets/img/logo-vila.png" alt="logo">
        </div>
        <ul class="nav_list">
            <a href="/users" active-class="active">
                <li class="nav_list-item">
                    <i class="fa-solid fa-users"></i>
                    <span>Quản lý người dùng</span>
                </li>
              </a>
            <router-link :to="{ name: 'products' }" active-class="active">
                <li class="nav_list-item">
                    <i class="fa-brands fa-product-hunt"></i>
                    <span>Quản lý sản phẩm</span>
                </li>
            </router-link>
            <router-link :to="{ name: 'order' }" active-class="active">
                <li class="nav_list-item">
                    <i class="fa-solid fa-store"></i>
                    <span>Quản lý đơn hàng</span>
                </li>
            </router-link>
        </ul>
        <!-- <button type="button" class="btn btn-info"><router-link to="http://127.0.0.1:5173/"></router-link>Trở về</button> -->
    </div>
</template>
<style scoped>
.header {
  color: var(--color--white--);
  height: 60px;
}

.user {
  font-size: 18px;
  padding: 10px;
  height: 100%;
}

.user div {
  align-items: center;
  width: 100px;
}

.left_page {
  width: 20%;
  background-color: var(--color--main--);
}

.left_page .img_admin img {
  width: 100%;
  height: 100%;
}

.right_page {
  width: 100%;
  height: 100%;
  background-color: var(--color--white--);
}

.nav_list {
  padding: 0;
  margin: 0;
}

.nav_list a {
  text-decoration: none;
  display: block;
}

.nav_list li {
  color: var(--color--white--);
  list-style-type: none;
  padding: 20px;
}

.nav_list li span {
  margin-left: 8px;
}

.nav_list li:hover {
  color: var(--color--main--);
  background-color: var(--color--white--);
  cursor: pointer;
}

.active li {
  color: var(--color--main--);
  background-color: var(--color--white--);
}
</style>