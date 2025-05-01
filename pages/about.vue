<script lang="ts" setup>
definePageMeta({
  ssr: true,
  layout: 'header',
})
</script>

<template>
  <div class="page-content d-flex flex-column">
    <main class="pa-4 pa-md-8 flex-grow-1">
      <h1>Sobre o <span class="highlight">Q</span>AV</h1>
      <p>O QAV (Quiz ao Vivo) nasceu como o Trabalho de Conclusão de Curso de graduação em Ciências da Computação,
        vinculado ao Departamento de Informática e Estatística (INE) do Centro Tecnológico (CTC) da Universidade
        Federal de Santa Catarina (UFSC). O projeto foi implementado por Gabriel de Vargas Coelho, sob a orientação do
        Prof. Dr. Jean Carlo Rossa Hauck, integrante do Grupo de Qualidade de Software (GQS) da UFSC.</p>
      <p>O QAV é uma plataforma de jogo sério idealizada com o objetivo de apoiar o processo de ensino e aprendizagem por
        meio de uma ferramenta interativa e gamificada de verificação de conhecimento. A proposta busca explorar a
        motivação e a competição típicas dos jogos como estratégia pedagógica. A plataforma permite que professores criem
        quizzes e os apliquem em tempo real com seus alunos, contando com integração gratuita das notas diretamente ao
        Moodle.</p>
      <p>Para começar a utilizar o QAV visite a página <NuxtLink to="/">LMS</NuxtLink>.</p>
      <p>Possui alguma sugestão ou feedback? Informe-nos pelo formulário nesse <a href="https://forms.gle/MZhoPXGWLNU4WbDP9" target="_blank">link</a>.</p>
    </main>
    <BaseFooter />
  </div>
</template>

<style lang="sass" scoped>
.page-content
  flex: 1
main
  line-height: 1.6
  p
    margin: 8px 0
    font-size: 1rem
    text-indent: 20px
.highlight
  color: rgb(var(--v-theme-secondary))
</style>
