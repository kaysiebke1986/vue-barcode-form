<script setup lang="ts">
import { ref, computed } from 'vue'

// Types
type Language = 'DE' | 'EN' | 'PL'

interface TranslationContent {
  tooltipButton: string
  guideTitle: string
  guideIntro: string
  formFieldsTitle: string
  languageSelection: string
  labelSku: string
  labelDescription: string
  labelColor: string
  labelSize: string
  fieldSku: string
  fieldDescription: string
  fieldColorSize: string
  buttonsShortcutsTitle: string
  shortcutSubmit: string
  shortcutReset: string
  shortcutPrint: string
  additionalFunctionsTitle: string
  autoResetTitle: string
  autoResetOn: string
  autoResetOff: string
  autoInputTitle: string
  autoInputOn: string
  autoInputOff: string
  faultyTitle: string
  faultyDescription: string
  screenModesTitle: string
  portraitMode: string
  landscapeMode: string
  layoutNote: string
}

// State
const currentLang = ref<Language>('DE')
const showTooltip = ref(false)
const autoResetEnabled = ref(false)
const faultyEnabled = ref(false)
const autoDisplayEnabled = ref(false)

const sku = ref('')
const description = ref('')
const color = ref('')
const size = ref('')

// Translations
const translations = {
  DE: {
    tooltipButton: "Anleitung anzeigen",
    guideTitle: "Benutzeranleitung für das Formular",
    guideIntro: "Dieses Formular dient zur Eingabe und Verwaltung von Produktdaten wie SKU, Beschreibung, Farbe und Größe. Folgen Sie den Anweisungen, um Daten korrekt zu erfassen.",
    formFieldsTitle: "Formularfelder",
    languageSelection: "Sprache: Wählen Sie Deutsch (DE), Englisch (EN) oder Polnisch (PL). Die Sprache beeinflusst alle Beschriftungen.",
    labelSku: "SKU",
    labelDescription: "Beschreibung",
    labelColor: "Farbe",
    labelSize: "Größe",
    fieldSku: "SKU: Geben Sie die Produktnummer ein.",
    fieldDescription: "Beschreibung: Erfassen Sie eine kurze Produktbeschreibung.",
    fieldColorSize: "Farbe & Größe: Tragen Sie Farbe und Größe des Produkts in die entsprechenden Felder ein.",
    buttonsShortcutsTitle: "Schaltflächen und Tastenkombinationen",
    shortcutSubmit: "Submit-Button: speichert die eingegebenen Daten, wenn alle Pflichtfelder ausgefüllt sind. Tastenkombination: Enter.",
    shortcutReset: "Reset-Button: Löscht alle Eingaben und setzt das Formular zurück. Tastenkombination: Alt + R.",
    shortcutPrint: "Print Button: Öffnet die Druckvorschau des Formulars. Tastenkombination: Ctrl + P.",
    additionalFunctionsTitle: "Zusatzfunktionen",
    autoResetTitle: "Auto-Reset",
    autoResetOn: "Ein: Formular wird nach Absenden automatisch zurückgesetzt.",
    autoResetOff: "Aus: Eingaben bleiben erhalten.",
    autoInputTitle: "Auto Eingabe",
    autoInputOn: "Ein: Produktdaten werden automatisch befüllt, wenn verfügbar.",
    autoInputOff: "Aus: Manuelle Eingabe erforderlich.",
    faultyTitle: "Faulty",
    faultyDescription: "Aktivieren Sie diesen Schalter, um ein Produkt als fehlerhaft zu kennzeichnen.",
    screenModesTitle: "Bildschirmmodi",
    portraitMode: "Hochformat: Vertikale Anordnung, geeignet für mobile Geräte.",
    landscapeMode: "Querformat: Breitere Ansicht mit Info-Feld neben den Eingabefeldern.",
    layoutNote: "Hinweis: Das Layout passt sich automatisch an die Bildschirmgröße an."
  },
  EN: {
    tooltipButton: "Show Guide",
    guideTitle: "User Guide for the Form",
    guideIntro: "This form is used for entering and managing product data such as SKU, description, color, and size. Follow the instructions to enter data correctly.",
    formFieldsTitle: "Form Fields",
    languageSelection: "Language: Choose German (DE), English (EN), or Polish (PL). The language affects all labels.",
    labelSku: "SKU",
    labelDescription: "Description",
    labelColor: "Color",
    labelSize: "Size",
    fieldSku: "SKU: Enter the product number.",
    fieldDescription: "Description: Enter a short product description.",
    fieldColorSize: "Color & Size: Enter the color and size of the product in the appropriate fields.",
    buttonsShortcutsTitle: "Buttons and Keyboard Shortcuts",
    shortcutSubmit: "Submit Button: saves the entered data if all required fields are filled out. Keyboard shortcut: Enter.",
    shortcutReset: "Reset Button: Clears all entries and resets the form. Keyboard shortcut: Alt + R.",
    shortcutPrint: "Print Button: Opens the print preview of the form. Keyboard shortcut: Ctrl + P.",
    additionalFunctionsTitle: "Additional Functions",
    autoResetTitle: "Auto-Reset",
    autoResetOn: "On: Form is automatically reset after submission.",
    autoResetOff: "Off: Entries are retained.",
    autoInputTitle: "Auto Input",
    autoInputOn: "On: Product data is automatically filled in if available.",
    autoInputOff: "Off: Manual entry is required.",
    faultyTitle: "Faulty",
    faultyDescription: "Activate this switch to mark a product as faulty.",
    screenModesTitle: "Screen Modes",
    portraitMode: "Portrait Mode: Vertical layout, suitable for mobile devices.",
    landscapeMode: "Landscape Mode: Wider view with info box next to input fields.",
    layoutNote: "Note: The layout adjusts automatically to the screen size."
  },
  PL: {
    tooltipButton: "Pokaż instrukcję",
    guideTitle: "Instrukcja obsługi formularza",
    guideIntro: "Ten formularz służy do wprowadzania i zarządzania danymi produktów, takimi jak SKU, opis, kolor i rozmiar. Postępuj zgodnie z instrukcjami, aby poprawnie wprowadzić dane.",
    formFieldsTitle: "Pola formularza",
    languageSelection: "Język: Wybierz niemiecki (DE), angielski (EN) lub polski (PL). Język wpływa na wszystkie etykiety.",
    labelSku: "SKU",
    labelDescription: "Opis",
    labelColor: "Kolor",
    labelSize: "Rozmiar",
    fieldSku: "SKU: Wprowadź numer produktu.",
    fieldDescription: "Opis: Wprowadź krótki opis produktu.",
    fieldColorSize: "Kolor i Rozmiar: Wprowadź kolor i rozmiar produktu w odpowiednich polach.",
    buttonsShortcutsTitle: "Przyciski i skróty klawiszowe",
    shortcutSubmit: "Przycisk Zatwierdź: zapisuje wprowadzone dane, jeśli wszystkie wymagane pola są wypełnione. Skrót klawiszowy: Enter.",
    shortcutReset: "Przycisk Resetuj: Czyści wszystkie wpisy i resetuje formularz. Skrót klawiszowy: Alt + R.",
    shortcutPrint: "Przycisk Drukuj: Otwiera podgląd wydruku formularza. Skrót klawiszowy: Ctrl + P.",
    additionalFunctionsTitle: "Dodatkowe funkcje",
    autoResetTitle: "Autoreset",
    autoResetOn: "Włączony: Formularz jest automatycznie resetowany po zatwierdzeniu.",
    autoResetOff: "Wyłączony: Wpisane dane zostają zachowane.",
    autoInputTitle: "Automatyczne wypełnianie",
    autoInputOn: "Włączone: Dane produktu są automatycznie wypełniane, jeśli są dostępne.",
    autoInputOff: "Wyłączone: Wymagane jest ręczne wprowadzenie danych.",
    faultyTitle: "Wadliwe",
    faultyDescription: "Włącz ten przełącznik, aby oznaczyć produkt jako wadliwy.",
    screenModesTitle: "Tryby ekranu",
    portraitMode: "Tryb portretowy: Układ pionowy, odpowiedni dla urządzeń mobilnych.",
    landscapeMode: "Tryb poziomy: Szerszy widok z polem informacji obok pól wprowadzania.",
    layoutNote: "Uwaga: Układ dostosowuje się automatycznie do rozmiaru ekranu."
  }
} as const

// Functions
const t = computed(() => (key: keyof TranslationContent) => {
  return translations[currentLang.value][key]
})

function toggleTooltip() {
  showTooltip.value = !showTooltip.value
}

function setLanguage(lang: Language) {
  currentLang.value = lang
}
</script>

<template>
  <div class="myli-container">
    <!-- Language Selection -->
    <div class="language-buttons">
      <button
        v-for="lang in ['DE', 'EN', 'PL']"
        :key="lang"
        @click="setLanguage(lang as Language)"
        :class="{ active: currentLang === lang }"
        class="language-button"
      >
        <span :class="`flag-icon flag-icon-${lang.toLowerCase()}`"></span>
      </button>
    </div>

    <!-- Form Fields -->
    <form class="input-form mb-4">
      <div class="form-group">
        <label for="sku">{{ t('labelSku') }}:</label>
        <input 
          type="text" 
          id="sku" 
          v-model="sku" 
          class="form-input" 
          required
        />
      </div>

      <div class="form-group">
        <label for="description">{{ t('labelDescription') }}:</label>
        <input 
          type="text" 
          id="description" 
          v-model="description" 
          class="form-input" 
          required
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="color">{{ t('labelColor') }}:</label>
          <input 
            type="text" 
            id="color" 
            v-model="color" 
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="size">{{ t('labelSize') }}:</label>
          <input 
            type="text" 
            id="size" 
            v-model="size" 
            class="form-input"
          />
        </div>
      </div>
    </form>

    <!-- Tooltip Container -->
    <div data-lang="tooltip-container" class="tooltip-container">
      <button 
        data-lang="tooltipButton" 
        class="tooltip-button"
        @click="toggleTooltip"
        aria-describedby="tooltip-content"
      >
        {{ t('tooltipButton') }}
      </button>
      
      <div 
        v-if="showTooltip" 
        data-lang="tooltipContent" 
        class="tooltip" 
        role="tooltip"
        id="tooltip-content"
      >
        <h2 class="text-xl font-bold mb-4">Benutzeranleitung für das Formular</h2>
        <p class="mb-4">
          Dieses Formular dient zur Eingabe und Verwaltung von Produktdaten wie SKU, Beschreibung, Farbe und Größe. Folgen Sie den Anweisungen, um Daten korrekt zu erfassen.
        </p>

        <h3 class="text-lg font-bold mb-2">Formularfelder</h3>
        <p class="mb-2">
          Sprache: Wählen Sie Deutsch (DE), Englisch (EN) oder Polnisch (PL). Die Sprache beeinflusst alle Beschriftungen.
        </p>
        <ul class="mb-4 list-disc pl-4">
          <li><strong>SKU:</strong> Geben Sie die Produktnummer ein.</li>
          <li><strong>Beschreibung:</strong> Erfassen Sie eine kurze Produktbeschreibung.</li>
          <li><strong>Farbe & Größe:</strong> Tragen Sie Farbe und Größe des Produkts in die entsprechenden Felder ein.</li>
        </ul>

        <h3 class="text-lg font-bold mb-2">Schaltflächen und Tastenkombinationen</h3>
        <ul class="mb-4 list-disc pl-4">
          <li>
            <strong>Submit-Button: </strong>speichert die eingegebenen Daten, wenn alle Pflichtfelder ausgefüllt sind. Tastenkombination<em>: <strong>Enter</strong></em><strong>.</strong>
          </li>
          <li>
            <strong>Reset-Button:</strong> Löscht alle Eingaben und setzt das Formular zurück. Tastenkombination<em>: <strong>Alt</strong></em><strong>+ R.</strong>
          </li>
          <li>
            <strong>Print Button:</strong> Öffnet die Druckvorschau des Formulars. Tastenkombination<em>: <strong>Ctrl</strong></em><strong>+ P.</strong>
          </li>
        </ul>

        <h3 class="text-lg font-bold mb-2">Zusatzfunktionen</h3>
        <p class="mb-2"><strong>Auto-Reset:</strong></p>
        <ul class="mb-4 list-disc pl-4">
          <li><strong>Ein:</strong> Formular wird nach Absenden automatisch zurückgesetzt.</li>
          <li><strong>Aus:</strong> Eingaben bleiben erhalten.</li>
        </ul>

        <p class="mb-2"><strong>Auto Eingabe:</strong></p>
        <ul class="mb-4 list-disc pl-4">
          <li><strong>Ein:</strong> Produktdaten werden automatisch befüllt, wenn verfügbar.</li>
          <li><strong>Aus:</strong> Manuelle Eingabe erforderlich.</li>
        </ul>

        <p class="mb-2"><strong>Faulty:</strong></p>
        <ul class="mb-4 list-disc pl-4">
          <li>Aktivieren Sie diesen Schalter, um ein Produkt als fehlerhaft zu kennzeichnen.</li>
        </ul>

        <h3 class="text-lg font-bold mb-2">Bildschirmmodi</h3>
        <ul class="mb-4 list-disc pl-4">
          <li><strong>Hochformat:</strong> Vertikale Anordnung, geeignet für mobile Geräte.</li>
          <li><strong>Querformat:</strong> Breitere Ansicht mit Info-Feld neben den Eingabefeldern.</li>
        </ul>
        
        <p class="mt-2">Hinweis: Das Layout passt sich automatisch an die Bildschirmgröße an.</p>
      </div>
    </div>

    <!-- Buttons -->
    <div class="button-group mb-4">
      <button type="submit" class="btn">Submit</button>
      <button type="reset" class="btn">Reset</button>
      <button type="button" class="btn">Print</button>
    </div>

    <!-- Switches -->
    <div class="schalter-container">
      <div class="schalter-wrapper">
        <label>{{ t('autoResetTitle') }}</label>
        <input type="checkbox" v-model="autoResetEnabled" />
      </div>
      <div class="schalter-wrapper">
        <label>{{ t('faultyTitle') }}</label>
        <input type="checkbox" v-model="faultyEnabled" />
      </div>
      <div class="schalter-wrapper">
        <label>{{ t('autoInputTitle') }}</label>
        <input type="checkbox" v-model="autoDisplayEnabled" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.myli-container {
  @apply p-4;
}

.language-buttons {
  @apply flex gap-2 mb-4;
}

.language-button {
  @apply px-3 py-2 rounded-lg border;
}

.language-button.active {
  @apply bg-blue-500 text-white;
}

.input-form {
  @apply space-y-4;
}

.form-group {
  @apply flex flex-col gap-1;
}

.form-row {
  @apply grid grid-cols-2 gap-4;
}

.form-input {
  @apply px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.tooltip-button {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors;
}

.tooltip {
  @apply absolute z-50 left-0 top-full mt-2 p-4 bg-white border rounded-lg shadow-lg;
  @apply w-96 max-h-[80vh] overflow-y-auto;
}

.button-group {
  @apply flex gap-2;
}

.btn {
  @apply px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors;
}

.schalter-container {
  @apply space-y-2;
}

.schalter-wrapper {
  @apply flex items-center justify-between p-2 bg-gray-100 rounded;
}

@media (max-width: 640px) {
  .tooltip {
    @apply w-full left-0 right-0;
  }
  
  .form-row {
    @apply grid-cols-1;
  }
}
</style>