const app = {
  data() {
    return {
      form: {
        sku: "",
        description: "",
        color: "",
        size: ""
      },
      isFaulty: false,
      autoReset: false,
      autoInput: false,
      showTooltip: false,
      selectedLanguage: 'DE',
      translations: translationsData.DE,
      logoUrl: 'https://www.shipwire.com/wp-content/uploads/2022/03/CEVA_Logo_White.png'
    }
  },
  mounted() {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js'
    script.onload = this.generateBarcode
    document.head.appendChild(script)
    
    this.$watch(() => this.form.sku, this.generateBarcode)
  },
  methods: {
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
    },
    changeLanguage(lang) {
      this.selectedLanguage = lang
      this.translations = translationsData[lang]
    },
    toggleFaultLabel() {
      this.isFaulty = !this.isFaulty
    },
    toggleAutoDisplay() {
      console.log('Auto Display toggled')
    },
    toggleTooltip() {
      this.showTooltip = !this.showTooltip
    },
    submitForm() {
      console.log('Form submitted:', this.form)
      if (this.autoReset) {
        this.resetForm()
      }
    },
    resetForm() {
      Object.assign(this.form, {
        sku: "",
        description: "",
        color: "",
        size: ""
      })
    },
    printPage() {
      window.print()
    }
  },
  template: `
  <div class="form-container">
    <!-- Sprachwahl -->
    <div class="language-container">
      <button class="language-button" @click="changeLanguage('DE')">
        <span class="flag-icon flag-icon-de">DE</span>
      </button>
      <button class="language-button" @click="changeLanguage('EN')">
        <span class="flag-icon flag-icon-gb">EN</span>
      </button>
      <button class="language-button" @click="changeLanguage('PL')">
        <span class="flag-icon flag-icon-pl">PL</span>
      </button>
    </div>

    <!-- Tooltip für Anleitung -->
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
        <h3>{{ translations.buttonsShortcutsTitle }}</h3>
        <ul>
          <li>
            <span class="tooltip-bold">Submit-Button:</span> 
            {{ translations.submitButtonText }}
            <span class="keyboard-shortcut">Enter</span>
          </li>
          <li>
            <span class="tooltip-bold">Reset-Button:</span>
            {{ translations.resetButtonText }}
            <span class="keyboard-shortcut">Alt+R</span>
          </li>
          <li>
            <span class="tooltip-bold">Print-Button:</span>
            {{ translations.printButtonText }}
            <span class="keyboard-shortcut">Ctrl+P</span>
          </li>
        </ul>
        <h3>{{ translations.additionalFunctionsTitle }}</h3>
        <ul>
          <li>
            <span class="tooltip-bold">{{ translations.autoReset }}</span>
            <div class="sub-item">{{ translations.autoResetOnText }}</div>
            <div class="sub-item">{{ translations.autoResetOffText }}</div>
          </li>
          <li>
            <span class="tooltip-bold">{{ translations.autoInput }}</span>
            <div class="sub-item">{{ translations.autoInputOnText }}</div>
            <div class="sub-item">{{ translations.autoInputOffText }}</div>
          </li>
          <li>
            <span class="tooltip-bold">{{ translations.faulty }}</span>
            <div>{{ translations.faultyActivateText }}</div>
          </li>
        </ul>
        <h3>{{ translations.screenModesTitle }}</h3>
        <ul>
          <li>
            <span class="tooltip-bold">{{ translations.portraitModeTitle }}</span>
            {{ translations.portraitModeText }}
          </li>
          <li>
            <span class="tooltip-bold">{{ translations.landscapeModeTitle }}</span>
            {{ translations.landscapeModeText }}
          </li>
        </ul>
        <p>{{ translations.layoutNote }}</p>
      </div>
    </div>

    <!-- Info-Box -->
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

    <!-- Formular -->
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

    <!-- Schalter -->
    <div class="schalter-container">
      <div class="schalter-wrapper">
        <label>
          {{ translations.autoReset }}
          <input type="checkbox" v-model="autoReset" />
        </label>
      </div>
      <div class="schalter-wrapper">
        <label>
          {{ translations.faultySwitch }}
          <input type="checkbox" v-model="isFaulty" @change="toggleFaultLabel" />
        </label>
      </div>
      <div class="schalter-wrapper">
        <label>
          {{ translations.autoDisplay }}
          <input type="checkbox" v-model="autoInput" @change="toggleAutoDisplay" />
        </label>
      </div>
    </div>

    <!-- Logo -->
    <div class="logo-container">
      <img class="logo" :src="logoUrl" alt="CEVA Logo" width="200" />
    </div>
  </div>
  `
}

export default app;