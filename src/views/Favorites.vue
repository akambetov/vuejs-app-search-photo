<template>
  <ph-photos
    v-if="favorites"
    :photos="favorites"
    :from-component="'Favorites'"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getterTypes,
  mutationTypes as searchMutationTypes
} from '@/store/modules/searchPhotos'
import PhPhotos from '@/components/Photos'
export default {
  name: 'PhFavorites',
  components: {
    PhPhotos
  },
  computed: {
    ...mapGetters({
      favorites: getterTypes.favorites
    })
  },
  mounted() {
    this.$store.commit(searchMutationTypes.oldQueryFavorites)
  }
}
</script>
