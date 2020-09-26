<template>
	<div id="overlay">
		{{ stuff }} {{ things }}
	</div>
</template>

<script lang="js">

export default {
	name: "Overlay",
	components: { },
	data: function() { return {
		stuff: 'Default Overlay HELLO!',
		things: 123,
	}},
}
</script>

<style lang="less">
#overlay {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;

	font-size: 40px;
	color: white;
}


</style>
