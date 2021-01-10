<template>
  <div class="row row-cols-1 row-cols-md-2">
    <div v-for="photo in photos" :key="photo.id" class="col mb-4">
      <div class="card">
        <div class="controls">
          <button title="Like photo" type="button" class="like__button">
            <svg version="1.1" viewBox="0 0 32 32" class="like__icon">
              <path
                d="M17.4 29c-.8.8-2 .8-2.8 0l-12.3-12.8c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.3 0l2.4 2.8 2.3-2.8c3.1-3.1 8.2-3.1 11.3 0 3.1 3.1 3.1 8.2 0 11.4l-12.2 12.8z"
              ></path>
            </svg>
          </button>

          <a
            class="download__link"
            download
            title="Download photo"
            :href="`${photo.links.download}?force=true`"
            target="_blank"
          >
            <svg version="1.1" viewBox="0 0 32 32" class="download__icon">
              <path
                d="M25.8 15.5l-7.8 7.2v-20.7h-4v20.7l-7.8-7.2-2.7 3 12.5 11.4 12.5-11.4z"
              ></path>
            </svg>
          </a>
        </div>
        <img
          :src="photo.urls.regular"
          class="card-img-top"
          :alt="photo.alt_description"
        />
        <!-- <div class="card-body">
          <h5 class="card-title">{{ photo.alt_description }}</h5>
          <p class="card-text">
            {{ photo.description }}
          </p>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PhPhotos',
  props: {
    photos: {
      type: Array,
      required: true
    }
  }
}
</script>
