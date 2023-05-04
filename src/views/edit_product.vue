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
            } catch (error) {
                console.log(error);
            }
        }
        // async updateproduct(product, newimg) {
        //     console.log(newimg);
        //     const formData = new FormData();
        //     for (let key in product) {
        //         formData.append(key, product[key]);
        //     }

        //     // tạo một mảng các file ảnh dưới dạng đối tượng File
        //     const files = await Promise.all(newimg.map(async (url, index) => {
        //         const response = await fetch(url);
        //         const blob = await response.blob();
        //         return new File([blob], `image${index}.jpg`, { type: blob.type });
        //     }));

        //     // thêm mảng các file vào đối tượng formData
        //     files.forEach((file) => {
        //         formData.append('images', file);
        //     });

        //     const quantity = formData.get('quantity');
        //     const price = formData.get('price');
        //     if (quantity > 0 && price >= 0) {
        //         this.isLoading = true;
        //         try {
        //             await ProductService.update(this.$route.params.id, formData);
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     } else {
        //         console.log("Gia hoac so luong khong hop le");
        //     }
        // }

    },
    mounted() {
        this.getproductbyId(this.$route.params.id);
    }
}
</script>
<template>
    <loading v-if="load"></loading>
    <div class="edit_product">
        <router-link to="/">Trở về</router-link>
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