<template>
  <div>
    <h5 class="label">
      {{ label }}
      <sup class="superscript-text">*</sup>
    </h5>
    <v-text-field
      :label="label"
      solo
      :readonly="isReadOnly"
      :value="value"
      @change="changeInputHandler($event, 'quantity')"
      @input="changeInputHandler($event, 'quantity')"
      :background-color="backgroundColor"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: ["label", "isReadOnly", "value", "productId", "backgroundColor"],
  name: "inputField",
  methods: {
    changeInputHandler(event, category) {
      this.$store.commit("changeFormDataMutation", {
        type: category,
        value: Number(event),
        productId: this.productId
      });
    }
  }
};
</script>

<style></style>
