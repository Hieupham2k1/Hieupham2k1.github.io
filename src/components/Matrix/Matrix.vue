<template>
    <div>
        <center v-if="matrix.length != 0 && matrix[0] && matrix[0].length != 0" class="row justify-content-around">
            <button @click="$emit('copy')" class="btn btn-secondary"><i class="fas fa-copy"></i></button>
            <button @click="$emit('paste')" class="btn btn-secondary" v-if="!disabled"><i class="fas fa-paste"></i></button>
        </center>

        <table class="mx-auto">
            <tr v-for="row in height" :key="row" class="d-flex justify-content-center">
                <td v-for="col in width" :key="row+'-'+col" class="mx-1">
                    <input v-model="matrix[row - 1][col - 1]" :disabled="disabled" class="w-50px form-control" />
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ['matrix', 'height', 'width', 'disabled', ],
}
</script>

<style>

</style>