<script>
import leftPage from '../components/left-page.vue';
import OrderService from '../../../Admin/src/services/Order.service';
import loading from '../components/loading.vue';
export default {
    data() {
        return {
            isLoad: false,
            dataOrders: []
        }
    },
    components: {
        leftPage,
        loading
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
        getIdOrder(id){
            localStorage.setItem('IdOrder',id);
            this.$router.push('/order-details');
        }
    },
    mounted() {
        this.getOrder();
    }
};
</script>
<template>
    <loading v-if="isLoad"></loading>
    <div class="wrapper d-flex">
        <leftPage></leftPage>
        <div class="orders">
            <div class="search">
                <input type="text" placeholder="Tìm kiếm đơn hàng" name="search">
                <button class="btn btn-primary">Tìm</button>
            </div>
            <h5 class="text-center">Danh sách đơn hàng</h5>
            <div class="list-info-order">
                <ul class="info">
                    <li>STT</li>
                    <li>Mã đơn</li>
                    <li>Tình trạng TT</li>
                    <li>Khách hàng</li>
                    <li>Ngày</li>
                    <li>Tổng tiền</li>
                </ul>
                <h6 v-if="dataOrders.length == 0" class="text-center">Chưa có đơn hàng nào </h6>
                <div v-else class="list-order">
                    <ul class="list-item-order" v-for="(item, index) in dataOrders" @click="getIdOrder(item._id)">
                        <li>{{ index +1}}</li>
                        <li>{{ item._id }}</li>
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
}

.orders {
    width: 100%;
    height: 653px;
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

.list-info-order .info li,
.list-item-order li {
    width: 100%;
    margin: 0 8px;
}

.list-info-order .info li:first-child,
.list-item-order li:first-child {
    width: 100px;
}

.list-order {
    height: 500px;
    overflow: scroll;
}

.list-item-order {
    margin: 0;
    padding: 10px 0;
    display: flex;
    list-style-type: none;
    border-bottom: 1px solid #696666;
}
.list-item-order:hover{
    cursor: pointer;
    background-color: #63c5de;
}
</style>