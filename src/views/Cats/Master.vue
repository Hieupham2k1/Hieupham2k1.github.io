<template>
    <div>
    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <center class="modal-content">
                This is a simple Single Page Web use public service API from 
                <a href="https://thecatapi.com/" target="_blank">The Cat API</a> 
                to fetch kitties's cutest pictures.
            </center>
        </div>
    </div>
        <aside class="side-bar p-md-3">
            <div>
                <label>Category: </label>
                <select @change="toFirstPage()" v-model="params.category_ids" class="form-control">
                    <option value="" selected>All</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>

            <div>
                <label>Breed: </label>
                <select @change="params.category_ids=''; toFirstPage();" v-model="selectedBreed" class="form-control">
                    <option value="null" selected>All</option>
                    <option v-for="(breed, index) in breeds" :key="breed.id" :value="index">{{ breed.name }}</option>
                </select>
            </div>
            <div class="card cursor-pointer" data-toggle="modal" data-target=".bd-example-modal-lg">
                <div class="card-header bg-secondary text-light">
                    <small>What<span class="d-none d-sm-inline"> is this?</span></small>
                </div>
            </div>
        </aside>

        <div class="content">
            <div v-if="selectedBreed">{{ breeds[selectedBreed].description }}</div>

            <div>
                <center v-if="params.page > 1" class="cursor-pointer floating floating-left">
                    <span @click="() => { getImagesByPage(--params.page) }"><h1 class="m-none">&lt;&lt; </h1></span>
                </center>
                <center class="cursor-pointer floating floating-right">
                    <span @click="() => { getImagesByPage(++params.page) }"><h1 class="m-none"> &gt;&gt;</h1></span>
                </center>

                <div v-for="img in catImgages" :key="img.id" width="50">
                    <img :src="img.url" />
                </div>

                <center class="cursor-pointer my-2">
                    <span v-if="params.page > 1" @click="() => { getImagesByPage(--params.page) }"><b>&lt;&lt; </b></span>
                    <input v-model="params.page" class="form-control w-50 d-inline" />
                    <button @click="getImages()" class="btn">Go</button>
                    <span @click="() => { getImagesByPage(++params.page) }"><b> &gt;&gt;</b></span>
                </center>

                <center><h3 v-if="catImgages.length == 0 && !hasNoData">Loading...</h3></center>
                <center><h3 v-if="hasNoData">No result.</h3></center>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            params:{
                limit: 3,
                order: 'asc',
                page: 1,
                category_ids: '',
                breed_ids: '',
            },
            catImgages: [],
            categories: [],
            breeds: [],
            selectedBreed: null,
            hasNoData: false,
        }
    },
    methods:{
        getImages(){
            this.catImgages = [];
            this.hasNoData = false;
            this.$axios.get('https://api.thecatapi.com/v1/images/search', { params: this.params })
                .then((response) => {
                    this.catImgages = response.data;
                    if(this.catImgages.length == 0) this.hasNoData = true;
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        getImagesByPage(page){
            this.params.page = page;
            this.getImages();
        },
        getCategories(){
            this.$axios.get('https://api.thecatapi.com/v1/categories')
                .then((response) => {
                    this.categories = response.data;
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        getBreeds(){
            this.$axios.get('https://api.thecatapi.com/v1/breeds')
                .then((response) => {
                    this.breeds = response.data;
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        toFirstPage(){
            this.params.page = 1;
            this.params.breed_ids = this.selectedBreed ? this.breeds[this.selectedBreed].id : '';
            this.getImages();
        },
    },
    created(){
        this.getImagesByPage(this.page);
        this.getCategories();
        this.getBreeds();
    },
}
</script>

<style scoped>
    .side-bar{
        width: 20%;
        height: 100%;
        position: absolute;
        border-top: 5px solid pink;
    }
    .content{
        margin: 2% 20%;
    }
    .floating{
        position: fixed;
        top: 50%;
        color:aqua;
        background: transparent;
        border: 1px solid;
        border-radius: 1000px;
    }
    .floating-left{
        left: 20%;
    }
    .floating-right{
        right: 20%;
    }
    img{
        width: 100%;
        border-radius: 20px;
    }
    .card-body{
        background: white;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>