<template>
  <el-table-column
    v-if="child.children && child.children.length > 0"
    :fixed="child.fixed"
    :prop="child.props"
    :label="child.label"
    :width="child.width"
    :align="child.headerAlign"
    :sortable="child.sortable"
    :class-name="child.className"
    :type="child.type"
  >
    <dy-column-item
      v-for="childItem in child.children"
      :key="childItem.props"
      :child="childItem"
    ></dy-column-item>
  </el-table-column>
  <el-table-column
    v-else
    :fixed="child.fixed"
    :prop="child.props"
    :label="child.label"
    :width="child.width"
    :align="child.headerAlign"
    :sortable="child.sortable"
    :class-name="child.className"
    :type="child.type"
  ></el-table-column>
</template>
<script>
import { ElTableColumn } from 'element-plus'
export default {
  name: 'DyColumnItem',
  components: {
    ElTableColumn,
  },
  props: {
    child: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
