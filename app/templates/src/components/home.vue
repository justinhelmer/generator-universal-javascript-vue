<template>
    <div id="home"<% if (features.foundation) { %> class="grid-container grid-container-padded"<% } %>>
        <div<% if (features.foundation) { %> class="grid-y"<% } %>>
            <h1>Welcome</h1>

            <router-link :to="{ name: 'items' }" class="link">Items</router-link>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style lang="scss" scoped>
    <% if (features.foundation) { %>@import '../css/settings';

    $black: get-color(black);<% } else { %>
    $black: #000;<% } %>

    .link {
        color: $black;
        font-size: 20px;
    }
</style>