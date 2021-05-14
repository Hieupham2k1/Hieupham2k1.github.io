<template>
    <div>
        <aside class="side-bar p-md-3">
            <div v-for="option in options" :key="option.name" class="my-5">
                <router-link :to="{ name: option.name }">{{ option.name }} Matrix</router-link>
            </div>
        </aside>

        <div class="content">
            <router-view @copy="copyToList" @paste="paste" class="mx-5" />
        </div>

        <aside class="right-bar">
            <div class="my-3 text-center">Saved Matrices</div>
            <center v-for="(v, index) in varList" :key="index" class="my-3">
                <div>
                    <button @click="deleteFromList(index)" class="btn btn-danger">Delete</button>
                </div>
                <div class="col-12 box-center overflow-auto" :class="{ 'copied': v === copyMatrix }">
                    <Matrix 
                        :matrix="v"
                        :height="v.length"
                        :width="v[0].length"
                        :disabled="true"
                        @copy="copyFromList(index)"
                    />
                </div>
            </center>
        </aside>
    </div>
</template>

<script>
import Matrix from '@/components/Matrix/Matrix.vue';
export default {
    components:{
        Matrix,
    },
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
                alert('Too many copied matrices, please delete a few from the matrix list on the right.');
                return;
            }
            this.copyMatrix = matrix.map(val => [...val]);
            if(!this.varList.includes(this.copyMatrix)) this.varList.unshift(this.copyMatrix);
        },
        paste(data){
            let { reference, matrixName } = data;
            let copyMatrix = this.copyMatrix;
            let matrix = reference[matrixName];
            if(matrix.length == copyMatrix.length && matrix[0].length == copyMatrix[0].length){
                reference[matrixName] = copyMatrix.map(val => [...val]);
            } else alert("Matrixes's sizes are not match.");
        },
        getTriangleForm(matrix){
            let ans = matrix.map(val => [...val]);
            let k = 0;
            for(let i = ans.length - 1; i >= k; i--){
                if(i <= k){
                    i = ans.length - 1;
                    k++;
                }
                if(ans[k][k] == 0){
                    for(let j = 0; j < ans[0].length; j++){
                        ans[k][j] += ans[i][j];
                    }
                }
                let factor = (ans[i][k] == 0 && ans[k][k] == 0) ? 0 : ans[i][k] / ans[k][k];

                if(k >= ans.length - 1 || k > ans[0].length - 1) break;

                for(let j = 0; j < ans[0].length; j++){
                    ans[i][j] = ans[i][j] - ans[k][j] * factor;
                }
            }
            return ans;
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
        height: 100%;
        position: absolute;
        right: 0;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    .copied{
        border: 1px solid grey;
        border-radius: 10px;
    }
</style>