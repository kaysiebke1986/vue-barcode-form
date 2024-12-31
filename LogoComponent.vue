<template>
  <div class="logo-container">
    <img class="logo" :src="logoUrl" alt="CEVA Logo" width="200" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoUrl: 'https://www.shipwire.com/wp-content/uploads/2022/03/CEVA_Logo_White.png'
    }
  }
}
</script>