<template>
  <div class="main-container">
    <h3 class="title">Create Order</h3>
    <div class="order-container">
      <SectionDetail :checkDetailSection="checkDetailSection" />
      <div v-if="checkDetailSection">
        <SectionProduct
          :checkDetailSection="checkDetailSection"
          v-for="index in totalProduct"
          :key="index"
          :productId="index-1"
        />
        <v-btn
          depressed
          color="warning"
          @click="addProductHandler"
          class="warning-button"
        >New Item +</v-btn>
      </div>

      <v-divider></v-divider>

      <div class="total-text flex flex-between">
        <H3>Total</H3>
        <h4>{{totalPriceHandler}}</h4>
      </div>

      <div class="submit-container">
        <button class="cancel-button">cancel</button>

        <v-btn class="ma-2" :disabled="!checkAllValidation" color="success">CONFIRM</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import SectionDetail from "./detailSection/index";
import SectionProduct from "./productSection/index";
export default {
  components: {
    SectionDetail,
    SectionProduct
  },
  methods: {
    addProductHandler() {
      this.$store.commit("addProductHandler");
    },
    checkProductValidation(products) {
      let result = true;
      products.forEach(product => {
        if (!product.productName || !product.productUnit || !product.quantity) {
          result = false;
        }
      });

      return result;
    }
  },
  computed: {
    checkDetailSection() {
      const { distributorName, distributorCenter } = this.$store.state.formData;
      return distributorName && distributorCenter;
    },
    totalProduct() {
      return this.$store.state.formData.products.length || 1;
    },
    totalPriceHandler() {
      let priceTotal = 0;
      const { products } = this.$store.state.formData;
      if (products.length) {
        products.forEach(product => {
          if (product.productUnit) {
            const quantity = product.quantity || 1;
            priceTotal = quantity * product.productUnit.price + priceTotal;
          }
        });
      }
      return priceTotal;
    },
    checkAllValidation() {
      const { formData } = this.$store.state;
      const {
        distributorCenter,
        distributorName,
        paymentType,
        date,
        notes,
        products
      } = formData;
      const productsValidate = this.checkProductValidation(products);
      if (
        distributorCenter &&
        distributorName &&
        paymentType &&
        date &&
        notes &&
        productsValidate
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./styles.scss";
</style>
