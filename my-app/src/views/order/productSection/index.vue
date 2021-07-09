<template>
  <div class="section-product-container">
    <div class="section-product__left">
      <h4>Product</h4>
    </div>
    <div class="section-product__right">
      <i class="fas fa-trash icon" v-if="productId !== 0" @click="deleteProductHandler"></i>
      <div class="flex flex-between">
        <SelectField
          :selectOptions="selectProductOptions"
          :labelName="'Product'"
          :inputPlaceholder="'Product'"
          :type="'productName'"
          :productId="productId"
        />
        <SelectField
          :selectOptions="selectProductUnitsOptions"
          :labelName="'Unit'"
          :inputPlaceholder="'Unit'"
          :type="'productUnit'"
          :productId="productId"
        />
      </div>

      <div class="flex flex-between">
        <InputField
          :label="'Quantity'"
          :isReadOnly="false"
          :productId="productId"
          :value="quantityValue"
        />
        <InputField :label="'Price'" :isReadOnly="true" :value="productPrice" />
        <InputField
          :label="'Total Price'"
          :isReadOnly="true"
          :value="productPriceTotal"
          :backgroundColor="'grey'"
        />
      </div>

      <v-divider></v-divider>
      <div class="subtotal-text flex flex-between">
        Total Net Price
        <div>{{productPriceTotal}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectField from "@/components/selectField/index";
import InputField from "@/components/inputField/index";

export default {
  props: ["checkDetailSection", "productId"],
  name: "sectionProduct",
  components: {
    SelectField,
    InputField
  },
  created() {
    console.log(this.productId);
  },
  methods: {
    deleteProductHandler() {
      this.$store.commit("deleteProductHandler", { productId: this.productId });
    }
  },
  computed: {
    selectProductOptions() {
      const optionsList = this.$store.state.products.map(product => {
        return product.product_name;
      });
      return optionsList;
    },
    selectProductUnitsOptions() {
      const { products } = this.$store.state.formData;
      if (products[this.productId] && products[this.productId].productName) {
        return products[this.productId].productName.units.map(option => {
          return option.name;
        });
      }
      return [];
    },
    productPrice() {
      const { products } = this.$store.state.formData;
      const product = products[this.productId];
      if (product && product.productUnit) {
        return product.productUnit.price;
      }
      return "";
    },
    quantityValue() {
      const { products } = this.$store.state.formData;
      const product = products[this.productId];
      if (product && product.quantity) {
        return product.quantity;
      }
      return "";
    },
    productPriceTotal() {
      const { products } = this.$store.state.formData;
      const product = products[this.productId];
      if (product && product.productUnit) {
        const pricing = product.productUnit.price
          ? product.quantity
            ? product.quantity * product.productUnit.price
            : product.productUnit.price
          : "";
        return pricing;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles.scss";
</style>
