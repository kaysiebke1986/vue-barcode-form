<template>
  <div class="info-box info-box-print" id="infoBox">
    <div class="info-content">
      <span class="sku">{{ form.sku }}</span>
      <svg class="barcode" ref="barcode"></svg>
      <div class="additional-info">
        <span class="size-color">{{ form.color }} / {{ form.size }}</span>
        <div class="description">{{ form.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.initBarcode()
  },
  methods: {
    initBarcode() {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js'
      script.onload = this.generateBarcode
      document.head.appendChild(script)
    },
    generateBarcode() {
      const { sku } = this.form
      if (sku && window.JsBarcode) {
        window.JsBarcode('.barcode', sku, {
          format: "CODE128",
          lineColor: "#000",
          width: 2,
          height: 50,
          displayValue: false
        })
      }
    }
  },
  watch: {
    'form.sku': function() {
      this.generateBarcode()
    }
  }
}
</script>