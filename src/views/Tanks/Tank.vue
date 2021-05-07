<template>
    <div ref="template" class="object" :class="{ 'rock-hard': isBlocking }"
        :style="{ top: position.top+'px', left: position.left+'px', transform: 'rotate('+position.rotate+'deg)' }"
    >
        <div class="tank-gun">II</div>
        <div class="tank-gun">I
            <Bullet ref="bullet"
                :step="step"
                :rotate="position.rotate"
                :tankSize="size"
                :isShooting="isShooting"
                :tankId="id"
                :tanks="tanks"
                @land="bulletLand"
             />
            I</div>
        <div class="tank-gun">I{{ bullets }}I</div>
        <div class="tank-body">
            <div style="border-bottom: 1px solid;">{{ id }}</div>
            <div style="color: red;"><i class="fas fa-heartbeat"></i>{{ health }}</div>
            <div><i class="fas fa-umbrella"></i>{{ blockCountdown }}</div>
        </div>
        <div class="tank-jet">X|{{ jumpCountdown }}|X</div>
    </div>
</template>

<script>
import Bullet from './Bullet.vue';
export default {
    components:{
        Bullet,
    },
    props: ['id', 'position', 'bullets', 'step', 'tanks', 'health',],
    data(){
        return {
            isShooting: false,
            isBlocking: false,
            jumpCountdown: 10,
            blockCountdown: 10,
            size:{
                width: 0,
                height: 0,
            }
        }
    },
    methods:{
        shoot(){
            if(this.isShooting || this.bullets <= 0 || this.health <= 0) return;
            this.isShooting = true;
            this.$emit('isShooting');
            this.$refs['bullet'].shoot();
        },
        jump(){
            if(this.jumpCountdown > 0) return;
            this.$emit('jump', {
                nextPosX: this.position.left + 20 * this.step * Math.cos((this.position.rotate - 90) / 180 * Math.PI),
                nextPosY: this.position.top  + 20 * this.step * Math.sin((this.position.rotate - 90) / 180 * Math.PI),
            });
            this.jumpCountdown = 10;
            const interval = setInterval(() => {
                this.jumpCountdown--;
                if(this.jumpCountdown <= 0) clearInterval(interval);
            }, 1000);
        },
        block(){
            if(this.blockCountdown > 0) return;
            this.$emit('block');
            this.isBlocking = true;
            setTimeout(() => {
                this.isBlocking = false;
            }, 1000);
            this.blockCountdown = 10;
            
            const interval = setInterval(() => {
                this.blockCountdown--;
                if(this.blockCountdown <= 0) clearInterval(interval);
            }, 1000);
        },
        bulletLand(hitTank){
            this.isShooting = false;
            if(hitTank !== undefined) this.$emit('hit', hitTank);
        },
    },
    mounted(){
        this.jumpCountdown = 10;
        const jumpInterval = setInterval(() => {
            this.jumpCountdown--;
            if(this.jumpCountdown <= 0) clearInterval(jumpInterval);
        }, 1000);

        this.blockCountdown = 10;
        const blockInterval = setInterval(() => {
            this.blockCountdown--;
            if(this.blockCountdown <= 0) clearInterval(blockInterval);
        }, 1000);

        this.size = {
            height: this.$refs['template'].clientHeight,
            width: this.$refs['template'].clientWidth,
        }
    }
}
</script>

<style>
    .tank-gun{
        color: green;
        text-align: center;
    }
    .tank-body{
        border-top: 1px solid;
        border-bottom: 1px solid;
        border-left: 1px dashed;
        border-right: 1px dashed;
        text-align: center;
        min-width: 50px;
        color: green;
    }
    .health{
        color: red;
    }
    .tank-jet{
        color: red;
        text-align: center;
        border: 1px solid grey;
    }
    .rock-hard{
        background: black;
        border-radius: 20px 20px 0px 0px;
    }
</style>