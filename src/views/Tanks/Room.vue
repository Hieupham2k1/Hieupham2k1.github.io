<template>
    <div class="row my-3">
        <aside class="side-bar p-md-3 col-12 col-md-3 order-3 order-md-1">
            <div class="my-3 text-center">Chat Box</div>
            <div class="message-container">
                <div v-for="(message, index) in messages" :key="index" class="d-flex my-3"
                    :style="{ flexDirection: (message.id == tankId) ? 'row-reverse' : 'row' }"
                >
                    <span class="message-id">{{ message.id }}</span><span class="mx-1">:</span>
                    <span class="message-content" :class="(message.id == tankId) ? 'bg-primary' : 'bg-secondary'">{{ message.content }}</span>
                </div>
            </div>
            <div class="d-flex mb-3">
                <input v-model="newMessage" 
                    @keypress="send"
                    @focus="stopKeyListen()"
                    @blur="startKeyListen()"
                    class="form-control"
                />
                <button @click="send({ code: 'Enter' })" class="btn btn-primary"><i class="fas fa-paper-plane"></i></button>
            </div>
        </aside>

        <div class="content col-12 col-md-6 order-2">
            <div id="field">
                <Tank v-for="(tank, id) in tanks" :key="id"
                    :ref="id" :id="id" 
                    :position="tank.position"
                    :bullets="tank.bullets"
                    :health="tank.health"
                    :step="step"
                    :tanks="tanks"
                    @isShooting="tank.bullets--"
                    @jump="tank.position.top = $event.nextPosY; tank.position.left = $event.nextPosX; tank.jump++;"
                    @block="tank.block++;"
                    @hit="hitTank"
                />
            </div>
        </div>

        <aside class="col-12 col-md-3 order-5 overflow-auto" style="height: 500px;">
            <div>How to move:</div>
            <div class="mx-3">
                <div>W: move forward</div>
                <div>S: move backward</div>
                <div>I: turn left</div>
                <div>E: turn right</div>
                <div>J: shoot</div>
                <div>K: jump</div>
                <div>L: block</div>
                <div>C + Enter: Enter chat box</div>
                <div>Shift + Enter: Exit chat box</div>
            </div>
            <div class="tank-gun">II</div>
            <div class="tank-gun">II</div>
            <div class="tank-gun">I bullets I</div>
            <div class="tank-body">
                <div style="border-bottom: 1px solid;"> tank id </div>
                <div style="color: red;"><i class="fas fa-heartbeat"></i> health </div>
                <div><i class="fas fa-umbrella"></i> block cooldown </div>
            </div>
            <div class="tank-jet">X| jump cooldown |X</div>
            <div>Rules:</div>
            <div class="mx-3 mb-5">
                <div>-bullets + 1 after 10s</div>
                <div>-if jump cooldown = 0, you can use jump</div>
                <div>-after you jump, jump cooldown = 10</div>
                <div>-jump can be used to dodge bullet</div>
                <div>-same with block</div>
                <div>-block can be used to block bullet</div>
                <div>-if health &lt; 10, health + 1 after 10s</div>
                <div>-if health = 0, you can not shoot</div>
                <router-link :to="{ name: 'Delete', params:{ roomId, tankId } }">
                    Delete your tank
                </router-link>
            </div>
        </aside>
        <div class="joystick row d-lg-none">
            <div class="col">
                <div class="d-flex justify-content-center my-3">
                    <button @touchstart="buttonDown('KeyW')" @touchend="buttonUp('KeyW')" @mouseup="quickDispatch('KeyW')" class="btn btn-secondary">
                        <i class="fas fa-chevron-circle-up"></i>
                    </button>
                </div>
                <div class="d-flex justify-content-center my-3">
                    <button @touchstart="buttonDown('KeyS')" @touchend="buttonUp('KeyS')" @mouseup="quickDispatch('KeyS')" class="btn btn-secondary">
                        <i class="fas fa-chevron-circle-down"></i>
                    </button>
                </div>
            </div>
            <div class="col">
                <div class="d-flex justify-content-center my-3">
                    <button @touchstart="buttonDown('KeyI')" @touchend="buttonUp('KeyI')" @mouseup="quickDispatch('KeyI')" class="btn btn-secondary">
                        <i class="fas fa-undo"></i>
                    </button>
                    <span class="mx-3">-</span>
                    <button @touchstart="buttonDown('KeyO')" @touchend="buttonUp('KeyO')" @mouseup="quickDispatch('KeyO')" class="btn btn-secondary">
                        <i class="fas fa-undo" style="transform: rotateY(180deg);"></i>
                    </button>
                </div>
                <div class="d-flex justify-content-center my-3">
                    <button @touchstart="buttonDown('KeyJ')" @touchend="buttonUp('KeyJ')" @mouseup="quickDispatch('KeyJ')" class="btn btn-secondary">
                        <i class="fas fa-meteor"></i>
                    </button>
                    <button @touchstart="buttonDown('KeyK')" @touchend="buttonUp('KeyK')" @mouseup="quickDispatch('KeyK')" class="mx-3 btn btn-secondary">
                        <i class="fas fa-wind"></i>
                    </button>
                    <button @touchstart="buttonDown('KeyL')" @touchend="buttonUp('KeyL')" @mouseup="quickDispatch('KeyL')" class="btn btn-secondary">
                        <i class="fas fa-umbrella"></i>
                    </button>
                </div>
            </div>
        </div>
            
    </div>
</template>

<script>
import { firebaseInit } from '@/api/firebase.js';
import Tank from '@/components/Tanks/Tank.vue';
export default {
    components: {
        Tank,
    },
    data(){
        return {
            db: {},
            roomId: '',
            tankId: '',
            step: 10,
            tanks: {},
            newMessage: '',
            messages: [],
            pressedKeys: {},
            newMessageInterval: {},
            bulletInterval: {},
            dispatchInterval: {},
        }
    },
    methods:{
        buttonDown(code){
            this.pressedKeys[code] = true;
        },buttonUp(code){
            this.pressedKeys[code] = false;
        },
        quickDispatch(code){
            this.pressedKeys[code] = true;
            this.dispatch();
            this.pressedKeys[code] = false;
        },
        dispatch(){
            if(!this.tanks[this.tankId]) return;
            let tankPos = this.tanks[this.tankId].position;
            let tankObject = this.$refs[this.tankId][0];
            let hasChange = false;
            if(this.pressedKeys["KeyS"]){
                tankPos.left -= this.step * Math.cos((tankPos.rotate - 90) / 180 * Math.PI);
                tankPos.top  -= this.step * Math.sin((tankPos.rotate - 90) / 180 * Math.PI);
                hasChange = true;
            }
            if(this.pressedKeys["KeyW"]){
                tankPos.left += this.step * Math.cos((tankPos.rotate - 90) / 180 * Math.PI);
                tankPos.top  += this.step * Math.sin((tankPos.rotate - 90) / 180 * Math.PI);
                hasChange = true;
            }
            if(this.pressedKeys["KeyI"]){
                tankPos.rotate -= 10;
                hasChange = true;
            }
            if(this.pressedKeys["KeyO"]){
                tankPos.rotate += 10;
                hasChange = true;
            }
            if(this.pressedKeys["KeyJ"]){
                tankObject.shoot();
                hasChange = true;
            }
            if(this.pressedKeys["KeyK"]){
                tankObject.jump();
                hasChange = true;
            }
            if(this.pressedKeys["KeyL"]){
                tankObject.block();
                hasChange = true;
            }
            if(this.pressedKeys["Enter"] && this.pressedKeys["KeyC"]){
                document.querySelector('input.form-control').focus();
            }
            if(hasChange) this.setTankInfo(this.tankId);
        },
        cumulativeOffset(element){
            var top = 0, left = 0;
            do {
                top += element.offsetTop  || 0;
                left += element.offsetLeft || 0;
                element = element.offsetParent;
            } while(element);

            return { top, left };
        },
        setTankInfo(tankId){
            let tankObject = this.$refs[tankId][0];
            if(!this.tanks[tankId].size && tankObject){
                this.tanks[tankId].size = {
                    height: tankObject.$el.clientHeight,
                    width: tankObject.$el.clientWidth,
                }
            }
            this.tanks[tankId].position.rotate %= 360;
            this.db.collection('rooms').doc(this.roomId).collection('tanks').doc(tankId).set(this.tanks[tankId])
            .then((docRef) => {
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        },
        roomSnapshotInit(){
            this.db.collection('rooms').doc(this.roomId).collection('tanks')
            .onSnapshot((querySnapshot) => {
                if(!this.tanks[this.tankId]) this.tanks[this.tankId] = {
                    position:{
                        top: 0,
                        left: 0,
                        rotate: 0,
                    },
                    bullets: 10,
                    jump: 0,
                    block: 0,
                    health: 10,
                }
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    let tank = this.tanks[doc.id];
                    let tankObject = this.$refs[doc.id]?.[0];
                    if(tankObject && tank){
                        if(tank.bullets > data.bullets){
                            tankObject.shoot();
                        }
                        if(tank.jump < data.jump){
                            tankObject.jump();
                        }
                        if(tank.block < data.block){
                            tankObject.block();
                        }
                    }
                    this.tanks[doc.id] = { ...data };
                });
                this.$forceUpdate();
            });

            this.db.collection('rooms').doc(this.roomId).collection('messages').orderBy('time', 'desc').limit(10)
            .onSnapshot((querySnapshot) => {
                this.messages.length = 0;
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    this.messages.unshift(data);
                    let messageContainer = document.querySelector('.message-container');
                    messageContainer.scrollTop = messageContainer.scrollHeight;
                });
                if(this.messages[this.messages.length - 1]?.id != this.tankId){
                    this.newMessageInterval = setInterval(() => {
                        let title = document.title;
                        if(title.indexOf('(1)') != -1) document.title = title.replace('(1)', '');
                        else document.title = '(1)' + document.title;
                    }, 2000);
                }
            });
        },
        getElementPosition(id){
            let element = document.getElementById(id);
            if(!element) return {};
            return {
                top: parseInt(element.style.top.replace('px', '') || 0),
                left: parseInt(element.style.left.replace('px', '') || 0),
                rotate: parseInt(element.style.transform.replace('rotate(', '').replace('deg)', '') || 0),
            }
        },
        setElementPosition(id, position){
            let element = document.getElementById(id);
            if(!element){
                element = document.createElement('div');
                element.innerHTML = id;
                element.id = id;
                element.classList.add('object');
                document.getElementById('field').appendChild(element);
            }
            
            if(position.top !== undefined) element.style.top = position.top + 'px';
            if(position.left !== undefined) element.style.left = position.left + 'px';
            if(position.rotate !== undefined) element.style.transform = `rotate(${position.rotate}deg)`;
            return element;
        },
        hitTank(tankId){
            let tankObject = this.$refs[tankId]?.[0];
            if(tankObject && !tankObject.isBlocking){
                let tankHealth = this.tanks[tankId].health;
                if(tankHealth <= 0) return;
                this.tanks[tankId].health = tankHealth - 1;
                this.setTankInfo(tankId);
            }
        },
        send(event){
            if(event.code !== 'Enter') return;
            if(event.shiftKey){
                document.querySelector('input.form-control').blur();
                return;
            }
            
            let newMessage = this.newMessage.trim();
            if(!newMessage) return;
            this.newMessage = '';
            this.db.collection('rooms').doc(this.roomId).collection('messages').add({
                id: this.tankId,
                content: newMessage,
                time: Date.now(),
            })
            .then((docRef) => {
            })
            .catch((error) => {
                this.newMessage = newMessage;
                console.error("Error adding document: ", error);
            });
        },
        startKeyListen(){
            
            window.onkeydown = e => this.pressedKeys[e.code] = true;
            window.onkeyup = e => this.pressedKeys[e.code] = false;
        },
        stopKeyListen(){
            window.onkeydown = null;
            window.onkeyup = null;
            clearInterval(this.newMessageInterval);
            document.title = document.title.replace('(1)', '');
        },
        resize(){
            let joystick = document.querySelector('.joystick');
            joystick.style.width = window.screen.innerHeight + 'px';
            joystick.style.top = window.innerHeight - joystick.clientHeight + 'px';
        },
    },
    created(){
        this.roomId = this.$route.params.roomId;
        this.tankId = this.$route.params.tankId;
        this.db = firebaseInit();
        this.roomSnapshotInit();
    },
    mounted(){
        this.startKeyListen();
        this.bulletInterval = setInterval(() => {
            let tank = this.tanks[this.tankId];
            this.tanks[this.tankId].bullets = (isNaN(tank.bullets)) ? 0 : tank.bullets + 1; 
            if(tank.health < 10) this.tanks[this.tankId].health++;
            this.setTankInfo(this.tankId);
        }, 10000);
        this.dispatchInterval = setInterval(() => {
            this.dispatch();
        }, 50);
        window.onresize = () => this.resize();
        this.resize();
    },
    destroyed(){
        this.stopKeyListen();
        clearInterval(this.bulletInterval);
        clearInterval(this.dispatchInterval);
    }
}
</script>

<style>
    .side-bar{
        height: 100%;
        border-right: 5px solid grey;
        border-radius: 50px;
    }
    .message-container{
        height: 358px;
        overflow: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .message-container::-webkit-scrollbar {
        display: none;
    }
    .right-bar{
        height: 100%;
        right: 0;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    #field{
        border: 1px solid;
        min-height: 500px;
    }
    .object{
        position: absolute;
        width: fit-content;
        z-index: 100;
    }
    .message-id{
        text-decoration: underline;
        min-width: 50px;
    }
    .message-content{
        padding: 10px;
        word-break: break-all;
        background: aqua;
        border-radius: 10px;
        color: white;
    }
    .joystick{
        width: 100vw;
        position: fixed;
        bottom: 0;
    }
</style>