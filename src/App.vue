<script>
export default {
  methods: {

  }
}
</script>
<template>
  <div class="main">
    <div class="w-100 h-100 d-flex">
      <div class="right_page">
        <div class="header bg-dark">
          <div class="user d-flex justify-content-end">
            <div class="d-flex justify-content-between">
              <i class="fa-solid fa-list"></i>
              <i class="fa-solid fa-bell"></i>
              <i class="fa-solid fa-user"></i>
            </div>
            <!-- <button type="button" class="btn btn-info">Đăng xuất</button> -->
          </div>
        </div>
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
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