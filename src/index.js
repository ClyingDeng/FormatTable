import DyTable from './packages/dyTable/index.vue'

const install = function (Vue) {
  console.log(DyTable.name)
  Vue.component(DyTable.name, DyTable)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install }
