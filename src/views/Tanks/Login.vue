<template>
    <div>
        <div class="row justify-content-center">
            <div class="card p-3 col-12 col-md-8">
                <div class="card-header text-center my-3">Join a Room!</div>
                <div>
                    <label>Room ID:</label><input v-model="roomId" @keypress.enter="enter()" type="text" class="form-control">
                    <label>Tank ID:</label><input v-model="tankId" @keypress.enter="enter()" type="text" class="form-control">
                    <div class="row justify-content-center my-3">
                        <button @click="enter()" class="btn btn-primary col-4">Enter</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['loginParams'],
    data(){
        return {
            roomId: '',
            tankId: '',
            newRoom: false,
        }
    },
    methods:{
        enter(){
            let roomId = this.roomId.trim();
            let tankId = this.tankId.trim();
            if(roomId.length == 0 || tankId.length == 0){
                this.roomId = '';
                this.tankId = '';
                alert('Room ID and Tank ID are required.');
                return;
            }
            this.$emit('login', { roomId: this.roomId, tankId: this.tankId });
            this.$router.push({
                name: 'Room',
                params: {
                    roomId: this.roomId,
                    tankId: this.tankId,
                },
            });
        }
    },
    created(){
        if(this.loginParams.roomId) this.roomId = this.loginParams.roomId;
        if(this.loginParams.tankId) this.tankId = this.loginParams.tankId;
    }
}
</script>
