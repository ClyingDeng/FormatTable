<template>
  <div class="dyTable">
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :header-cell-style="headerStyle"
      :height="height"
      :ref="refs"
      :show-summary="showSummary"
      :summary-method="summaryMethod"
    >
      <template v-for="item in tHeads">
        <!-- 标签 -->
        <el-table-column
          v-if="item.props == 'tag'"
          :key="item.props"
          :fixed="item.fixed"
          :prop="item.props"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :sortable="item.sortable"
          :class-name="item.className"
          :type="item.type"
        >
          <template #default="scope">
            <el-tag :type="scope.row.tag.tagColor" disable-transitions>
              {{ scope.row.tag.tagName }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :key="item.props"
          v-if="item.props === 'operate'"
          :fixed="item.fixed"
          :prop="item.props"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :sortable="item.sortable"
          :class-name="item.className"
          :type="item.type"
        >
          <template #default="scope">
            <slot name="operate" :scope="scope.row"></slot>
          </template>
        </el-table-column>

        <!-- 自定义表头表体 -->
        <el-table-column
          :key="item.props"
          v-else-if="item.props === 'customize'"
          :fixed="item.fixed"
          :label="item.label"
          :prop="item.props"
          :width="item.width"
          :align="item.align"
          :sortable="item.sortable"
          :class-name="item.className"
          :type="item.type"
        >
          <template #header="scope">
            <slot name="customizeHeader"></slot>
          </template>
          <template #default="scope">
            <slot name="customizeBody" :customizeBody="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-if="item.children && item.children.length > 0"
          :key="item.props"
          :fixed="item.fixed"
          :prop="item.props"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :sortable="item.sortable"
          :class-name="item.className"
          :type="item.type"
        >
          <dy-column-item
            v-for="child in item.children"
            :key="child.props"
            :child="child"
          ></dy-column-item>
        </el-table-column>
        <el-table-column
          v-else-if="item.props !== 'operate' && item.props !== 'tag' && item.props !== 'customize'"
          :key="item.props"
          :fixed="item.fixed"
          :prop="item.props"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :sortable="item.sortable"
          :class-name="item.className"
          :type="item.type"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
import DyColumnItem from './dyColumnItem.vue'
import { ElTable, ElTableColumn, ElTag } from 'element-plus'
export default {
  name: 'DyTable',
  components: {
    ElTable,
    ElTableColumn,
    ElTag,
    DyColumnItem,
  },
  props: {
    tHeads: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    headerStyle: {
      type: Object,
      default: () => {},
    },
    tableRowClassName: {
      type: Function,
      default: () => {},
    },
    height: {
      type: String || Number,
      default: 'auto',
    },
    fixed: {
      type: String || Boolean,
      default: '',
    },
    refs: {
      type: String,
      default: '',
    },
    summaryMethod: {
      type: Function,
      default: () => function () {},
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    console.log(this.tableData)
  },
  // components: { DyColumnItem },
  // setup(props) {
  //   console.log(props)
  // },
}
</script>
<style lang="scss">
.stripa {
  background: oldlace;
}
.stripb {
  background: #f0f9eb;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
