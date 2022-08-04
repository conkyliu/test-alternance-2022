<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="header_box">
        <div class="logo">ELYF</div>
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1"
            ><router-link to="/">Home</router-link></a-menu-item
          >
          <!--        <a-menu-item key="2">nav 2</a-menu-item>-->
          <!--        <a-menu-item key="3">nav 3</a-menu-item>-->
        </a-menu>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <!--        <a-breadcrumb-item>Home</a-breadcrumb-item>-->
        <!--        <a-breadcrumb-item>List</a-breadcrumb-item>-->
        <!--        <a-breadcrumb-item>App</a-breadcrumb-item>-->
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <!--        <div>-->
        <!--          <a-typography-text mark style="font-size: 40px"-->
        <!--            >Open Food Facts-->
        <!--          </a-typography-text>-->
        <!--        </div>-->
        <slot></slot>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center"> </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      // selectedKeys: ref<string[]>(["1"]),
    };
  },
});
</script>
<style>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

.header_box {
  display: flex;
  justify-content: space-between;
}

.logo {
  /*float: left;*/
  width: 120px;
  height: 31px;
  /*margin: 16px 24px 16px 0;*/
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: auto 0;
}
</style>
