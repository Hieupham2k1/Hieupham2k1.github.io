<template>
	<div id="app">
		<div id="nav">
			<h3>
				<router-link :to="{ name: 'Home' }">Hieupham2k1</router-link> | {{ $route.name }}</h3>
		</div>
		<router-view/>
	</div>
</template>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}

	#nav {
		background-image: url('./assets/nav-background.png');
		background-size: 170%;
		padding: 10%;
		display: flex;
		color: white;
		a {
			font-weight: bold;
			color: black;
			text-shadow: 0 0 3px #00ff55, 0 0 3px white;

			&.router-link-exact-active {
			color:black;
			text-shadow: 0 0 10px white;
			}
		}
	}
</style>
