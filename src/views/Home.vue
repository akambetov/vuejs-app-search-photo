<template>
  <div>
    <ph-search-form />
    <ph-photos v-if="photos" :photos="photos.photos" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import PhPhotos from '@/components/Photos'
import PhSearchForm from '@/components/SearchForm'
export default {
  name: 'PhHome',
  components: {
    PhPhotos,
    PhSearchForm
  },
  computed: {
    ...mapState({
      photos: state => state.searchPhotos.data,
      error: state => state.searchPhotos.error
    })
  }
}
</script>
