<script>
import OrderService from '../services/Order.service';
import loading from '../components/loading.vue';
import hearder from '../components/hearder.vue';
export default {
    data() {
        return {
            isLoad: false,
            dataOrderById: {},
            statusOrder: {
                statusPayment :'Chưa thanh toán',
                orderStatus :'Đang xử lý'
            }
        }
    },
    components: {
        loading,hearder
    },
    methods: {
        async getOrderbyId() {
            try {
                this.isLoad = true;
                const id = sessionStorage.getItem('IdOrder');
                this.dataOrderById = await OrderService.getbyId(id);
                this.isLoad = false;
            } catch (error) {
                console.log(error);
            }
        },
        async updateOrder() {
            try {
                this.isLoad = true;
                const id = sessionStorage.getItem('IdOrder');
                await OrderService.update(id,this.statusOrder);
                sessionStorage.removeItem('IdOrder');
                this.isLoad = false;
                alert("Cập nhật thành công !!!");
                this.$router.push('/order');
            } catch (error) {
                console.log(error);
            }
        },
        getstatusPay(e) {
            this.statusOrder.statusPayment = e.target.value;
        },
        getstatusOrder(e) {
            this.statusOrder.orderStatus = e.target.value;
        }
    },
    mounted() {
        this.getOrderbyId();
    }
}
</script>
<template>
    <loading v-if="isLoad"></loading>
    <hearder></hearder>
    <h4 class="text-center color-text">Chi tiết đơn hàng</h4>
    <div class="wrapper_order_details">
        <div class="order_details row">
            <ul class="col col-6">
                <h6 class="color-text">Thông tin đơn hàng</h6>
                <li>Mã đơn hàng : {{ dataOrderById._id }}</li>
                <li>Trạng thái thanh toán :
                    <select name="paystatus" id="paystatus" @change="getstatusPay">
                        <option :value="dataOrderById.statusPayment">{{ dataOrderById.statusPayment }}</option>
                        <option value="Đã thanh toán">Chưa thanh toán</option>
                        <option value="Đã thanh toán">Đã thanh toán</option>
                    </select>
                </li>
                <li>Trạng thái đơn hàng :
                    <select name="orderStatus" id="orderStatus"  @change="getstatusOrder">
                        <option :value="dataOrderById.orderStatus"> {{ dataOrderById.orderStatus }}
                        </option>
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Chờ thanh toán">Chờ thanh toán</option>
                        <option value="Đơn hủy">Đơn hủy</option>
                        <option value="Đang vận vận chuyển">Đang vận vận chuyển</option>
                        <option value="Giao hàng thành công">Giao hàng thành công</option>
                    </select>
                </li>
                <li>Hình thức thanh toán : {{ dataOrderById.paymentIntent }}</li>
            </ul>
            <ul class="col col-6">
                <h6 class="color-text">Thông tin khách hàng</h6>
                <li>Tên khách hàng : {{ dataOrderById.name }}</li>
                <li>Số điện thoại : {{ dataOrderById.m }}</li>
                <li>Mail : {{ dataOrderById.e }}</li>
                <li>Giới tính : {{ dataOrderById.sex }}</li>
                <li>Địa chỉ nhận hàng : {{ dataOrderById.address }}</li>
            </ul>
            <ul class="col col-12">
                <h6 class="color-text">Thông tin sản phẩm</h6>
                <li v-for="(item, index) in dataOrderById.products">
                    <p>Sản phẩm {{ index + 1 }} :</p>
                    <p>Mã sản phẩm : {{ item.product }} x {{ item.count }}</p>
                </li>
                <li>Tổng giá tiền : {{ dataOrderById.totalprice }}</li>
                <li>Ngày đặt hàng : {{ dataOrderById.createdAt }}</li>
                <li>Ngày chỉnh sửa : {{ dataOrderById.updatedAt }}</li>
            </ul>
        </div>
        <div class="btn_edit_order">
            <button class="btn btn-danger" @click="updateOrder()"> Lưu </button>
            <router-link to="/order" class="btn btn-primary">Trờ về</router-link>
        </div>
    </div>
</template>
<style scoped>
.wrapper_order_details {
    margin: 0 36px;
}

ul {
    list-style-type: none;
    padding: 0;
}

.btn_edit_order button:first-child {
    margin-right: 12px;
}

.color-text {
    color: #7db6da;
}</style>