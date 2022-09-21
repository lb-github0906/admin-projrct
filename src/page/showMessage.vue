<template>
  <div>
    <div>
			<el-button type="primary" @click="back()" round>主要按钮</el-button>
    </div>
  </div>
</template>

<script>
export default {
	methods: {
		back() {
			console.log(1111);
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="less" scoped>

</style>