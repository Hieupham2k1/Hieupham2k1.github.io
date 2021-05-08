<template>
    <div class="text-center">
        <button @click="$router.back()">Back</button><button @click="deleteTank()" class="btn btn-danger m-5">DELETE</button>
    </div>
</template>

<script>
import { firebaseInit } from '@/api/firebase.js';
export default {
    methods:{
        deleteTank(){
            let params = this.$route.params;
            let tank = firebaseInit().collection('rooms').doc(params.roomId).collection('tanks').doc(params.tankId);
            tank.delete()
                .then(() => {
                    this.$router.push({ name: 'Login' });
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
        },
    },
}
</script>

<sty
Buttonle>

</style>