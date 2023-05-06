<script>
export default {
    props: {
        productLocal: { type: Object, required: true },
        showimg: { type: Boolean },
        imgs:{type : Array}
    },
    data() {
        return {
            upImg: [],
            product: this.productLocal,
            imgProduct: this.imgs,
        }
    },
    emits: ['submit:product'],
    methods: {
        getformproduct(e) {
            this.$emit('submit:product', this.product);
        },
        onFileChange(event) {
            const files = event.target.files;
            const numImages = this.imgProduct.length;
            if (numImages < 4) {
                this.imgProduct.push(files[0]);
            } else {
                console.log("Qua so anh");
            }
            for(let i=0;i<this.imgProduct.length;i++){
                if(numImages < 4){
                    this.upImg[numImages] = URL.createObjectURL(this.imgProduct[i]);
                }
            }
        },
        delImg(i) {
            if (this.imgProduct[i]) {
                URL.revokeObjectURL(this.imgProduct[i]);
                this.imgProduct.splice(i, 1);
                this.upImg.splice(i, 1);
            }
        }
    }
}
</script>
<template>
    <form class="was-validated" @submit.prevent="getformproduct()">
        <div class="mb-3 mt-3">
            <label for="name" class="form-label">Tên sản phẩm:</label>
            <input type="text" class="form-control" id="name" placeholder="Nhập tên sản phẩm...." name="name" required
                v-model="this.product.title">
        </div>
        <div class="mb-3 mt-3">
            <label for="description" class="form-label">Mô tả sản phẩm:</label>
            <textarea type="text" class="form-control" id="description" placeholder="Nhập mô tả sản phẩm...."
                name="description" required v-model="this.product.description"></textarea>
        </div>
        <div class="mb-3 mt-3">
            <label for="price" class="form-label">Giá sản phẩm:</label>
            <input type="number" class="form-control" id="price" placeholder="Nhập giá sản phẩm...." name="price" required
                min="1" v-model="this.product.price">
        </div>
        <div class="mb-3 mt-3">
            <label for="category" class="form-label">Thể loại sản phẩm:</label>
            <input type="text" class="form-control" id="category" placeholder="Nhập loại sản phẩm...." name="category"
                required v-model="this.product.category">
        </div>
        <div class="mb-3 mt-3">
            <label for="brand" class="form-label">Thương hiệu sản phẩm sản phẩm:</label>
            <input type="text" class="form-control" id="brand" placeholder="Nhập thương hiệu sản phẩm...." name="brand"
                required v-model="this.product.brand">
        </div>
        <div class="mb-3 mt-3">
            <label for="quantity" class="form-label">Số lượng sản phẩm sản phẩm:</label>
            <input type="number" class="form-control" id="quantity" placeholder="Nhập số lượng sản phẩm sản phẩm...."
                name="quantity" required v-model="this.product.quantity" min="1">
        </div>
        <div class="mb-3 mt-3 form-img" v-if="showimg">
            <label for="image1">Nhập ảnh sản phẩm :</label>
            <div class="file-upload">
                <input type="file" class="" id="image1" name="image1" required v-on:change="onFileChange">
                <i class="fa fa-plus icon-upload"></i>
            </div>
            <div v-for="(image, index) in upImg" :key="index" class="file-upload">
                <img :src="image" class="img-product">
                <i class="fa-sharp fa-solid fa-xmark icon-del" @click="delImg(index)"></i>
            </div>
        </div>
        <div class="mb-3 mt-3">
            <label for="color" class="form-label">Nhập màu sản phẩm:</label>
            <input type="text" class="form-control" id="color" placeholder="Nhập màu sản phẩm...." name="color" required
                v-model="this.product.color">
        </div>
        <button type="submit" class="btn btn-danger">Lưu</button>
        <router-link to="/" class="btn btn-primary" style="margin-left: 8px;">Trờ về</router-link>
    </form>
</template>
<style scoped>
.form-img {
    display: flex;
}

.form-img .file-upload {
    margin: 0 16px;
}

.file-upload {
    height: 50px;
    width: 50px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px solid #FFFFFF;
    overflow: hidden;
    border: 1px var(--color--main--) solid;
    transition: all .3s;
    color: #FFFFFF;
    font-size: 100px;
}

input[type='file'] {
    height: 50px;
    width: 50px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 1;
}

.icon-upload {
    font-size: 30px;
    color: var(--color--main--);
}

.file-upload:hover .icon-upload {
    opacity: 0.5;
}

.img-product {
    position: relative;
    width: 100%;
    height: 100%;
}

.icon-del {
    position: absolute;
    color: var(--color--main--);
    font-size: 15px;
    top: 0;
    right: 0;
    z-index: 2;
}

.icon-del:hover {
    opacity: 0.5;
}
</style>