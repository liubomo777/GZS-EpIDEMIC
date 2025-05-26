<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import MyImgViewer from '@/mixins/MyImgViewer/index'
export default {
  mixins: [MyImgViewer],
  created () {
    
  },
  mounted() {
    this.windowSize()
  },
  methods: {
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #333;
}
.el-menu--popup-right-start {
  max-height: 80vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
}
// 表格 tooltip 限制最大宽度
.el-tooltip__popper {
  max-width: 500px !important;
  word-break: break-all;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  position: absolute;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #eeeeee;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #cccccc;
}
</style>

