<script lang="ts" setup>
definePageMeta({
  ssr: true,
  layout: 'instructor',
})

const apiUrl = useNuxtApp().$config.public.apiBaseUrl
</script>

<template>
  <div class="tutorial-page pa-sm-2 pa-md-8">
    <h1>Como usar?</h1>
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
    <h1 class="mt-8">Moodle</h1>
    <h3>1. Adicionando atividade</h3>
    <p>
      Para adicionar um quiz como uma atividade do Moodle, selecione uma atividade do tipo Ferramenta externa.
    </p>
    <div class="img external_tool">
      <img src="/images/tutorial/001_ferramenta_externa.png"
        alt="Destaque para o recurso de adicionar ferramenta externa como uma atividade no Moodle" />
    </div>
    <h3>2. Adicionando ferramenta externa</h3>
    <p>Se for sua primeira vez adicionando um quiz como atividade, adicione uma ferramenta pré-configurada:</p>
    <div class="img add_tool">
      <img src="/images/tutorial/002_add_tool.png"
        alt="Destaque para a opção de adicionar uma ferramenta externa pré-configurada" />
    </div>
    <h3>3. Configurando atividade externa</h3>
    <h4>3.1 Configurações básicas</h4>
    <p>Na página de configuração informe os seguintes campos:</p>
    <ol>
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
    </ol>
    <h4>3.2 Configurando acesso as integrações de nota</h4>
    <p>Na aba de serviços, permita a integração de notas configurando o campo:</p>
    <ul>
      <li>Serviços IMS LTI de Tarefa e Nota: Usar este serviço apenas para sincronização de notas.</li>
    </ul>
    <h4>3.3 Resultado das configurações</h4>
    <p>Após todas as configurações sua página deve estar semelhante a imagem abaixo:</p>
    <div class="img result">
      <img src="/images/tutorial/003_result.jpg" alt="Página de configuração de ferramenta externa do Moodle" />
    </div>
    <h3>4. Resultado final</h3>
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
  h3, h4
    margin-top: 24px
  p
    margin: 8px 0
    font-size: 1rem
  .highlight
    font-weight: bold
  .italic
    font-style: italic
  ul, ol
    margin: 8px 0 8px 1.5rem
    padding-left: 1rem
    li
      margin-bottom: 0.5rem
  .img
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
