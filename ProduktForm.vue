<template>
  <form @submit.prevent="submitForm" class="form-grid">
    <div class="input-group">
      <label for="sku">SKU:</label>
      <input type="search" id="sku" v-model="form.sku" required />
    </div>

    <div class="input-group">
      <label for="description">{{ translations.description }}:</label>
      <input type="search" id="description" v-model="form.description" required />
    </div>

    <div class="color-size-container">
      <div class="input-group">
        <label for="color">{{ translations.color }}:</label>
        <input type="search" id="color" v-model="form.color" />
      </div>
      <div class="input-group">
        <label for="size">{{ translations.size }}:</label>
        <input type="search" id="size" v-model="form.size" />
      </div>
    </div>

    <div class="button-grid">
      <button type="submit">{{ translations.submit }}</button>
      <button type="reset" @click="resetForm">{{ translations.reset }}</button>
      <button type="button" @click="printPage">{{ translations.print }}</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    translations: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        sku: "",
        description: "",
        color: "",
        size: ""
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('form-submitted', this.form)
    },
    resetForm() {
      Object.assign(this.form, {
        sku: "",
        description: "",
        color: "",
        size: ""
      })
      this.$emit('form-reset')
    },
    printPage() {
      window.print()
    }
  }
}
</script>