<template>
  <div>
    <form class="form-inline my-2">
      <input
        v-model="search"
        class="form-control mx-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button class="btn btn-outline-success mx-2 my-2" type="submit">
        Search
      </button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'PhHome',
  data() {
    return {
      search: ''
    }
  }
}
</script>
