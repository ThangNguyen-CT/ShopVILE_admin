<script>
import leftPage from '../components/left-page.vue';
import OrderService from '../services/Order.service';
import loading from '../components/loading.vue';
import hearder from '../components/hearder.vue';
export default {
    data() {
        return {
            isLoad: false,
            dataOrders: {},
            textsearch: ''
        }
    },
    components: {
        leftPage,
        loading,
        hearder
    },
    methods: {
        async getOrder() {
            try {
                this.isLoad = true;
                this.dataOrders = await OrderService.getAll();
                this.isLoad = false;
            } catch (error) {
                console.log(error);
            }
        },
        getIdOrder(id) {
            sessionStorage.setItem('IdOrder', id);
            this.$router.push('/editorder');
        },
        async searchorder() {
            try {
                var id = this.textsearch;
                await OrderService.getbyId(this.textsearch);
                sessionStorage.setItem('IdOrder', id);
                this.$router.push('/editorder');
            } catch (error) {
                console.log(error);
                alert("Không có mã đơn hàng này !");
                this.isLoad = false;
                this.textsearch = '';
            }
        }
    },
    mounted() {
        this.getOrder();
    }
};
</script>
<template>
    <loading v-if="isLoad"></loading>
    <hearder></hearder>
    <div class="wrapper d-flex">
        <leftPage></leftPage>
        <div class="orders">
            <form class="search" @submit.prevent="searchorder()">
                <input type="text" placeholder="Nhập mã đơn hàng..." name="search" v-model="textsearch">
                <button type="submit" class="btn btn-primary">Tìm</button>
            </form>
            <h5 class="text-center">Danh sách đơn hàng</h5>
            <div class="list-info-order">
                <ul class="info">
                    <li>STT</li>
                    <li>Mã đơn</li>
                    <li>Tình trạng DH</li>
                    <li>Tình trạng TT</li>
                    <li>Khách hàng</li>
                    <li>Ngày</li>
                    <li>Tổng tiền</li>
                </ul>
                <h6 v-if="dataOrders.length == 0" class="text-center list-order">Chưa có đơn hàng nào </h6>
                <div v-else class="list-order">
                    <ul class="list-item-order" v-for="(item, index) in dataOrders" @click="getIdOrder(item._id)">
                        <li>{{ index + 1 }}</li>
                        <li>{{ item._id }}</li>
                        <li>{{ item.orderStatus }}</li>
                        <li>{{ item.statusPayment }}</li>
                        <li>{{ item.name }}</li>
                        <li>{{ item.createdAt }}</li>
                        <li>{{ item.totalprice }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.search {
    margin-top: 8px;
    margin-left: 8px;
}

.search input {
    outline: none;
    border: 2px solid #696666;
    border-radius: 5px;
    height: 35px;
    width: 300px;
}

.search button {
    margin-bottom: 5px;
    margin-left: 8px;
}

.orders {
    width: 100%;
    height: 657px;
    background-color: #f0f5f8;
}

.list-info-order .info {
    display: flex;
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;
    background-color: #63c5de;
}

.list-info-order .info li {
    padding: 10px 0;
}

.list-info-order .info li,
.list-item-order li {
    width: 200px;
    margin: 0 8px;
}

.list-info-order .info li:first-child,
.list-item-order li:first-child {
    width: 30px;
}

.list-info-order .info li:nth-child(4),
.list-item-order li:nth-child(4) {
    width: 120px;
}

.list-info-order .info li:nth-child(7),
.list-item-order li:nth-child(7) {
    width: 50px;
}

.list-order {
    height: 400px;
    overflow-y: scroll;
}

.list-item-order {
    margin: 0;
    padding: 10px 0;
    display: flex;
    list-style-type: none;
    border-bottom: 1px solid #696666;
}

.list-item-order:hover {
    cursor: pointer;
    background-color: #63c5de;
}

.list-order::-webkit-scrollbar {
    width: 3px;
}

.list-order::-webkit-scrollbar-track {
    background-color: #fff;
}

.list-order::-webkit-scrollbar-thumb {
    background-color: var(--color--main--);
    border-radius: 50px;
}

@media only screen and (max-width: 600px) {

    .list-item-order,
    .list-info-order .info {
        display: block;
    }

    .orders {
        height: 100%;
    }
}

@media only screen and (min-width: 576px) and (max-width:768px) {

    .list-item-order,
    .list-info-order .info {
        display: block;
    }
    
    .orders {
        height: 100%;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 768px) and (max-width:992px) {

    .list-item-order,
    .list-info-order .info {
        display: block;
    }
    
    .orders {
        height: 100%;
    }
}

@media only screen and (min-width: 922px) and (max-width:1200px) {

    .list-item-order,
    .list-info-order .info {
        display: block;
    }
    
    .orders {
        height: 100%;
    }
}</style>