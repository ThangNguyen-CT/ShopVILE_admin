<script>
import ProductService from '../services/Product.service';
import leftpage from '../components/left-page.vue'
import loading from '../components/loading.vue';
export default {
    data() {
        return {
            isLoad: false,
            sortprice: true,
            sortquantity: true,
            sorttitle: true,
            sortcategory:true,
            products: [],
            sort: '',
            valuesort: '',
            textsearch: ''
        }
    },
    components: {
        leftpage, loading
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
                await ProductService.delete(id);
                this.getallproduct();
            } catch (error) {
                console.log(error);
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
            if(this.textsearch != ''){
                this.isLoad = true;
                this.products = await ProductService.getSearch(`?search=${this.textsearch}`);
                this.isLoad = false;
                this.textsearch = '';
            }else{
                alert("Vui lòng nhập thông tin tìm kiếm !!!");
            }
        }
    },
    mounted() {
        this.getallproduct();
    }
}
</script>
<template>
    <loading v-if="isLoad"></loading>
    <div class="wrapper d-flex">
        <leftpage></leftpage>
        <div class="products">
            <div class="search">
                <input type="text" placeholder="Tìm kiếm sản phẩm" name="search" v-model="textsearch">
                <button class="btn btn-primary" @click="searchproduct()">Tìm</button>
            </div>
            <h5 class="text-center">Danh sách sản phẩm</h5>
            <ul class="list-info">
                <li class="d-flex justify-content-center">
                    <span class="product-stt">STT</span>
                    <span class="product-category">Loại
                        <i v-if="sortcategory" class="fa-solid fa-arrow-down-a-z"
                            @click="sortcategory = !sortcategory, fnsortprice('sort', 'category')"></i>
                        <i v-else class="fa-solid fa-arrow-down-z-a"
                            @click="sortcategory = !sortcategory, fnsortprice('sort', '-category')"></i>
                    </span>
                    <span class="product-name">Tên
                        <i v-if="sorttitle" class="fa-solid fa-arrow-down-a-z"
                            @click="sorttitle = !sorttitle, fnsortprice('sort', 'title')"></i>
                        <i v-else class="fa-solid fa-arrow-down-z-a"
                            @click="sorttitle = !sorttitle, fnsortprice('sort', '-title')"></i>
                    </span>
                    <span class="product-quantity">Số lượng
                        <i v-if="sortquantity" class="fa-solid fa-sort-down"
                            @click="sortquantity = !sortquantity, fnsortprice('sort', 'quantity')"></i>
                        <i v-else class="fa-solid fa-sort-up"
                            @click="sortquantity = !sortquantity, fnsortprice('sort', '-quantity')"></i>
                    </span>
                    <span class="product-price">Giá
                        <i v-if="sortprice" class="fa-solid fa-sort-down"
                            @click="sortprice = !sortprice, fnsortprice('sort', 'price')"></i>
                        <i v-else class="fa-solid fa-sort-up"
                            @click="sortprice = !sortprice, fnsortprice('sort', '-price')"></i>
                    </span>
                    <span class="product-modify">Hiệu chỉnh</span>
                </li>
            </ul>
            <ul class="list-product">
                <div v-if="products.length == 0">
                   <h3 class="text-center">Không có sản phẩm</h3>
                </div>
                <li v-else class="d-flex justify-content-center" v-for="(item, index) in products">
                    <span class="product-stt">{{ (index + 1) }}</span>
                    <span class="product-category">{{ item.category }}</span>
                    <span class="product-name">{{ item.title }}</span>
                    <span class="product-quatity">{{ item.quantity }}</span>
                    <span class="product-price">{{ item.price }}</span>
                    <div class="btn-product">
                        <button class="btn btn-warning" @click="gotoUpdatePage(item._id)">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn btn-danger" @click="delproduct(item._id)">
                            <i class="fa-sharp fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </li>
            </ul>
            <router-link to="/addproduct" class="btn btn-primary">Thêm sản phẩm</router-link>
        </div>
    </div>
</template>
<style scoped>
.search{
    margin-top: 8px;
    margin-left: 8px;
}
.search input{
    outline: none;
    border: 2px solid #696666;
    border-radius: 5px;
    height: 35px;
}
.search button{
    margin-bottom: 5px;
    margin-left: 4px;
}
.products {
    width: 100%;
    height: 653px;
    background-color: #f0f5f8;
}

.list-info {
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: #63c5de;
}

.list-info li {
    border-bottom: 1px solid #9c9a9a;
    margin: 0 8px;
    padding: 16px 0;
}

.list-info li span {
    min-width: 150px;
}

.list-product li span {
    min-width: 150px;
    overflow-x: scroll;
}

.list-product .product-name {
    width: 50px;
}

.list-product .product-stt,
.list-info .product-stt {
    min-width: 50px;
}

.list-product li {
    min-width: 100px;
}



.list-product li span::-webkit-scrollbar {
    width: 2px;
}

.list-product {
    height: 400px;
    width: 100%;
    overflow-y: scroll;
    padding: 0;
    margin: 0;
}

.list-product li {
    border-bottom: 1px solid #9c9a9a;
    margin: 0 8px;
    margin-top: 8px;
}


.btn-product {
    padding-right: 45px;
}

.btn-product button {
    margin: 0 4px;
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

.btn-product button {
    width: 45px;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 576px) {
    .list-product li span {
        min-width: 50px;
        overflow-x: scroll;
    }

    .list-info li span {
        min-width: 50px;
    }

    .btn-product {
        padding-right: 0;
    }


}

@media only screen and (max-width: 600px) {
    .list-product li span {
        min-width: 50px;
        overflow-x: scroll;
    }

    .btn-product {
        display: flex;
        flex-direction: column;
    }

    .btn-product {
        padding-right: 0;
    }

    .list-info li span {
        min-width: 50px;
    }

}

@media only screen and (min-width: 736px) and (max-width: 767px) {
    .list-product li span {
        min-width: 100px;
        overflow-x: scroll;
    }

    .list-info li span {
        min-width: 100px;
    }

    .btn-product {
        padding-right: 0;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 768px) and (max-width:992px) {
    .list-product li span {
        min-width: 100px;
        overflow-x: scroll;
    }

    .list-info li span {
        min-width: 100px;
    }

    .btn-product {
        padding-right: 0;
    }

}</style>