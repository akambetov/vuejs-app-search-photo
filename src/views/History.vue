<template>
  <div class="list-group">
    <button
      v-for="(query, idx) in historyQueries"
      :key="idx"
      type="button"
      class="list-group-item list-group-item-action"
      @click="historySearch(query.query, query.orientation)"
    >
      Your query: <strong>{{ query.query }}</strong
      >, orientation <strong>{{ query.orientation }}</strong>
      <!-- .active disabled-->
    </button>
  </div>
</template>
<script>
import { actionTypes as historyActionTypes } from '@/store/modules/history'
import { actionTypes as searchActionTypes } from '@/store/modules/searchPhotos'
import { mapState } from 'vuex'
export default {
  name: 'PhHistory',
  computed: {
    ...mapState({
      historyQueries: state => state.history.history
    })
  },
  methods: {
    historySearch(query, orientation) {
      this.$store.dispatch(searchActionTypes.searchPhotos, {
        query,
        orientation
      })
      this.$router.push({
        name: 'results',
        params: { query: `${query}-${orientation}` }
      })
    }
  },
  mounted() {
    this.$store.dispatch(historyActionTypes.initHistory)
  }
}
</script>
