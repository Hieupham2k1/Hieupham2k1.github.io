<template>
    <div>
        <select v-model="mode" class="form-control my-5">
            <option value="1">Matrix x Matrix</option>
            <option value="2">Matrix x Number</option>
            <option value="3">Matrix Square (M^n)</option>
        </select>

        <div class="row overflow-auto">
            <div class="col-12 box-center overflow-auto">
                <div class="d-flex justify-content-center my-1">
                    <span class="box-center">Size: </span>
                    <input @input="changeMatrixOneHeight" :value="matrixOneHeight" class="w-50px form-control" />
                    <span class="box-center"> x </span>
                    <input @input="changeMatrixOneWidth" :value="matrixOneWidth" class="w-50px form-control" />
                </div>

                <Matrix 
                    :matrix="matrix1"
                    :height="matrixOneHeight"
                    :width="matrixOneWidth"
                    :disabled="false"
                    @copy="$emit('copy', matrix1)"
                    @paste="pasteMatrix('matrix1')"
                />
            </div>

            <div v-if="mode != 3" class="box-center my-5 my-md-4">*</div>

            <div :class="'col-12 overflow-auto ' + ((mode != 3) ? 'box-center' : 'float-top')">
                <div v-if="mode == 1">
                    <div class="d-flex justify-content-center my-1">
                        <span class="box-center">Size: </span>
                        <input @input="changeMatrixOneWidth" :value="matrixOneWidth" class="w-50px form-control" />
                        <span class="box-center"> x </span>
                        <input @input="changeMatrixTwoWidth" :value="matrixTwoWidth" class="w-50px form-control" />
                    </div>

                    <Matrix 
                        :matrix="matrix2"
                        :height="matrixOneWidth"
                        :width="matrixTwoWidth"
                        :disabled="false"
                        @copy="$emit('copy', matrix2)"
                        @paste="pasteMatrix('matrix2')"
                    />
                </div>

                <div v-if="mode == 2">
                    <input v-model="k" class="w-50px form-control" />
                </div>

                <div v-if="mode == 3">
                    <input v-model="n" class="w-50px form-control" />
                </div>
            </div>


            <div class="box-center mx-auto"><button @click="calc()" class="btn btn-primary my-5 my-md-4">=</button></div>

            <div class="col-12 box-center overflow-auto">
                <Matrix 
                    :key="updateKey"
                    :matrix="answer"
                    :height="answer.length"
                    :width="answer[0].length"
                    :disabled="true"
                    @copy="$emit('copy', answer)"
                />
            </div>
        </div>
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
            matrixTwoWidth: 3,
            matrix2: [],
            answer: [[]],
            k: 1,
            n: 1,
            updateKey: 0,
        }
    },
    methods:{
        calc(){
            this.answer.length = 0;
            this.answer[0] = [];
            if(this.mode == 1){
                for(let i = 0; i < this.matrixOneHeight; i ++){
                    if(!this.answer[i]) this.answer[i] = [];
                    for(let k = 0; k < this.matrixTwoWidth; k++){
                        if(!this.answer[i][k]) this.answer[i][k] = 0;
                        for(let j = 0; j < this.matrixOneWidth; j++){
                            let a = this.matrix1[i][j];
                            let b = this.matrix2[j][k];
                            if(isNaN(a) || !a){
                                this.answer = [[]];
                                alert(`Matrix 1 has non-number value at [${i+1}][${j+1}].`);
                                return;
                            }
                            if(isNaN(b) || !b){
                                this.answer = [[]];
                                alert(`Matrix 1 has non-number value at [${j+1}][${k+1}].`);
                                return;
                            }
                            this.answer[i][k]  += a * b;
                        }
                    }
                }
                this.updateKey++;
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
            this.matrix1.length = input;
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
            for(let i = 0; i < this.matrixOneWidth; i++){
                if(!this.matrix1[i]) this.matrix1[i] = [];
                this.matrix1[i].length = input;
            }
            this.matrix2.length = input;
        },
        changeMatrixTwoWidth(event){
            let input = parseInt(event.target.value);
            if(isNaN(input) || !input){
                this.matrixTwoWidth = 0;
                return;
            }
            if(input > 10) input = 10;

            this.matrixTwoWidth = input;
            for(let i = 0; i < this.matrixTwoWidth; i++){
                if(!this.matrix2[i]) this.matrix2[i] = [];
                this.matrix2[i].length = input;
            }
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