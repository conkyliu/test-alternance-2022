<template>
  <div class="filter_box">
    <a-form
      layout="inline"
      :model="formState"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item label="Product" name="search_terms2">
        <a-input
          allow-clear
          v-model:value="formState.search_terms2"
          placeholder="Search for words present in the product name, generic name, brands, categories, origins and labels"
        />
      </a-form-item>
      <a-form-item label="Countries" name="countries">
        <a-input
          style="width: 100px"
          allow-clear
          v-model:value="formState.countries"
        />
      </a-form-item>
      <!--      <a-form-item label="Nutri Score" name="nutrition_grades">-->
      <!--        <a-select-->
      <!--          style="width: 80px"-->
      <!--          allow-clear-->
      <!--          v-model:value="formState.nutrition_grades"-->
      <!--        >-->
      <!--          <a-select-option value="a">A</a-select-option>-->
      <!--          <a-select-option value="b">B</a-select-option>-->
      <!--          <a-select-option value="c">C</a-select-option>-->
      <!--          <a-select-option value="d">D</a-select-option>-->
      <!--          <a-select-option value="e">E</a-select-option>-->
      <!--        </a-select>-->
      <!--      </a-form-item>-->
      <a-form-item>
        <a-button type="primary" html-type="submit">Filter</a-button>
      </a-form-item>
    </a-form>
  </div>
  <a-table
    :columns="columns"
    :row-key="(record) => record._id"
    :data-source="dataSource?.data?.products"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'image_small_url'">
        <a-image :src="text" />
      </template>
      <template v-if="column.dataIndex === 'nova_group'">
        <img :src="getNovaGroup(text)" style="width: 30px" />
      </template>
      <template v-if="column.dataIndex === 'nutriscore_grade'">
        <img :src="getNutriScore(text)" style="width: 60px" />
      </template>
      <template v-if="column.dataIndex === 'operation'">
        <router-link :to="`/about?id=${record._id}`" @click="openModal(record)"
          >info</router-link
        >
      </template>
    </template>
  </a-table>
  <a-modal
    width="50vw"
    :visible="modalVisit"
    @cancel="modalVisit = false"
    @ok="modalVisit = false"
  >
    <a-descriptions
      bordered
      :title="selectProduct.product_name + ' - ' + selectProduct.quantity"
    >
      <a-descriptions-item label="ID"
        >{{ selectProduct._id }}
      </a-descriptions-item>
      <a-descriptions-item label="Common name"
        >{{ selectProduct.common_name }}
      </a-descriptions-item>
      <a-descriptions-item label="Quantity"
        >{{ selectProduct.quantity }}
      </a-descriptions-item>
      <a-descriptions-item label="Packaging" :span="2">
        {{ selectProduct.packaging }}
      </a-descriptions-item>
      <a-descriptions-item label="Brands"
        >{{ selectProduct.brands }}
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>
<script lang="ts">
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, toRefs, reactive } from "vue";
import axios from "axios";
import { useStore } from "vuex";

interface FormState {
  nutrition_grades: string;
  nova_group: string;

  [key: string]: any;
}

const columns = [
  { title: "Image", dataIndex: "image_small_url" },
  {
    title: "Name",
    dataIndex: "product_name",
    //sorter: true,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  //nutriscore_grade
  {
    title: "Nutri Score",
    dataIndex: "nutriscore_grade",
  },
  {
    title: "Nova Group",
    dataIndex: "nova_group",
  },
  {
    title: "Operation",
    dataIndex: "operation",
  },
];

type APIParams = {
  page_size: number;
  page?: number;
  [key: string]: any;
};
type APIResult = any;
const queryData = (params: APIParams) => {
  return axios.get<any>(
    "https://world.openfoodfacts.org/cgi/search.pl?json=true&action=process",
    {
      params,
    }
  );
};

export default defineComponent({
  data() {
    return { modalVisit: false, selectProduct: null };
  },
  methods: {
    getNovaGroup: (text: string | number) =>
      `https://static.openfoodfacts.org/images/attributes/nova-group-${text}.svg`,
    getNutriScore: (text: string) =>
      `https://static.openfoodfacts.org/images/attributes/nutriscore-${text}.svg`,
    openModal(item: any) {
      // this.modalVisit = true;
      this.selectProduct = item;
      console.log(item);
      this.store.commit("setSelectProduct", item);
    },
  },

  setup(props) {
    const store = useStore();
    const formState = reactive<FormState>({
      nova_group: "",
      nutrition_grades: "",
    });
    let filterParams: any = {};
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(queryData, {
      //formatResult: (res) => res.data.page_size,
      pagination: {
        currentKey: "page",
        pageSizeKey: "page_size",
      },
    });

    const pagination = computed(() => ({
      total: dataSource.value?.data?.count ?? 200,
      current: current.value,
      pageSize: pageSize.value,
    }));

    const handleTableChange = (
      pag: { pageSize: number; current: number },
      filters: any,
      sorter: any
    ) => {
      run({
        page_size: pag.pageSize!,
        page: pag?.current,
        //sort_by: sorter.order ? "product_name" : "",
        ...filterParams,
      });
    };
    const onFinish = (values: any) => {
      console.log("Success:", values);
      filterParams = {
        ...values,
        tagtype_0: "countries",
        tag_contains_0: "contains",
        tag_0: values.countries,
      };
      run({
        page_size: pagination.value?.pageSize,
        page: current.value,
        ...filterParams,
      });
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    return {
      dataSource,
      pagination,
      loading,
      columns,
      formState,
      handleTableChange,
      onFinish,
      onFinishFailed,
      filterParams,
      store,
    };
  },
});
</script>
<style lang="scss">
.filter_box {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 10px;
}
</style>
