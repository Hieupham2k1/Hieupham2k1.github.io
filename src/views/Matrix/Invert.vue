<template>
    <div>
        <div class="d-flex justify-content-center my-5">
            <span class="box-center">Size: </span>
            <input @input="changeMatrixOneHeight" :value="matrixOneHeight" class="w-50px form-control" />
            <span class="box-center"> x </span>
            <input @input="changeMatrixOneHeight" :value="matrixOneHeight" class="w-50px form-control" />
        </div>
        <center class="row justify-content-center overflow-auto">
            <div class="col-12 box-center overflow-auto">
                <Matrix 
                    :matrix="matrix1"
                    :height="matrixOneHeight"
                    :width="matrixOneHeight"
                    :disabled="false"
                    @copy="$emit('copy', matrix1)"
                    @paste="pasteMatrix('matrix1')"
                />
            </div>

            <div class="box-center"><button @click="calc()" class="btn btn-primary my-5 my-md-4">Invert</button></div>

            <div class="col-12 box-center overflow-auto">
                <Matrix 
                    :matrix="answer"
                    :height="answer.length"
                    :width="answer[0].length"
                    :disabled="true"
                    @copy="$emit('copy', answer)"
                />
            </div>
        </center>
    </div>
</template>

<script>
import Matrix from '@/components/Matrix/Matrix.vue';
export default {
    components:{
        Matrix,
    },
    data(){
        return {
            mode: 1,
            matrix1: [],
            matrixOneHeight: 3,
            matrixOneWidth: 3,
            matrix2: [],
            answer: [[]],
            det: 1, 
        }
    },
    methods:{
        calc(){
            this.answer = [];
            this.answer[0] = [];
            for(let i = 0; i < this.matrixOneHeight; i++){
                if(!this.answer[i]) this.answer[i] = [];
                for(let j = 0; j < this.matrixOneWidth; j++){
                    let a = parseInt(this.matrix1[i][j]);
                    let b = parseInt(this.matrix2[i][j]);
                    if(isNaN(a) || !a){
                        this.answer = [];
                        alert(`Matrix 1 has non-number value at [${i+1}][${j+1}].`);
                        return;
                    }
                    if(isNaN(b) || !b){
                        this.answer = [];
                        alert(`Matrix 1 has non-number value at [${i+1}][${j+1}].`);
                        return;
                    }
                    this.answer[i][j] = (this.mode == 1) ? a + b : a - b;
                }
            }
            this.$forceUpdate();
        },
        changeMatrixOneHeight(event){
            let input = parseInt(event.target.value);
            if(isNaN(input) || !input){
                this.matrixOneHeight = 0;
                return;
            }
            if(input > 10) input = 10;

            if(input > this.matrix1.length){
                for(let i = 0; i < input; i++){
                    if(!this.matrix1[i]) this.matrix1[i] = [];
                    if(!this.matrix2[i]) this.matrix2[i] = [];
                }
            }
            this.matrixOneHeight = input;
            this.matrix1.length = input;
        },
        changeMatrixOneWidth(event){
            let input = parseInt(event.target.value);
            if(isNaN(input) || !input){
                this.matrixOneWidth = 0;
                return;
            }
            if(input > 10) input = 10;

            this.matrixOneWidth = input;
        },
        pasteMatrix(matrixName){
            this.$emit('paste', { reference: this, matrixName });
        },
    },
    created(){
        this.matrix1 = [
            [1,2,3],
            [4,5,6],
            [7,8,9],
        ]
        this.matrix2 = [
            [1,1,1],
            [1,1,1],
            [7,8,9],
        ]
    },
}
</script>

<style>
    .float-top{
        position: relative;
        top: -30px;
    }
    .w-50px{
        width: 50px;
    }
</style>