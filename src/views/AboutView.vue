<template>
  <my-layout>
    <a-image :src="selectProduct?.image_url" width="300" />
    <a-descriptions
      bordered
      :title="selectProduct?.product_name + ' - ' + selectProduct?.quantity"
    >
      <a-descriptions-item label="ID"
        >{{ selectProduct?._id }}
      </a-descriptions-item>
      <a-descriptions-item label="Generic Name"
        >{{ selectProduct?.generic_name }}
      </a-descriptions-item>
      <a-descriptions-item label="Quantity"
        >{{ selectProduct?.quantity }}
      </a-descriptions-item>
      <a-descriptions-item label="Packaging" :span="2">
        {{ selectProduct?.packaging }}
      </a-descriptions-item>
      <a-descriptions-item label="Brands"
        >{{ selectProduct?.brands }}
      </a-descriptions-item>
      <a-descriptions-item label="Categories">
        {{ selectProduct?.categories }}
      </a-descriptions-item>
    </a-descriptions>
  </my-layout>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import MyLayout from "@/layout/MyLayout.vue";

export default defineComponent({
  components: { MyLayout },
  setup() {
    const store = useStore();
    return {
      selectProduct: computed(() => store.state.selectProduct),
    };
  },
});
</script>
