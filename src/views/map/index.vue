<template>
  <div id="myMap"></div>
</template>

<script>
expport default {
  mounted() {
    this.map = new T.Map('my-TDMap', {
            projection: 'EPSG:4326',
            minZoom: 7,
            maxZoom: 18,
            zoom: 15,
            center: new T.LngLat(113.31788, 23.10674)
        })
  }
}
</script>

<style lang="scss" scoped>

</style>