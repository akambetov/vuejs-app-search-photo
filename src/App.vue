<template>
  <div>
    <ph-navbar />
    <router-view />
  </div>
</template>
<script>
import PhNavbar from '@/components/Navbar'
import { actionTypes } from '@/store/modules/searchPhotos'
export default {
  name: 'App',
  components: {
    PhNavbar
  },
  mounted() {
    this.$store.dispatch(actionTypes.getLocalStorage)
  }
}
</script>
