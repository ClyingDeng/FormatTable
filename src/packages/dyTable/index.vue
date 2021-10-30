<template>
  <div class="dyTable">
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :header-cell-style="headerStyle"
      :height="height"
      :ref="refs"
    >
      <template v-for="item in tHeads">
        <!-- 标签 -->
        <el-table-column
          :key="item.props"
          v-if="item.props === 'tagName'"
          :fixed="item.fixed"
          :prop="item.props"
          :label="item.label"
          :width="item.width"
          :align="item.headerAlign"
          :sortable="item.sortable"
          :class-name="item.className"
          :type="item.type"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.tagColor" disable-transitions>
              {{ scope.row.tagName }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :key="item.props"
          v-else-if="item.props === 'operate'"
          :fixed="item.fixed"
          :prop="item.props"
          :label="item.label"
          :width="item.width"
          :align="item.headerAlign"
          :sortable="item.sortable"
          :class-name="item.className"
          :type="item.type"
        >
          <template slot-scope="scope">
            <slot name="operate" v-bind:scope="scope"></slot>
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
          :align="item.headerAlign"
          :sortable="item.sortable"
          :class-name="item.className"
          :type="item.type"
        >
          <template slot="header" slot-scope="scope">
            <slot name="customizeHeader" v-bind:customizeHeader="scope"></slot>
          </template>
          <template slot-scope="scope">
            <slot name="customizeBody" v-bind:customizeBody="scope"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-if="item.children && item.children.length > 0"
          :key="item.props"
          :fixed="item.fixed"
          :prop="item.props"
          :label="item.label"
          :width="item.width"
          :align="item.headerAlign"
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
          v-else
          :key="item.props"
          :fixed="item.fixed"
          :prop="item.props"
          :label="item.label"
          :width="item.width"
          :align="item.headerAlign"
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
      default: () => {},
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
