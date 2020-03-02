<template>
  <div class="micro-chain-pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSize"
      :page-size="defaultPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageSize: [20, 50, 100, 500]
    };
  },
  props: {
    defaultPageSize: {
      type: Number
    },
    total: {
      type: Number
    },
    currentPage: {
      type: Number
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("changeSize", val);
    },
    handleCurrentChange(val) {
      this.$emit("changCurrentPage", val);
    }
  }
};
</script>
<style lang="scss" scoped>
.micro-chain-pagination {
  .el-pagination {
    background: #ffffff
  }
}
</style>