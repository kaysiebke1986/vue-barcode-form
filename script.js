const { createApp, ref, reactive, onMounted, watch } = Vue

createApp({
    template: `<div class="form-container">
<!-- Sprachwahl mit Flaggen -->
    <div class="language-container">
      <button
        class="language-button"
        @click="changeLanguage('DE')"
        aria-label="Deutsch"
      >
        <img src="https://flagcdn.com/w40/de.png" alt="Deutsch" />
      </button>
      <button
        class="language-button"
        @click="changeLanguage('EN')"
        aria-label="Englisch"
      >
        <img src="https://flagcdn.com/w40/gb.png" alt="Englisch" />
      </button>
      <button
        class="language-button"
        @click="changeLanguage('PL')"
        aria-label="Polnisch"
      >
        <img src="https://flagcdn.com/w40/pl.png" alt="Polnisch" />
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
  </div>`,
    setup() {
        const translationsData = {
            DE: {
                description: "Beschreibung",
                color: "Farbe",
                size: "Größe",
                submit: "Absenden",
                reset: "Zurücksetzen",
                print: "Drucken",
                autoReset: "Auto-Reset",
                faultySwitch: "Faulty Label",
                autoDisplay: "Auto Display",
                tooltipButton: "Anleitung anzeigen",
                guideTitle: "Benutzeranleitung für das Formular",
                guideIntro: "Dieses Formular dient zur Eingabe und Verwaltung von Produktdaten wie SKU, Beschreibung, Farbe und Größe. Folgen Sie den Anweisungen, um Daten korrekt zu erfassen.",
                formFieldsTitle: "Formularfelder",
                languageSelection: "Sprache: Wählen Sie Deutsch (DE), Englisch (EN) oder Polnisch (PL). Die Sprache beeinflusst alle Beschriftungen.",
                fieldSkuText: "Geben Sie die Produktnummer ein.",
                fieldDescriptionText: "Erfassen Sie eine kurze Produktbeschreibung.",
                fieldColorSizeText: "Tragen Sie Farbe und Größe des Produkts in die entsprechenden Felder ein.",
                buttonsShortcutsTitle: "Schaltflächen und Tastenkombinationen",
                submitButtonText: "speichert die eingegebenen Daten, wenn alle Pflichtfelder ausgefüllt sind.",
                resetButtonText: "Löscht alle Eingaben und setzt das Formular zurück.",
                printButtonText: "Öffnet die Druckvorschau des Formulars.",
                additionalFunctionsTitle: "Zusatzfunktionen",
                autoResetOnText: "Ein: Formular wird nach Absenden automatisch zurückgesetzt.",
                autoResetOffText: "Aus: Eingaben bleiben erhalten.",
                autoInputOnText: "Ein: Produktdaten werden automatisch befüllt, wenn verfügbar.",
                autoInputOffText: "Aus: Manuelle Eingabe erforderlich.",
                faultyActivateText: "Aktivieren Sie diesen Schalter, um ein Produkt als fehlerhaft zu kennzeichnen.",
                portraitModeTitle: "Hochformat:",
                portraitModeText: "Vertikale Anordnung, geeignet für mobile Geräte.",
                landscapeModeTitle: "Querformat:",
                landscapeModeText: "Breitere Ansicht mit Info-Feld neben den Eingabefeldern.",
                layoutNote: "Hinweis: Das Layout passt sich automatisch an die Bildschirmgröße an.",
                colorSize: "Farbe & Größe"
            },
            EN: {
                description: "Description",
                color: "Color",
                size: "Size",
                submit: "Submit",
                reset: "Reset",
                print: "Print",
                autoReset: "Auto-Reset",
                faultySwitch: "Faulty Label",
                autoDisplay: "Auto Display",
                tooltipButton: "Show Instructions",
                guideTitle: "User Guide for the Form",
                guideIntro: "This form is used to enter and manage product data such as SKU, description, color, and size. Follow the instructions to ensure accurate data entry.",
                formFieldsTitle: "Form Fields",
                languageSelection: "Language: Choose German (DE), English (EN), or Polish (PL). The language affects all labels.",
                fieldSkuText: "Enter the product number.",
                fieldDescriptionText: "Provide a short product description.",
                fieldColorSizeText: "Enter the product's color and size in the appropriate fields.",
                buttonsShortcutsTitle: "Buttons and Keyboard Shortcuts",
                submitButtonText: "saves the entered data when all required fields are filled.",
                resetButtonText: "Clears all inputs and resets the form.",
                printButtonText: "Opens the print preview of the form.",
                additionalFunctionsTitle: "Additional Functions",
                autoResetOnText: "On: The form will automatically reset after submission.",
                autoResetOffText: "Off: Inputs remain saved.",
                autoInputOnText: "On: Product data is automatically filled if available.",
                autoInputOffText: "Off: Manual input is required.",
                faultyActivateText: "Activate this switch to mark a product as faulty.",
                portraitModeTitle: "Portrait Mode:",
                portraitModeText: "Vertical arrangement, suitable for mobile devices.",
                landscapeModeTitle: "Landscape Mode:",
                landscapeModeText: "Wider view with info box next to input fields.",
                layoutNote: "Note: The layout automatically adjusts to the screen size.",
                colorSize: "Color & Size"
            },
            PL: {
                description: "Opis",
                color: "Kolor",
                size: "Rozmiar",
                submit: "Zatwierdź",
                reset: "Resetuj",
                print: "Drukuj",
                autoReset: "Autoreset",
                faultySwitch: "Uszkodzony Etykieta",
                autoDisplay: "Automatyczne wyświetlanie",
                tooltipButton: "Pokaż instrukcje",
                guideTitle: "Instrukcja obsługi formularza",
                guideIntro: "Ten formularz służy do wprowadzania i zarządzania danymi produktów, takimi jak SKU, opis, kolor i rozmiar. Postępuj zgodnie z instrukcjami, aby poprawnie wprowadzić dane.",
                formFieldsTitle: "Pola formularza",
                languageSelection: "Język: Wybierz niemiecki (DE), angielski (EN) lub polski (PL). Język wpływa na wszystkie etykiety.",
                fieldSkuText: "Wprowadź numer produktu.",
                fieldDescriptionText: "Podaj krótki opis produktu.",
                fieldColorSizeText: "Wprowadź kolor i rozmiar produktu w odpowiednich polach.",
                buttonsShortcutsTitle: "Przyciski i skróty klawiszowe",
                submitButtonText: "zapisuje wprowadzone dane, gdy wszystkie wymagane pola są wypełnione.",
                resetButtonText: "Czyści wszystkie wpisy i resetuje formularz.",
                printButtonText: "Otwiera podgląd wydruku formularza.",
                additionalFunctionsTitle: "Dodatkowe funkcje",
                autoResetOnText: "Włączony: Formularz automatycznie resetuje się po przesłaniu.",
                autoResetOffText: "Wyłączony: Dane zostają zapisane.",
                autoInputOnText: "Włączone: Dane produktów są automatycznie uzupełniane, jeśli są dostępne.",
                autoInputOffText: "Wyłączone: Wymagane jest ręczne wprowadzenie danych.",
                faultyActivateText: "Aktywuj ten przełącznik, aby oznaczyć produkt jako uszkodzony.",
                portraitModeTitle: "Tryb portretowy:",
                portraitModeText: "Układ pionowy, odpowiedni dla urządzeń mobilnych.",
                landscapeModeTitle: "Tryb poziomy:",
                landscapeModeText: "Szeroki widok z polem informacyjnym obok pól wprowadzania.",
                layoutNote: "Uwaga: Układ automatycznie dostosowuje się do rozmiaru ekranu.",
                colorSize: "Kolor i Rozmiar"
            }
        }

        const form = reactive({
            sku: "",
            description: "",
            color: "",
            size: ""
        })

        const isFaulty = ref(false)
        const autoReset = ref(false)
        const autoInput = ref(false)
        const showTooltip = ref(false)
        const selectedLanguage = ref('DE')
        const translations = ref(translationsData.DE)
        const logoUrl = ref('https://www.shipwire.com/wp-content/uploads/2022/03/CEVA_Logo_White.png')

        const generateBarcode = () => {
            const { sku } = form
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

        watch(() => form.sku, generateBarcode)

        onMounted(() => {
            generateBarcode()
        })

        const changeLanguage = (lang) => {
            selectedLanguage.value = lang
            translations.value = translationsData[lang]
        }

        const toggleFaultLabel = () => isFaulty.value = !isFaulty.value
        const toggleAutoDisplay = () => console.log('Auto Display toggled')
        const toggleTooltip = () => showTooltip.value = !showTooltip.value
        const submitForm = () => {
            console.log('Form submitted:', form)
            if (autoReset.value) {
                resetForm()
            }
        }
        const resetForm = () => {
            Object.assign(form, {
                sku: "",
                description: "",
                color: "",
                size: ""
            })
        }
        const printPage = () => window.print()

        return {
            form,
            isFaulty,
            autoReset,
            autoInput,
            showTooltip,
            selectedLanguage,
            translations,
            logoUrl,
            generateBarcode,
            changeLanguage,
            toggleFaultLabel,
            toggleAutoDisplay,
            toggleTooltip,
            submitForm,
            resetForm,
            printPage
        }
    }
}).mount('#app')