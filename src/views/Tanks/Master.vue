<template>
    <div>
        <div>
            <router-view @login="loginParams = $event" :loginParams="loginParams" class="mx-5" />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loginParams: {},
        }
    },
}
</script>


<style>
    
</style>