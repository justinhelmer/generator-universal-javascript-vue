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
            <% if (features.keystone) { %><div<% if (features.foundation) { %> class="top-bar-right"<% } %>>
                <ul<% if (features.foundation) { %> class="menu align-right"<% } %>>
                    <li>
                        <a href="/keystone">
                            <% if (features.foundation) { %><i class="fa fa-cog"></i><span class="show-for-medium">Admin Dashboard</span><% } else { %>Admin Dashboard<% } %>
                        </a>
                    </li>
                </ul>
            </div><% } %>
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

    $white: get-color(white);

    a {  color: $white;  }
    i { margin-right: 1em; }

    @include breakpoint(small only) {
        .menu.align-right li:last-child i {
            margin: 0;
        }
    }<% } %>
</style>