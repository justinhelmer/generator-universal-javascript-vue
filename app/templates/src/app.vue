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
        plugins: config.foundation.plugins || []
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
    @include foundation-forms;
    @include foundation-button;
    @include foundation-visibility-classes;
    @include foundation-flex-classes;
    @include motion-ui-transitions;
    @include motion-ui-animations;<% } %>

    <% if (features.fontawesome) { %>@import 'font-awesome';<% } %>

    <% if (features.foundation) { %>h1 {
        border-bottom: $hr-border;
    }

    .content {
        background: $white;
        border: 1px solid $light-gray;
        max-width: $global-width;
        margin: 0 auto;

        @include -zf-breakpoint-value('auto', $grid-container-padding) {
            padding: 0 rem-calc($-zf-bp-value) / 2
        }
    }<% } %>
</style>