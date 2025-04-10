<script setup lang="tsx">
import ThreeController from '../../utils/controller/three-controller'

let dataCenterView: ThreeController
onMounted(() => {
  dataCenterView = new ThreeController('data-center')
})
</script>

<template>
  <div id="data-center"></div>
</template>

<style lang="css" scoped>
#data-center {
  width: 100%;
  height: 100%;
}
</style>