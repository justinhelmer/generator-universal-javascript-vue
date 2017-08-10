<template>
    <div id="home"<% if (features.foundation) { %> class="content"<% } %>>
        <h1>Welcome</h1>
        <router-link :to="{ name: 'items' }"<% if (features.foundation) { %> class="button"<% } %>>Items</router-link>
    </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>