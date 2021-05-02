<template>
    <center class="home mb-5">
		<div class="row">
			<div class="col-12 col-md-4 mb-5 mb-md-0">
				<h5>Welcome</h5>
				<div>
					My name is <a href="https://www.facebook.com/hieupham19072001/" target="_blank">Pham Trung Hieu</a>,
					i'm looking for a Software Development job.<br>
					If you are wondering am i the one you're looking for, 
					please give me a call ( 0989063201 ) and let me convince you.
				</div>
			</div>
			<div class="col-12 col-md-8">
				<h5>About Me</h5>
				<div class="text-light text-left">
					-I'm studying Computer Enginering at Hanoi University of Science and Technology.<br>
					-I have exprerience in Web Development since March 2020.<br>
					-I can read and use English Technology Documents.<br>
					-I have exprerience in using Linux Ubuntu OS.<br>
					-I have exprerience in working in a team and working for clients.<br>
					-A few of my projects are listed down below.<br>
				</div>
			</div>
		</div>
		<h3>My Projects</h3>
		<div class="d-md-flex">
			<div v-for="route in $router.options.routes[$router.options.routes.length - 1].children"
				:key="route.name" 
				style="min-height: 100px;"
				class="card col-4"
			>
				<h3><router-link :to="route.path">{{ route.name }}</router-link></h3>
				<center><img :src="'/demo/' + route.name + '.png'"/></center>
			</div>
		</div>
    </center>
</template>

<script>
export default {
    name: 'Home',
}
</script>
<style scoped>
	.row{
		padding: 0 20%;
	}
	.col-md-8{
		position: relative;
		top: -50px;
		background: linear-gradient(-45deg, #2d9254, #68CCCA);
		min-height: 100px;
		border-radius: 10px;
	}
	iframe{
		transform: scale(0.3, 0.3);
		height: 100vh;
		width: 100vw;
		position: relative;
		z-index: 100;
		top: -30vh;
	}
	.projects{
		display: flex;
		overflow: auto;
	}
	img{
		width: 100%;
		min-height: 100px;
	}
	.d-md-flex{
		overflow: auto;
		max-height: 300px;
	}
</style>
