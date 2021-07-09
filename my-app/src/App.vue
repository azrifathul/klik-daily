<template>
  <v-app>
    <Order />
  </v-app>
</template>

<script>
import Order from "@/views/order/index";

export default {
  name: "App",
  components: {
    Order
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

//global css
.flex {
  display: flex;
}

.flex-between {
  justify-content: space-between;
}

.label {
  margin-bottom: 8px;
}

.flex-column {
  flex-direction: column;
}

.superscript-text {
  color: red;
}

.v-input {
  margin-right: 16px !important;
}
</style>
