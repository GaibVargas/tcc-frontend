<script lang="ts" setup>
definePageMeta({
  ssr: true,
  layout: 'instructor',
})

const apiUrl = useNuxtApp().$config.public.apiBaseUrl
</script>

<template>
  <div class="tutorial-page pa-sm-2 pa-md-8">
    <h2>Como usar?</h2>
    <p>
      A plataforma de
      <span class="highlight">Quiz ao vivo</span>
      foi idealizada para funcionar junto de um <span class="highlight">LMS</span> (<span class="italic">Learning
        Management Tool</span>) e atualmente
      é estritamente necessário o
      uso de um LMS para que os quizzes sejam realizados.
      Uma vez que uma atividade tenha sido criada no seu LMS utilizando o Quiz ao vivo como ferramenta externa, basta
      clicar
      na atividade que você será redirecionado para a plataforma já registrado com suas informações e estará pronto para
      criar e aplicar quizzes. Abaixo há um tutorial passo a passo sobre como adicionar um quiz no Moodle.
    </p>

    <h2>Moodle</h2>
    <p>
      Para adicionar um quiz como uma atividade do Moodle, selecione uma atividade do tipo Ferramenta externa.
    </p>
    <div class="img external_tool">
      <img src="/images/tutorial/001_ferramenta_externa.png"
        alt="Destaque para o recurso de adicionar ferramenta externa como uma atividade no Moodle" />
    </div>

    <p>Se for sua primeira vez adicionando um quiz como atividade, adicione uma ferramenta pré-configurada:</p>
    <div class="img add_tool">
      <img src="/images/tutorial/002_add_tool.png"
        alt="Destaque para a opção de adicionar uma ferramenta externa pré-configurada" />
    </div>

    <p>Na página de configuração informe os seguintes campos:</p>

    <ul>
      <li>Nome da ferramenta: Quiz ao vivo (recomendado, mas opcional)
        <BaseCopyToClipboard text="Quiz ao vivo" />
      </li>
      <li>URL da ferramenta: {{ apiUrl }}
        <BaseCopyToClipboard :text="apiUrl" />
      </li>
      <li>Versão do LTI: LTI 1.3</li>
      <li>Tipo de chave pública: Keyset URL</li>
      <li>Public keyset: {{ `${apiUrl}/lti/jwks` }}
        <BaseCopyToClipboard :text="`${apiUrl}/lti/jwks`" />
      </li>
      <li>Iniciar URL de login: {{ `${apiUrl}/lti/login` }}
        <BaseCopyToClipboard :text="`${apiUrl}/lti/login`" />
      </li>
      <li>URI(s) de redirecionamento: {{ `${apiUrl}/lti/redirect` }}
        <BaseCopyToClipboard :text="`${apiUrl}/lti/redirect`" />
      </li>
      <li>Container de inicialização padrão: Nova janela</li>
    </ul>
    <p>Na aba de serviços, permita a integração de notas configurando o campo:</p>
    <ul>
      <li>Serviços IMS LTI de Tarefa e Nota: Usar este serviço apenas para sincronização de notas.</li>
    </ul>
    <p>Após todas as configurações sua página deve estar semelhante a imagem abaixo:</p>
    <div class="img result">
      <img src="/images/tutorial/003_result.jpg" alt="Página de configuração de ferramenta externa do Moodle" />
    </div>
    <p>Depois de salvar as mudanças você pode continuar configurando a atividade no Moodle selecionando a ferramenta que
      acabamos de criar no campo Ferramenta pré-configurada.</p>
    <div class="img final">
      <img src="/images/tutorial/004_final.png"
        alt="Página de configuração de atividade do Moodle selecionando ferramenta externa configurada" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.tutorial-page
  line-height: 1.6
  p
    margin: 1rem 0
    font-size: 1rem
  .highlight
    font-weight: bold
  .italic
    font-style: italic
  ul
    margin: 1rem 0 2rem 1.5rem
    padding-left: 1rem
    li
      margin-bottom: 0.5rem
      list-style-type: disc
  .img
    margin: 1.5rem 0
    text-align: center
    img
      border: 1px solid #ccc
      border-radius: 4px
      max-width: 100%
      height: auto
      object-fit: contain
    &.external_tool
      img
        height: 350px
    &.add_tool
      img
        height: 250px
    &.result
      img
        height: 900px
    &.final
      img
        height: 250px
</style>
