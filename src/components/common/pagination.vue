<template>
  <div class="pagination">
    <el-pagination layout="prev, pager, next" :total="total"></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number
    }
  },
  data() {
    return {};
  },
  beforeDestroy() {}
};
</script>
