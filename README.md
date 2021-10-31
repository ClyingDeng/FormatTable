# FormatTable
针对 vue3 + element-plus 表格不同样式的二次封装, 便于多次重复使用ElTable。

# 安装与起步

由于Vue 3不再支持 IE11，Element Plus 也不再支持 IE 浏览器。

由于 dytable 插件是基于 Vue、Element Plus，所以也不再支持 IE 浏览器。
[![npm version](https://badge.fury.io/js/dyingtable.svg)](https://badge.fury.io/js/dyingtable)

## npm安装

```shell
npm install dyingtable --save
```

## 快速开始
```js
import { createApp } from 'vue'
import App from './App.vue'
import DyTable from 'dyingtable'

createApp(App).use(DyTable).mount('#app')
```

# API

## 基础表格
采用表格头部（tHeads）、体部（tableData）以数组的方式传入参数。表格头部`label`绑定表头名称，`props`作为唯一标识，`width`表格列宽度，`align`控制列左中右对齐。

![avatar](/src/imgs/basic.png)

```html
<dy-table
  :tHeads="tHeads"
  :tableData="tableData"
></dy-table>
<script lang="ts">
import Vue, { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    let tHeads = reactive([
      {
        label: '日期',
        props: 'date',
        width: '200',
        align: 'center',
      },
      {
        label: '姓名',
        props: 'name',
        width: '200',
        align: 'center',
      },
      {
        label: '年龄',
        props: 'age',
        width: '200',
        align: 'left',
      },
      {
        label: '地址',
        props: 'address',
        width: '400',
        align: 'left',
      },
    ])

    let tableData = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        age: 22,
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-04-04',
        name: '王小虎',
        age: 12,
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        date: '2016-05-06',
        name: '王小二',
        age: 14,
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        age: 42,
        address: '上海市普陀区金沙江路 1516 弄',
      },
      {
        date: '2017-05-06',
        name: '王小二',
        age: 19,
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2019-05-03',
        name: '王小虎',
        age: 37,
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ])
    let tableRowClassName = (row: any) => {
      // 函数
      if (row.rowIndex % 3 === 1) {
        return 'warning-row'
      } else if (row.rowIndex % 3 === 2) {
        return 'success-row'
      }
      return ''
    }
    return { tableData, tHeads, tableRowClassName }
  },
})
</script>
```


## 带状态表格
可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。

可以通过指定 `Table` 组件的 `row-class-name` 属性来为 `Table` 中的某一行添加 `class`， 表明该行处于某种状态。

![avatar](/src/imgs/status.png)

```html
<dy-table
  :tHeads="tHeads"
  :tableData="tableData"
  :tableRowClassName="tableRowClassName"
></dy-table>
<script lang="ts">
import Vue, { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    let tHeads = reactive([
      {
        label: '日期',
        props: 'date',
        width: '200',
        align: 'center',
      },
      {
        label: '姓名',
        props: 'name',
        width: '200',
        align: 'center',
      },
      {
        label: '年龄',
        props: 'age',
        width: '200',
        sortable: false,
        align: 'left',
      },
      {
        label: '地址',
        props: 'address',
        width: '400',
        align: 'left',
      },
    ])

    let tableData = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        age: 22,
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-04-04',
        name: '王小虎',
        age: 12,
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        date: '2016-05-06',
        name: '王小二',
        age: 14,
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        age: 42,
        address: '上海市普陀区金沙江路 1516 弄',
      },
      {
        date: '2017-05-06',
        name: '王小二',
        age: 19,
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2019-05-03',
        name: '王小虎',
        age: 37,
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ])
    let tableRowClassName = (row: any) => {
      // 函数
      if (row.rowIndex % 3 === 1) {
        return 'warning-row'
      } else if (row.rowIndex % 3 === 2) {
        return 'success-row'
      }
      return ''
    }
    return { tableData, tHeads, tableRowClassName }
  },
})
</script>
```


## 固定表头表格
纵向内容过多时，可选择固定表头。

只要在 `dy-table`元素中定义了 `height` 属性，即可实现固定表头的表格，而不需要额外的代码。
![avatar](/src/imgs/fixedHeader.gif)

```html
<dy-table :tHeads="tHeads" :tableData="tableData" :height="height"></dy-table>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  setup() {
    let tHeads = reactive([
      {
        label: '日期',
        props: 'date',
        width: '200',
        align: 'left',
      },
      {
        label: '姓名',
        props: 'name',
        width: '200',
        align: 'center',
      },
      {
        label: '年龄',
        props: 'age',
        width: '200',
        align: 'left',
      },
      {
        label: '地址',
        props: 'address',
        width: '400',
        align: 'left',
      },
    ])

    let tableData = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        age: 22,
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-04-04',
        name: '王小虎',
        age: 12,
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        date: '2016-05-06',
        name: '王小二',
        age: 14,
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        age: 42,
        address: '上海市普陀区金沙江路 1516 弄',
      },
      {
        date: '2017-05-06',
        name: '王小二',
        age: 19,
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2019-05-03',
        name: '王小虎',
        age: 37,
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ])

    let height = ref('250')
    return { tableData, tHeads, height }
  },
})
</script>
```


## 固定列表格
横向内容过多时，可选择固定列。

固定列需要使用 fixed 属性，它接受 Boolean 值 如果 true, 将固定至右侧。
![avatar](/src/imgs/fixedColumn.gif)

```html
<dy-table :tHeads="tHeads" :tableData="tableData"></dy-table>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    let tHeads = reactive([
      {
        label: '姓名',
        props: 'name',
        width: '200',
        align: 'center',
        fixed: true,
      },
      {
        label: '年龄',
        props: 'age',
        width: '400',
        align: 'center',
        fixed: false,
      },
      {
        label: '日期',
        props: 'date',
        width: '400',
        align: 'center',
        fixed: false,
      },
      {
        label: '地址',
        props: 'address',
        width: '700',
        align: 'left',
        fixed: false,
      },
    ])

    let tableData = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        age: 22,
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-04-04',
        name: '王小虎',
        age: 12,
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        date: '2016-05-06',
        name: '王小二',
        age: 14,
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        age: 42,
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ])

    return { tableData, tHeads }
  },
})
</script>
```


## 排序表格
在 `tHeads` 中，将需要排序的列加上 `sortable` 属性，它接收 Boolean 值 如果 `true`，将会显示排序 `icon`。
![avatar](/src/imgs/sort.gif)

```html
<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    let tHeads = reactive([
      {
        label: '姓名',
        props: 'name',
        width: '200',
        sortable: false,
      },
      {
        label: '年龄',
        props: 'age',
        width: '200',
        sortable: true,
      },
      {
        label: '日期',
        props: 'date',
        width: '200',
        sortable: false,
      },
      {
        label: '地址',
        props: 'address',
        width: '400',
        sortable: false,
      },
    ])

    let tableData = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        age: 22,
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-04-04',
        name: '王小虎',
        age: 12,
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        date: '2016-05-06',
        name: '王小二',
        age: 14,
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        age: 42,
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ])

    return { tableData, tHeads }
  },
})
</script>
```


## 不同数据标签表格
给 `tHeads` 添加一列标签数据（必须为 `tag`），并可设定其列宽、对齐方式等。在 `tableData` 中 `tag` 有两个属性：颜色 `tagColor`、值 `tagName` 可设置。`tagColor` 默认五种颜色：danger 、 warning 、success 、primary 、info。
![avatar](/src/imgs/differentTag.png)
```html
<dy-table :tHeads="tHeads" :tableData="tableData"></dy-table>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    let tHeads = reactive([
      {
        label: '日期',
        props: 'date',
        width: '200',
        sortable: false,
        align: 'center',
        className: 'stripa', // 列样式
      },
      {
        label: '姓名',
        props: 'name',
        width: '100',
        sortable: false,
        align: 'center',
      },
      {
        label: '年龄',
        props: 'age',
        width: '100',
        sortable: false,
        align: 'left',
        className: 'stripb',
      },
      {
        label: '地址',
        props: 'address',
        width: '400',
        sortable: false,
        align: 'left',
      },
      {
        label: '标签',
        props: 'tag',
        width: '200',
        sortable: false,
        align: 'center',
      },
    ])

    let tableData = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        age: 22,
        address: '上海市普陀区金沙江路 1518 弄',
        tag: {
          tagColor: 'danger',
          tagName: '极差',
        },
      },
      {
        date: '2016-04-04',
        name: '王小虎',
        age: 12,
        address: '上海市普陀区金沙江路 1517 弄',
        tag: {
          tagColor: 'warning',
          tagName: '及格',
        },
      },
      {
        date: '2016-05-06',
        name: '王小二',
        age: 14,
        address: '上海市普陀区金沙江路 1519 弄',
        tag: {
          tagColor: 'success',
          tagName: '优秀',
        },
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        age: 42,
        address: '上海市普陀区金沙江路 1516 弄',
        tag: {
          tagColor: 'primary',
          tagName: '良好',
        },
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        age: 42,
        address: '上海市普陀区金沙江路 1516 弄',
        tag: {
          tagColor: 'info',
          tagName: '一般',
        },
      },
    ])

    return { tableData, tHeads }
  },
})
</script>
```

## 自定义操作列体
给 `tHeads` 添加一列操作数据，并可设定其列宽、对齐方式等。
![avatar](/src/imgs/customColumn.png)

```html
<dy-table :tHeads="tHeads" :tableData="tableData">
  <template v-slot:operate="scope">
    <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
  </template>
</dy-table>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    let tHeads = reactive([
      {
        label: '日期',
        props: 'date',
        width: '200',
        sortable: false,
        align: 'center',
      },
      {
        label: '姓名',
        props: 'name',
        width: '100',
        sortable: false,
        align: 'center',
      },
      {
        label: '年龄',
        props: 'age',
        width: '100',
        sortable: false,
        align: 'left',
      },
      {
        label: '地址',
        props: 'address',
        width: '400',
        sortable: false,
        align: 'left',
      },
      {
        label: '标签',
        props: 'tagName',
        width: '100',
        sortable: false,
        align: 'center',
      },
      {
        label: '操作',
        props: 'operate',
        width: '100',
        align: 'center',
      },
    ])

    let tableData = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        age: 22,
        address: '上海市普陀区金沙江路 1518 弄',
        tagColor: 'danger',
        tagName: '极差',
      },
      {
        date: '2016-04-04',
        name: '王小虎',
        age: 12,
        address: '上海市普陀区金沙江路 1517 弄',
        tagName: '及格',
      },
      {
        date: '2016-05-06',
        name: '王小二',
        age: 14,
        address: '上海市普陀区金沙江路 1519 弄',
        tagName: '优秀',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        age: 42,
        address: '上海市普陀区金沙江路 1516 弄',
        tagName: '良好',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        age: 42,
        address: '上海市普陀区金沙江路 1516 弄',
        tagName: '一般',
      },
    ])

    return { tableData, tHeads }
  },
})
</script>
```


## 自定义表头表体
表头支持自定义。<br/>
表体支持自定义。

在表头添加一个自定义列。通过设置具名插槽 slot 来自定义表头（customizeHeader）、表体（customizeBody）。
![avatar](/src/imgs/customHeaderBody.png)

```html
<dy-table :tHeads="tHeads" :tableData="tableData">
  <template v-slot:customizeHeader>自定义头部（搜索、按钮、文本均可）</template>
  <template v-slot:customizeBody="{ customizeBody }">
    自定义体:{{ customizeBody.address }}
  </template>
</dy-table>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    let tHeads = reactive([
      {
        label: '日期',
        props: 'date',
        width: '200',
        sortable: false,
        align: 'center',
      },
      {
        label: '姓名',
        props: 'name',
        width: '100',
        sortable: false,
        align: 'center',
      },
      {
        label: '年龄',
        props: 'age',
        width: '100',
        sortable: false,
        align: 'left',
      },
      {
        label: '自定义',
        props: 'customize',
        width: '400',
        sortable: false,
        align: 'center',
      },
    ])

    let tableData = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        age: 22,
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-04-04',
        name: '王小虎',
        age: 12,
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        date: '2016-05-06',
        name: '王小二',
        age: 14,
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        age: 42,
        address: '上海市普陀区金沙江路 1516 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        age: 42,
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ])

    return { tableData, tHeads }
  },
})
</script>
```


## 选择行
选择多行数据时使用 Checkbox。
给表格添加ref属性，通过refs给组件内table传入ref属性。给表头添加 `{ type: 'selection' }`属性，展示Checkbox。
![avatar](/src/imgs/multipleSelect.gif)

```html
<dy-table ref="multiple" :refs="refs" :tHeads="tHeads" :tableData="tableData"></dy-table>
<div style="margin-top: 20px">
  <el-button @click="toggleSelection([tableData[1], tableData[2]])">
    切换第二、第三行的选中状态
  </el-button>
  <el-button @click="toggleSelection()">取消选择</el-button>
</div>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  setup() {
    let tHeads = reactive([
      { type: 'selection' },
      {
        label: '日期',
        props: 'date',
        width: '200',
        sortable: false,
        align: 'center',
        className: 'stripa', // 列样式
      },
      {
        label: '姓名',
        props: 'name',
        width: '100',
        sortable: false,
        align: 'center',
      },
      {
        label: '年龄',
        props: 'age',
        width: '100',
        sortable: false,
        align: 'left',
        className: 'stripb',
      },
      {
        label: '地址',
        props: 'address',
        width: '400',
        sortable: false,
        align: 'left',
      },
    ])

    let tableData = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        age: 22,
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-04-04',
        name: '王小虎',
        age: 12,
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        date: '2016-05-06',
        name: '王小二',
        age: 14,
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        age: 42,
        address: '上海市普陀区金沙江路 1516 弄',
      },
      {
        date: '2017-05-06',
        name: '王小二',
        age: 19,
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2019-05-03',
        name: '王小虎',
        age: 37,
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ])

    let multiple: any = ref(null)
    let refs = ref('multipleTable')
    let toggleSelection = (rows: any) => {
      let ref = multiple.value.$refs
      if (rows) {
        rows.forEach((row: any) => {
          ref.multipleTable.toggleRowSelection(row)
        })
      } else {
        ref.multipleTable.clearSelection()
      }
    }
    return { tableData, tHeads, multiple, refs, toggleSelection }
  },
})
</script>

```

## 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

![avatar](/src/imgs/moreHead.png)

```html
<dy-table :tableData="tableData" :tHeads="tHeads"></dy-table>
<script lang="ts">
import Vue, { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    let tHeads = reactive([
      {
        label: '日期',
        props: 'date',
        width: '200',
        sortable: false,
        align: 'center',
      },
      {
        label: '配送信息',
        children: [
          {
            label: '姓名',
            props: 'name',
            width: '200',
            sortable: false,
            align: 'center',
          },
          {
            label: '地址',
            sortable: false,
            align: 'left',
            children: [
              {
                label: '省份',
                props: 'province',
                width: '150',
              },
              {
                label: '市区',
                props: 'city',
                width: '200',
              },
              {
                label: '详细地址',
                props: 'address',
                width: '300',
              },
            ],
          },
        ],
      },
    ])

    let tableData = reactive([
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
    ])
    return { tableData, tHeads }
  },
})
</script>
```


## 表尾合计行
若表格展示的是各类数字，可以在表尾显示各列的合计。

将 showSummary 设置为true就会在表格尾部展示合计行。  使用 summaryMethod 并传入一个方法，返回一个数组，这个数组中的各项就会显示在合计行的各列中， 具体可以参考本例中的第二个表格。
![avatar](/src/imgs/summaryRow.png)

```html
<dy-table
  :tHeads="tHeads"
  :tableData="tableData"
  :summaryMethod="getSummaries"
  :showSummary="showSummary"
  :height="height"
></dy-table>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  setup() {
    let tHeads = reactive([
      {
        label: 'ID',
        props: 'id',
        width: '200',
        sortable: false,
        align: 'center',
      },
      {
        label: '姓名',
        props: 'name',
        width: '200',
        sortable: false,
        align: 'center',
      },
      {
        label: '数值1',
        props: 'amount1',
        width: '200',
        sortable: false,
        align: 'left',
      },
      {
        label: '数值2',
        props: 'amount2',
        width: '200',
        sortable: false,
        align: 'center',
      },
      {
        label: '数值3',
        props: 'amount3',
        width: '200',
        sortable: false,
        align: 'center',
      },
    ])

    let tableData = reactive([
      {
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10,
      },
      {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12,
      },
    ])

    let height = ref('250')
    let getSummaries = (param: any) => {
      console.log(param)
      const { columns, data } = param
      const sums: string[] = []
      columns.forEach((column: any, index: number) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map((item: any) => Number(item[column.property]))
        if (!values.every((value: any) => isNaN(value))) {
          sums[index] = values.reduce((prev: any, curr: any) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    }
    let showSummary = ref(true)
    return { tableData, tHeads, height, getSummaries, showSummary }
  },
})
</script>
```


# 其他版本
根据 vue2 + element-ui，对表格进行的二次封装详情可见：[formdemo](https://clyingdeng.github.io/FormDemo/#/variety)

项目地址：https://github.com/ClyingDeng/FormDemo

