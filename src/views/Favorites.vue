<template>
  <ph-photos v-if="favorites" :photos="favorites" />
</template>

<script>
import { mapState } from 'vuex'
import PhPhotos from '@/components/Photos'
export default {
  name: 'PhFavorites',
  components: {
    PhPhotos
  },
  computed: {
    ...mapState({
      favorites: state => state.favorites.favorites
    })
  }
}
</script>
