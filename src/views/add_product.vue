<script>
import formproduct from '../components/form_product.vue';
import ProductService from '../services/Product.service';
import loading from '../components/loading.vue';

export default {
    data() {
        return {
            isLoading: false,
            imgProduct:[],
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
                this.isLoading = true;
                try {
                    await ProductService.create(formData);
                    this.isLoading = false;
                } catch (error) {
                    this.isLoading = false;
                    console.log(error);
                }
            } else {
                console.log("Gia hoac so luong khong hop le");
            }
        }
    },
}
</script>
<template>
    <loading v-if="isLoading"></loading>
    <div class="add_product">
        <router-link to="/">Trở về</router-link>
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