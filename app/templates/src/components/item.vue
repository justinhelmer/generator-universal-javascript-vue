<template>
    <div id="item"<% if (features.foundation) { %> class="content"<% } %>>
        <h1>This is {{item.name}}</h1>
        <router-link :to="{ name: 'items' }"<% if (features.foundation) { %> class="button"<% } %>>Back to Items</router-link>
    </div>
</template>

<script>
  export default {
    name: 'item',

    asyncData ({ store, route }) {
      return store.dispatch('fetch', {
        id: route.params.id,
        endpoint: 'items'
      });
    },

    computed: {
      item () {
        return this.$store.getters.getItemById(this.$route.params.id, 'items');
      }
    }
  }
</script>