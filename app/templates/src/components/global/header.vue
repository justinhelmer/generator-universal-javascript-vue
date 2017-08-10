<template>
    <header>
        <nav<% if (features.foundation) { %> class="top-bar"<% } %>>
            <div<% if (features.foundation) { %> class="top-bar-left"<% } %>>
                <ul<% if (features.foundation) { %> class="menu"<% } %>>
                    <li>
                        <router-link :to="{ name: 'home' }">
                            <% if (features.foundation) { %><i class="fa fa-home"></i><span class="show-for-medium">Home</span><% } else { %>Home<% } %>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div<% if (features.foundation) { %> class="top-bar-right"<% } %>>
                <ul<% if (features.foundation) { %> class="menu align-right"<% } %>>
                    <li v-if="uid">
                        <router-link :to="{ name: 'profile' }">
                            <% if (features.foundation) { %><i class="fa fa-user"></i><span class="show-for-medium">Profile</span><% } else { %>Profile<% } %>
                        </router-link>
                    </li>
                    <li>
                        <router-link v-if="!uid" :to="{ name: 'login' }">
                            <% if (features.foundation) { %><i class="fa fa-sign-in"></i><span class="show-for-medium">Login</span><% } else { %>Login<% } %>
                        </router-link>
                        <router-link v-if="uid" :to="{ name: 'logout' }">
                            <% if (features.foundation) { %><i class="fa fa-sign-out"></i><span class="show-for-medium">Logout</span><% } else { %>Logout<% } %>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'header',

    computed: {
      uid() {
        return this.$store.state.global.user._id
      }
    }
  }
</script>

<style lang="scss" scoped>
    <% if (features.foundation) { %>@import '../../css/settings';

    $white: get-color(white);

    a {  color: $white;  }
    i { margin-right: 1em; }

    @include breakpoint(small only) {
        .menu.align-right li:last-child i {
            margin: 0;
        }
    }<% } %>
</style>