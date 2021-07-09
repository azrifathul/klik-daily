<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="picker"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <div class="flex flex-column">
        <h5 class="label">
          Expired Date
          <sup class="superscript-text">*</sup>
        </h5>
        <v-combobox
          v-model="picker"
          small-chips
          label="Expired Date"
          readonly
          v-bind="attrs"
          v-on="on"
          solo
        ></v-combobox>
      </div>
    </template>
    <v-date-picker v-model="picker" color="green lighten-1">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="changeInputHandler">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "dateInput",
  data() {
    return {
      menu: false,
      picker: ""
    };
  },
  methods: {
    changeInputHandler() {
      this.$refs.menu.save(this.picker);
      this.$store.commit("changeFormDataMutation", {
        type: "date",
        value: this.picker
      });
    }
  }
};
</script>

<style></style>
