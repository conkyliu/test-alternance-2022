<template>
  <my-layout>
    <a-typography-text mark style="font-size: 40px"
      >Open Food Facts
    </a-typography-text>
    <product-table></product-table>
  </my-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import ProductTable from "@/components/ProductTable.vue";

import MyLayout from "@/layout/index";
export default defineComponent({
  components: { ProductTable, MyLayout },
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
