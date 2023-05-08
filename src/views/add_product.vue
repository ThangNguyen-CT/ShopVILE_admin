<script>
import formproduct from '../components/form_product.vue';
import ProductService from '../services/Product.service';
import loading from '../components/loading.vue';

export default {
    data() {
        return {
            isLoading: false,
            imgProduct: [],
        }
    },
    components: {
        formproduct, loading
    },
    methods: {
        async addproduct(product) {
            const formData = new FormData();
            for (let key in product) {
                formData.append(key, product[key]);
            }
            for (let i = 0; i < this.imgProduct.length; i++) {
                formData.append('images', this.imgProduct[i]);
            }
            const quantity = formData.get('quantity');
            const price = formData.get('price');
            if (quantity > 0 && price >= 0) {
                try {
                    this.isLoading = true;
                    await ProductService.create(formData);
                    this.isLoading = false;
                    alert('Thêm thành công');
                    this.$router.push('/');
                } catch (error) {
                    this.isLoading = false;
                    console.log(error);
                    // alert('Thêm thất bại');
                    alert('Bạn không có quyền thêm');
                    this.$router.push('/');
                }
            } else {
                console.log("Giá / số lượng không hợp lệ");
            }
        }
    },
}
</script>
<template>
    <loading v-if="isLoading"></loading>
    <div class="add_product">
        <h3 class="text-center">Thêm sản phẩm</h3>
        <div class="form_product">
            <formproduct @submit:product="addproduct" :productLocal="{}" :showimg="true" :imgs="imgProduct"></formproduct>
        </div>
    </div>
</template>
<style scoped>
.form_product {
    margin: 0 80px;
}
</style>