<template>
  <div class="select-container">
    <h5 class="label">
      {{ labelName }}
      <sup class="superscript-text">*</sup>
    </h5>
    <v-select :items="selectOptions" :label="inputPlaceholder" solo @change="changeHandler"></v-select>
  </div>
</template>

<script>
export default {
  props: [
    "selectOptions",
    "labelName",
    "inputPlaceholder",
    "type",
    "productId"
  ],
  name: "selectComponent",
  methods: {
    changeHandler(value) {
      this.$store.commit("changeFormDataMutation", {
        type: this.type,
        value,
        productId: this.productId
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles.scss";
</style>
