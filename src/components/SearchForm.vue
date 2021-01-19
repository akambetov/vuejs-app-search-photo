<template>
  <form class="form-inline my-2" @submit.prevent="searchPhotos">
    <input
      v-model="search"
      class="form-control mx-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
    />
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        name="orientation"
        id="landscape"
        value="landscape"
        v-model="orientation"
      />
      <label class="form-check-label" for="landscape">Landscape</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        name="orientation"
        id="portrait"
        value="portrait"
        v-model="orientation"
      />
      <label class="form-check-label" for="portrait">Portrait</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        name="orientation"
        id="squarish"
        value="squarish"
        v-model="orientation"
      />
      <label class="form-check-label" for="squarish">Squarish</label>
    </div>
    <button class="btn btn-outline-success mx-2 my-2" type="submit">
      Search
    </button>
  </form>
</template>

<script>
import { actionTypes as searchPhotosActionTypes } from '@/store/modules/searchPhotos'
export default {
  name: 'PhSearchForm',
  data() {
    return {
      search: '',
      orientation: 'landscape'
    }
  },
  methods: {
    searchPhotos() {
      const query = `${this.search}-${this.orientation}`
      if (this.$route.params.query === query || !this.search) return
      const searchParams = {
        query: this.search,
        orientation: this.orientation
      }
      this.$store.dispatch(searchPhotosActionTypes.searchPhotos, searchParams)
      this.$router.push({
        name: 'results',
        params: { query }
      })
    }
  }
}
</script>
