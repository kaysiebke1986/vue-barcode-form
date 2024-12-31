<template>
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
      autoReset: false,
      isFaulty: false,
      autoInput: false
    }
  },
  methods: {
    toggleFaultLabel() {
      this.$emit('faulty-changed', this.isFaulty)
    },
    toggleAutoDisplay() {
      this.$emit('auto-display-changed', this.autoInput)
    }
  },
  watch: {
    autoReset(newVal) {
      this.$emit('auto-reset-changed', newVal)
    }
  }
}
</script>