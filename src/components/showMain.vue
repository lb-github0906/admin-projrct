<template>
	<div class="main-contian">
		<div class="border-a"></div>
		<div class="border-b"></div>
		<div class="border-c"></div>
		<div class="border-d"></div>
		<div class="border-e"></div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
	.main-contian {
		height: 100%;
		width: 98%;
		display: flex;
		flex: 1;
		justify-content: space-between;
		background: #15bcff3d;
		.border-a {
			border: 1px solid #15bcff3d;
			margin: 10px;
			height: 180px;
			width: 360px;
			background: #690ce433;
		}
		.border-b {
			border: 1px solid #15bcff3d;
			margin: 10px;
			height: 260px;
			width: 760px;
			background: #cb6d0f33;
		}
		.border-c {
			border: 1px solid #15bcff3d;
			margin: 10px;
			height: 480px;
			width: 860px;
			background: #cb6d0f33;
		}
		.border-d {
			border: 1px solid #15bcff3d;
			margin: 10px;
			height: 300px;
			width: 660px;
			background: #cb6d0f33;
		}
		.border-e {
			border: 1px solid #15bcff3d;
			margin: 10px;
			height: 380px;
			width: 660px;
			background: #cb6d0f33;
		}
	}
</style>