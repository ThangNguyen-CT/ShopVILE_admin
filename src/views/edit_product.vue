<script>
import ProductService from '../services/Product.service';
import formproduct from '../components/form_product.vue';
import loading from '../components/loading.vue';
export default {
    data() {
        return {
            products: {},
            checkdata: false,
            load: false
        }
    },
    components: {
        formproduct, loading
    },
    methods: {
        async getproductbyId(id) {
            try {
                this.load = true;
                this.products = await ProductService.get(id);
                this.load = false;
                this.checkdata = true;
            } catch (error) {
                console.log(error);
            }
        },
        async updateproduct(product) {
            try {
                const formData = new FormData();
                for (let key in product) {
                    if (key != 'images') {
                        formData.append(key, product[key]);
                    }
                }
                this.load = true;
                await ProductService.update(this.$route.params.id, formData);
                this.load = false;
                alert('Cập nhật thành công');
                this.$router.push('/');
            } catch (error) {
                console.log(error);
                alert('Cập nhật thất bại');
                this.load = false;
            }
        }
    },
    mounted() {
        this.getproductbyId(this.$route.params.id);
    }
}
</script>
<template>
    <loading v-if="load"></loading>
    <div class="edit_product">
        <h3 class="text-center">Sửa sản phẩm</h3>
        <div class="form_product">
            <formproduct v-if="checkdata" :productLocal="products" :showimg="false" @submit:product="updateproduct">
            </formproduct>
        </div>
    </div>
</template>
<style scoped>
.form_product {
    margin: 0 80px;
}
</style>