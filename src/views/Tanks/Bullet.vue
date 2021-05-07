<template>
    <div ref="template" class="object" 
        :style="{ top: top + tankSize.height/2 + 'px', left:left + tankSize.width/2 + 'px', display: isShooting ? 'block' : 'none', }"
    >
        <i class="fas fa-tree"></i>
    </div>
</template>

<script>
export default {
    props: ['step', 'rotate', 'tankSize', 'isShooting', 'tankId', 'tanks' ],
    data(){
        return {
            top: '',
            left: '',
        }
    },
    methods:{
        shoot(){
            let t = 0;
            let position = {
                top: this.top,
                left: this.left,
            }
            const interval = setInterval(() => {
                this.top  = position.top - t * this.step;
                let hitTank = this.checkHit();
                if(++t > 50 || hitTank !== undefined){
                    clearInterval(interval);
                    this.top  = position.top;
                    this.left = position.left;
                    this.$emit('land', hitTank);
                }
            }, 10);
        },
        getPosition(){
            let element = this.$refs['template'];
            if(!element) return {};
            return {
                top: parseInt(element.style.top.replace('px', '') || 0),
                left: parseInt(element.style.left.replace('px', '') || 0),
            }
        },
        checkHit(){
            let tankPos = this.tanks[this.tankId].position;
            for(let id in this.tanks){
                if(this.tankId == id) continue;
                let currentTankPos = this.tanks[id].position;
                let bulletTop  = (this.top * Math.cos((tankPos.rotate % 360) / 180 * Math.PI));
                let bulletLeft = -(this.top * Math.sin((tankPos.rotate % 360) / 180 * Math.PI));
                let phi = (currentTankPos.rotate % 360) / 180 * Math.PI;
                let currentTankSize = this.tanks[id].size;
                let currentTankHeight = Math.max(Math.abs(currentTankSize.height * Math.cos(phi)), Math.abs(currentTankSize.width * Math.sin(phi)));
                let currentTankWidth = Math.max(Math.abs(currentTankSize.height * Math.sin(phi)), Math.abs(currentTankSize.width * Math.cos(phi)));
                let hit = Math.abs(tankPos.top + bulletTop - currentTankPos.top) < currentTankHeight / 2 && 
                          Math.abs(tankPos.left + bulletLeft - currentTankPos.left) < currentTankWidth / 2;
                if(hit) return id;
            }
        },

    },
    mounted(){
        let position = this.getPosition();
        this.top  = position.top;
        this.left = position.left;
    }
}
</script>

<style>

</style>