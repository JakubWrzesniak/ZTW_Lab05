<template>
  <component :is="layout">
    <AppLayoutLinks />
    <slot />
  </component>
</template>

<script>
import MainLayoutDefault from './MainLayoutDefault'
import AppLayoutLinks from '@/layouts/AppLayoutLinks'
export default {
  name: "MainLayout",
  components: {AppLayoutLinks},
  data: () => ({
    layout: MainLayoutDefault
  }),
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component = await import(`@/layouts/${route.meta.layout}.vue`)
          this.layout = component?.default || MainLayoutDefault
        } catch (e) {
          this.layout = MainLayoutDefault
        }
      }
    }
  }
}
</script>
<style scoped>


</style>