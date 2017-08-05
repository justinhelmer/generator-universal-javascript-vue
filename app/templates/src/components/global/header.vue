<template>
    <header>
        <nav<% if (features.foundation) { %> class="top-bar"<% } %>>
            <ul<% if (features.foundation) { %> class="menu"<% } %>>
                <li>
                    <router-link :to="{ name: 'home' }">
                        <% if (features.foundation) { %><i class="fa fa-home"></i><span class="show-for-medium">Home</span><% } else { %>Home<% } %>
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
  export default {
    name: 'header'
  }
</script>

<style lang="scss" scoped>
    <% if (features.foundation) { %>@import '../../css/settings';

    $white: get-color(white);<% } else { %>
    $white: #fff;<% } %>

    a {  color: $white;  }
    i {  margin-right: 1em; }
</style>