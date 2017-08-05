<template>
    <div id="app">
        <appHeader></appHeader>
        <main><router-view></router-view></main>
    </div>
</template>

<script>
  import appHeader from './components/global/header.vue';
  import config from '../config';

  export default {
    name: 'app',
    components: {appHeader},

    <% if (features.foundation) { %>beforeMount: function () {
      require('./lib/foundation')({
        plugins: config.client.foundation.plugins || []
      });
    }<% } %>
  }
</script>

<style lang="scss">
    <% if (features.foundation) { %>@import './css/settings';
    @import 'foundation';
    @import 'motion-ui';

    @include foundation-global-styles;
    @include foundation-menu;
    @include foundation-top-bar;
    @include foundation-xy-grid-classes;
    @include foundation-typography;
    @include foundation-visibility-classes;
    @include foundation-flex-classes;
    @include motion-ui-transitions;
    @include motion-ui-animations;<% } %>

    <% if (features.fontawesome) { %>@import 'font-awesome';<% } %>
</style>