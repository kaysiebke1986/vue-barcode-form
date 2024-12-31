<template>
  <div class="tooltip-container">
    <button class="tooltip-button" @click="toggleTooltip" aria-describedby="tooltip-content">
      {{ translations.tooltipButton || 'Anleitung anzeigen' }}
    </button>
    <div class="tooltip-content" v-if="showTooltip" id="tooltip-content" role="tooltip">
      <h2>{{ translations.guideTitle }}</h2>
      <p>{{ translations.guideIntro }}</p>
      <h3>{{ translations.formFieldsTitle }}</h3>
      <p>{{ translations.languageSelection }}</p>
      <ul>
        <li><span class="tooltip-bold">SKU:</span> {{ translations.fieldSkuText }}</li>
        <li><span class="tooltip-bold">{{ translations.description }}:</span> {{ translations.fieldDescriptionText }}</li>
        <li><span class="tooltip-bold">{{ translations.colorSize }}:</span> {{ translations.fieldColorSizeText }}</li>
      </ul>
      <!-- Rest of tooltip content -->
    </div>
  </div>
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
      showTooltip: false
    }
  },
  methods: {
    toggleTooltip() {
      this.showTooltip = !this.showTooltip
    }
  }
}
</script>