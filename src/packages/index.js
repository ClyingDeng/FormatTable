import DyTable from './dyTable/index.vue'

DyTable.install = (Vue) => {
  Vue.component(DyTable.name, DyTable)
}

export default {
  DyTable,
}
