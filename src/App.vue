<template>
  <div>
    <ph-navbar />
    <router-view />
  </div>
</template>
<script>
import PhNavbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    PhNavbar
  }
}
</script>
