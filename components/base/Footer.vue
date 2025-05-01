<script lang="ts" setup>
const current_year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t-sm text-center pa-4 px-md-8">
    <p class="text-caption">QAV Quiz ao Vivo, 2025 - {{ current_year }}</p>
    <p class="text-caption">Contato: quizaovivo.qav@gmail.com</p>
    <div class="images mt-8">
      <img src="/images/footer/ufsc.png" alt="Brasão da UFSC">
      <img src="/images/footer/ine.png" alt="Brasão do INE">
      <img src="/images/footer/gqs.png" alt="Brasão do GQS">
    </div>
  </footer>
</template>

<style lang="sass" scoped>
footer
  .images
    display: flex
    align-items: center
    justify-content: center
    flex-wrap: wrap
    gap: 40px
    img
      height: 80px
</style>
