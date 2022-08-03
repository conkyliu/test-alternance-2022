<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo"></div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">Home</a-menu-item>
        <!--        <a-menu-item key="2">nav 2</a-menu-item>-->
        <!--        <a-menu-item key="3">nav 3</a-menu-item>-->
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <!--        <a-breadcrumb-item>Home</a-breadcrumb-item>-->
        <!--        <a-breadcrumb-item>List</a-breadcrumb-item>-->
        <!--        <a-breadcrumb-item>App</a-breadcrumb-item>-->
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <a-typography-text mark style="font-size: 40px"
          >Open Food Facts</a-typography-text
        >
        <product-table></product-table>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import ProductTable from "@/components/ProductTable.vue";

export default defineComponent({
  components: { ProductTable },
  setup() {
    return {
      selectedKeys: ref<string[]>(["1"]),
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

.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
</style>
