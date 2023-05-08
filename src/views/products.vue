<script>
import ProductService from '../services/Product.service';
import leftpage from '../components/left-page.vue'
import loading from '../components/loading.vue';
import hearder from '../components/hearder.vue';
export default {
    data() {
        return {
            isLoad: false,
            sortprice: true,
            sortquantity: true,
            sorttitle: true,
            sortcategory: true,
            products: {},
            sort: '',
            valuesort: '',
            textsearch: ''
        }
    },
    components: {
        leftpage, loading, hearder
    },
    methods: {
        async getallproduct() {
            try {
                this.isLoad = true;
                this.products = await ProductService.getAll(this.sort, this.valuesort);
                this.isLoad = false;
            } catch (error) {
                console.log(error);
            }
        },
        async delproduct(id) {
            try {
                if (confirm('Bạn có chắc chắn xóa không ?')) {
                    await ProductService.delete(id);
                    this.getallproduct();
                }
            } catch (error) {
                console.log(error);
                alert('Bạn không có quyền xóa');
            }
        },
        gotoUpdatePage(_id) {
            this.$router.push({
                name: 'editproduct',
                params: { id: _id }
            })
        },
        fnsortprice(sort, value) {
            this.sort = sort;
            this.valuesort = value;
            this.getallproduct();
        },
        async searchproduct() {
            if (this.textsearch != '') {
                this.isLoad = true;
                this.products = await ProductService.getSearch(`?search=${this.textsearch}`);
                this.isLoad = false;
                this.textsearch = '';
            } else {
                alert("Vui lòng nhập thông tin tìm kiếm !!!");
            }
        }
    },
    mounted() {
        this.getallproduct();
    },
    created() {

    }
}
</script>
<template>
    <loading v-if="isLoad"></loading>
    <hearder></hearder>
    <div class="wrapper d-flex">
        <leftpage></leftpage>
        <div class="products">
            <form class="search" @submit.prevent="searchproduct()">
                <input type="text" placeholder="Nhập tên sản phẩm...." name="search" v-model="textsearch">
                <button class="btn btn-primary">Tìm</button>
            </form>
            <h5 class="text-center">Danh sách sản phẩm</h5>
            <ul class="list-info">
                <!-- <li class="d-flex justify-content-center"> -->
                <li class="product-stt">STT</li>
                <li class="product-category">Loại
                    <i v-if="sortcategory" class="fa-solid fa-arrow-down-a-z"
                        @click="sortcategory = !sortcategory, fnsortprice('sort', 'category')"></i>
                    <i v-else class="fa-solid fa-arrow-down-z-a"
                        @click="sortcategory = !sortcategory, fnsortprice('sort', '-category')"></i>
                </li>
                <li class="product-name">Tên
                    <i v-if="sorttitle" class="fa-solid fa-arrow-down-a-z"
                        @click="sorttitle = !sorttitle, fnsortprice('sort', 'title')"></i>
                    <i v-else class="fa-solid fa-arrow-down-z-a"
                        @click="sorttitle = !sorttitle, fnsortprice('sort', '-title')"></i>
                </li>
                <li class="product-quantity">Số lượng
                    <i v-if="sortquantity" class="fa-solid fa-sort-down"
                        @click="sortquantity = !sortquantity, fnsortprice('sort', 'quantity')"></i>
                    <i v-else class="fa-solid fa-sort-up"
                        @click="sortquantity = !sortquantity, fnsortprice('sort', '-quantity')"></i>
                </li>
                <li class="product-price">Giá
                    <i v-if="sortprice" class="fa-solid fa-sort-down"
                        @click="sortprice = !sortprice, fnsortprice('sort', 'price')"></i>
                    <i v-else class="fa-solid fa-sort-up"
                        @click="sortprice = !sortprice, fnsortprice('sort', '-price')"></i>
                </li>
                <li class="product-modify">Hiệu chỉnh</li>
                <!-- </li> -->
            </ul>
            <h6 v-if="products.length == 0" class="text-center">Chưa có sản phẩm</h6>
            <div v-else class="list-product">
                <ul class="list-product-item" v-for="(item, index) in products">
                    <li class="product-stt">{{ (index + 1) }}</li>
                    <li class="product-category">{{ item.category }}</li>
                    <li class="product-name">{{ item.title }}</li>
                    <li class="product-quatity">{{ item.quantity }}</li>
                    <li class="product-price">{{ item.price }}</li>
                    <li class="btn-product">
                        <button class="btn-warning" style="border-radius: 5px;" @click="gotoUpdatePage(item._id)">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn-danger" style="border-radius: 5px;" @click="delproduct(item._id)">
                            <i class="fa-sharp fa-solid fa-xmark"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <router-link to="/addproduct" class="btn btn-primary">Thêm sản phẩm</router-link>
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

.products {
    width: 100%;
    height: 657px;
    background-color: #f0f5f8;
}

.list-info {
    display: flex;
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: #63c5de;
}

.list-info li {
    padding: 16px 0;
}

.list-product {
    height: 400px;
    overflow-y: scroll;
}

.list-product ul {
    padding-left: 10px;
    list-style-type: none;
    display: flex;

}

.list-product-item {
    border-bottom: 1px solid #63c5de;
    padding: 8px 0;
}

.product-stt,
.list-info li:nth-child(1) {
    min-width: 50px;
}

.product-category,
.list-info li:nth-child(2) {
    min-width: 150px;
}

.product-price,
.list-info li:nth-child(5),
.product-quatity,
.list-info li:nth-child(4) {
    min-width: 100px;
}

.product-name,
.list-info li:nth-child(3) {
    min-width: 600px;
}

.btn-product button {
    margin: 0 4px;
    width: 45px;
}

.list-product::-webkit-scrollbar {
    width: 3px;
}

.list-product::-webkit-scrollbar-track {
    background-color: #fff;
}

.list-product::-webkit-scrollbar-thumb {
    background-color: var(--color--main--);
    border-radius: 50px;
}

@media only screen and (max-width: 600px) {

    .list-info,
    .list-product ul {
        display: block;
    }

    .products {
        height: 100%;
    }

    .product-name,
    .list-info li:nth-child(3) {
        min-width: 200px;
    }
}

@media only screen and (min-width: 576px) and (max-width:768px) {

    .list-info,
    .list-product ul {
        display: block;
    }

    .products {
        height: 100%;
    }

    .product-name,
    .list-info li:nth-child(3) {
        min-width: 200px;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 768px) and (max-width:992px) {

    .list-info,
    .list-product ul {
        display: block;
    }

    .products {
        height: 100%;
    }

    .product-name,
    .list-info li:nth-child(3) {
        min-width: 200px;
    }
}

@media only screen and (min-width: 922px) and (max-width:1200px) {

    .list-info,
    .list-product ul {
        display: block;
    }

    .products {
        height: 100%;
    }

    .product-name,
    .list-info li:nth-child(3) {
        min-width: 200px;
    }
}
</style>