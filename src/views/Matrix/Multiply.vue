<template>
    <div>
        <select v-model="mode" class="form-control my-5">
            <option value="1">Matrix x Matrix</option>
            <option value="2">Matrix x Number</option>
            <option value="3">Matrix Square (M^n)</option>
        </select>

        <div class="row overflow-auto">
            <div class="col-12 col-md-3 box-center overflow-auto">
                <div class="d-flex justify-content-center my-1">
                    <span class="box-center">Size: </span>
                    <input @input="changeMatrixOneHeight" :value="matrixOneHeight" class="w-50px form-control" />
                    <span class="box-center"> x </span>
                    <input @input="changeMatrixOneWidth" :value="matrixOneWidth" class="w-50px form-control" />
                </div>

                <div v-for="row in matrixOneHeight" :key="row" class="d-flex">
                    <span v-for="col in matrixOneWidth" :key="row+'-'+col" class="mx-1">
                        <input v-model="matrix1[row - 1][col - 1]" class="w-50px form-control" />
                    </span>
                </div>

                <center class="my-1">
                    <button @click="$emit('copy', matrix1)" class="btn btn-success">Copy</button>
                    <button @click="pasteMatrix('matrix1')" class="btn btn-warning">Paste</button>
                </center>
            </div>

            <div v-if="mode != 3" class="col-12 col-md-1 box-center my-5 my-md-4">*</div>

            <div :class="'col-12 col-md-3 overflow-auto ' + ((mode != 3) ? 'box-center' : 'float-top')">
                <div v-if="mode == 1">
                    <div class="d-flex justify-content-center my-1">
                        <span class="box-center">Size: </span>
                        <input @input="changeMatrixOneWidth" :value="matrixOneWidth" class="w-50px form-control" />
                        <span class="box-center"> x </span>
                        <input @input="changeMatrixTwoWidth" :value="matrixTwoWidth" class="w-50px form-control" />
                    </div>

                    <div v-for="row in matrixOneWidth" :key="row" class="d-flex">
                        <span v-for="col in matrixTwoWidth" :key="row + '-' + col" class="mx-1">
                            <input v-model="matrix2[row - 1][col - 1]" class="w-50px form-control" />
                        </span>
                    </div>

                    <center class="my-1">
                        <button @click="$emit('copy', matrix2)" class="btn btn-success">Copy</button>
                        <button @click="pasteMatrix('matrix2')" class="btn btn-warning">Paste</button>
                    </center>
                </div>

                <div v-if="mode == 2">
                    <input v-model="k" class="w-50px form-control" />
                </div>

                <div v-if="mode == 3">
                    <input v-model="n" class="w-50px form-control" />
                </div>
            </div>


            <div class="col-12 col-md-1 box-center"><button @click="calc()" class="btn btn-primary my-5 my-md-4">=</button></div>

            <table class="col-12 col-md-3 box-center">
                <tr v-for="(nums, row) in answer" :key="row">
                    <td v-for="(num, col) in nums" :key="row+'-'+col" class="mx-1 w-50px border">
                        {{ num }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            mode: 1,
            matrix1: [],
            matrixOneHeight: 3,
            matrixOneWidth: 3,
            matrixTwoWidth: 3,
            matrix2: [],
            answer: [],
            k: 1,
            n: 1,
        }
    },
    methods:{
        calc(){
            this.answer.length = 0;
            if(this.mode == 1){
                for(let i = 0; i < this.matrixOneHeight; i ++){
                    if(!this.answer[i]) this.answer[i] = [];
                    for(let k = 0; k < this.matrixTwoWidth; k++){
                        if(!this.answer[i][k]) this.answer[i][k] = 0;
                        for(let j = 0; j < this.matrixOneWidth; j++){
                            let a = this.matrix1[i][j];
                            let b = this.matrix2[j][k];
                            if(isNaN(a) || !a){
                                this.answer = [];
                                alert(`Matrix 1 has non-number value at [${i+1}][${j+1}].`);
                                return;
                            }
                            if(isNaN(b) || !b){
                                this.answer = [];
                                alert(`Matrix 1 has non-number value at [${j+1}][${k+1}].`);
                                return;
                            }
                            this.answer[i][k]  += a * b;
                        }
                    }
                }
                this.$forceUpdate();
                return;
            }
            if(this.mode == 2){
                let hasNaN = false;
                this.answer = this.matrix1.map(val => {
                    let row = val.map(val2 => {
                        if(isNaN(val2)) hasNaN = true;
                        return val2 * this.k;
                        });
                    return row;
                });
                if(hasNaN) alert('Matrix 1 has non-number value.');
                this.$forceUpdate();
                return;
            }
            // TODO matrix power
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
                }
            }
            this.matrixOneHeight = input;
        },
        changeMatrixOneWidth(event){
            let input = parseInt(event.target.value);
            if(isNaN(input) || !input){
                this.matrixOneWidth = 0;
                return;
            }
            if(input > 10) input = 10;

            if(input > this.matrix2.length){
                for(let i = 0; i < input; i++){
                    if(!this.matrix2[i]) this.matrix2[i] = [];
                }
            }
            this.matrixOneWidth = input;
        },
        changeMatrixTwoWidth(event){
            let input = parseInt(event.target.value);
            if(isNaN(input) || !input){
                this.matrixTwoWidth = 0;
                return;
            }
            if(input > 10) input = 10;

            this.matrixTwoWidth = input;
        },
        pasteMatrix(matrixName){
            let copyMatrix = this.$parent.copyMatrix;
            let matrix = this[matrixName];
            if(matrix.length == copyMatrix.length && matrix[0].length == copyMatrix[0].length){
                this[matrixName] = copyMatrix;
            } else alert("Matrixes's sizes are not match.");
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