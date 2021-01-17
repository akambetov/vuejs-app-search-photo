<template>
  <div>
    <ul class="list-group list-group-flush">
      <li
        v-for="(query, idx) in historyQueries"
        :key="idx"
        class="list-group-item history-item d-flex justify-content-between"
        @click="historySearch(query.query, query.orientation, $event)"
      >
        <span>
          Your query: <strong>{{ query.query }}</strong
          >, orientation <strong>{{ query.orientation }}</strong>
        </span>
        <button
          type="button"
          class="btn btn-danger"
          @click="removeCurrent(idx)"
        >
          Remove
        </button>
      </li>
    </ul>
    <button
      v-if="historyQueries && historyQueries.length"
      type="button"
      class="btn btn-danger"
      @click="removeAll"
    >
      Remove All
    </button>

    <div class="list-group">
      <!-- <button
        v-for="(query, idx) in historyQueries"
        :key="idx"
        type="button"
        class="list-group-item list-group-item-action"
        @click="historySearch(query.query, query.orientation)"
      >
        Your query: <strong>{{ query.query }}</strong
        >, orientation <strong>{{ query.orientation }}</strong>
      </button> -->
    </div>
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
    historySearch(query, orientation, event) {
      if (event.target.tagName === 'BUTTON') return
      this.$store.dispatch(searchActionTypes.searchPhotos, {
        query,
        orientation
      })
      this.$router.push({
        name: 'results',
        params: { query: `${query}-${orientation}` }
      })
    },
    removeCurrent(idx) {
      this.$store.dispatch(historyActionTypes.removeHistory, idx)
    },
    removeAll() {
      this.$store.dispatch(historyActionTypes.removeAllHistory)
    }
  },
  mounted() {
    this.$store.dispatch(historyActionTypes.initHistory)
  }
}
</script>
