<template>
    <div id="profile"<% if (features.foundation) { %> class="content"<% } %>>
        <h1>{{fullName}}</h1>
        <h3>Email address</h3>
        <div>{{user.email}}</div>
        <hr/>
        <% if (features.keystone) { %><a v-if="user.canAccessKeystone" href="/keystone/signin" class="button">Admin Dashboard</a><% } %>
    </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'profile',

    asyncData ({ store }) {
      return store.dispatch('fetch', {
        id: store.state.global.user._id,
        endpoint: 'users',
        namespace: 'user',
        global: true
      });
    },

    computed: {
      user () {
        return this.$store.state.global.user;
      },

      fullName() {
        const name = this.$store.state.global.user.name;

        if (name) {
          return name.first + ' ' + name.last;
        }

        return '';
      }
    }
  }
</script>