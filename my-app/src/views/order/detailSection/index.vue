<template>
  <div class="section-detail-container">
    <div class="section-detail__left">
      <h4>Detail</h4>
    </div>
    <div class="section-detail__right">
      <SelectField
        :selectOptions="selectOptionsName"
        :labelName="'Name'"
        :inputPlaceholder="'Name'"
        :type="'distributorName'"
      />
      <SelectField
        :selectOptions="selectOptionsDistributorCenter"
        :labelName="'Distribution Center'"
        :inputPlaceholder="'Distribution Center'"
        :type="'distributorCenter'"
      />
      <div class="flex flex-betweern">
        <SelectField
          :selectOptions="selectOptionsPaymentType"
          :labelName="'Payment Type'"
          :inputPlaceholder="'Payment Type'"
          :type="'paymentType'"
          v-if="checkDetailSection"
        />
        <DateInput v-if="checkDetailSection" />
      </div>
      <h5 class="label" v-if="checkDetailSection">
        Notes
        <sup class="superscript-text">*</sup>
      </h5>
      <v-textarea
        solo
        name="input-7-4"
        v-if="checkDetailSection"
        @change="changeInputHandler($event, 'notes')"
        @input="changeInputHandler($event, 'notes')"
      ></v-textarea>
    </div>
  </div>
</template>

<script>
import SelectField from "@/components/selectField/index";
import DateInput from "@/components/dates/index";

export default {
  props: ["checkDetailSection"],
  name: "sectionDetail",
  components: {
    SelectField,
    DateInput
  },
  async created() {
    await this.$store.dispatch("getEmployeeHandler");
  },
  data() {
    return {
      selectOptionsPaymentType: [
        "Cash H+1",
        "Cash H+3",
        "Cash H+7",
        "Transfer H+1",
        "Transfer H+3",
        "Transfer H+7"
      ]
    };
  },
  methods: {
    datePickerToggle() {
      isOpenDatePicker = !isOpenDatePicker;
    },
    changeInputHandler(event, category) {
      this.$store.commit("changeFormDataMutation", {
        type: category,
        value: event
      });
    }
  },
  computed: {
    selectOptionsName() {
      const getEmployeeNameList = this.$store.state.employees.map(employee => {
        return employee.employee_name;
      });
      return getEmployeeNameList;
    },
    selectOptionsDistributorCenter() {
      return this.$store.state.distributorCenter;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles.scss";
</style>
