<template>
    <div id="item"<% if (features.foundation) { %> class="grid-container grid-container-padded"<% } %>>
        <div<% if (features.foundation) { %> class="grid-y"<% } %>>
            <h1>This is {{item.name}}</h1>
            <router-link :to="{ name: 'items' }">Back to Items</router-link>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'item',

    asyncData ({ store, route }) {
      return store.dispatch('fetch', {
        id: route.params.id,
        endpoint: '/api/item',
        store: 'items'
      });
    },

    computed: {
      item () {
        return this.$store.getters.getItemById(this.$route.params.id, 'items');
      }
    }
  }
</script>