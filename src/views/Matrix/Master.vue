<template>
    <div>
        <aside class="side-bar p-md-3">
            <div v-for="option in options" :key="option.name" class="my-5">
                <router-link :to="{ name: option.name }">{{ option.name }} Matrix</router-link>
            </div>
        </aside>

        <div class="content">
            <router-view @copy="copyToList" class="mx-5" />
        </div>

        <aside class="right-bar">
            <div class="my-3 text-center">Saved Matrixes</div>
            <center v-for="(v, index) in varList" :key="index" class="my-3">
                <div>
                    <button @click="copyFromList(index)" class="btn btn-success">Copy</button>
                    <button @click="deleteFromList(index)" class="btn btn-danger">Delete</button>
                </div>
                <table class="col-12 col-md-3 box-center overflow-auto">
                    <tr v-for="(nums, row) in v" :key="row">
                        <td v-for="(num, col) in nums" :key="row+'-'+col" class="mx-1 w-50px border">
                            {{ num }}
                        </td>
                    </tr>
                </table>
            </center>
        </aside>
    </div>
</template>

<script>
export default {
    data(){
        return{
            options: {},
            varList: [],
            copyMatrix: [],
        }
    },
    methods:{
        copyFromList(index){
            this.copyMatrix = this.varList[index];
        },
        deleteFromList(index){
            this.varList.splice(index, 1);
        },
        copyToList(matrix){
            if(this.varList.length >= 10){
                alert('Too many copied matrixes, please delete a few from the matrix list on the right.');
                return;
            }
            this.copyMatrix = matrix;
            this.varList.unshift(matrix);
        },
        
    },
    created(){
        let routes = this.$router.options.routes;
        this.options = routes[routes.length - 1].children.find(val => val.name == 'Matrix').children;
    }
}
</script>

<style>
    .side-bar{
        width: 20%;
        height: 100%;
        position: absolute;
        border-right: 5px solid grey;
        border-radius: 50px;
    }
    .content{
        margin: 2% 20%;
    }
    .right-bar{
        width: 20%;
        height: 100%;
        position: absolute;
        right: 0;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
</style>