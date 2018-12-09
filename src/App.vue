<template>
  <v-app>
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-slider
            v-model="slider"
            min="0"
            max="180"
          ></v-slider>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    slider: {
      get() {
        return this.$store.state.position;
      },
      set(val) {
        this.$store.dispatch('setPosition', val);
      }
    }
  }
}
</script>
