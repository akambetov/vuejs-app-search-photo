<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link
            :to="{ name: 'home' }"
            class="nav-link"
            active-class="active"
            exact
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'favorites' }"
            class="nav-link"
            active-class="active"
          >
            Favorites
          </router-link>
        </li>
        <li class="nav-item" active-class="active" exact>
          <router-link
            :to="{ name: 'history' }"
            class="nav-link"
            active-class="active"
          >
            History
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'PhNavbar'
}
</script>
