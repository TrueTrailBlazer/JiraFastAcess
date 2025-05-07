Jira Fast Access
================

Extensão para navegador que permite abrir múltiplos chamados do Jira de uma só vez, com interface amigável, mensagens motivacionais e suporte a diferentes formatos de tickets.

Descrição
---------

Essa extensão foi criada para facilitar a vida de quem lida com muitos chamados no Jira. Você cola os códigos, clica em um botão, e pronto: cada chamado é aberto em uma nova aba.

Códigos suportados:
- TE-xxxx
- FSA-xxxxxx
- VLV-xxxx
- EEM-xxxx
- FS-xxxx
- 1-xxxxxx (pesquisa por resumo)

Como usar
---------

1. Instale a extensão no seu navegador (Chrome ou compatível).
2. Clique no ícone da extensão.
3. Cole os códigos dos chamados no campo de entrada (um por linha).
4. Clique no botão “Abrir Chamados”.
5. Os chamados válidos serão abertos automaticamente em novas abas.
6. Se houver erros, eles aparecerão com detalhes na tela.

Configurações
-------------

- A URL base do Jira está definida como:

    https://delfia.atlassian.net/

  Se quiser mudar, edite a variável `baseUrl` no arquivo `popup.js`.

- Para alterar ou adicionar novos padrões de código, edite os `startsWith()` dentro da função `openUrls()` no mesmo arquivo (`popup.js`).

  Exemplo:

  if (
    normalizedCode.startsWith("TE-") || 
    normalizedCode.startsWith("FSA-") ||
    normalizedCode.startsWith("VLV-") ||
    normalizedCode.startsWith("EEM-") ||
    normalizedCode.startsWith("FS-")
  )

Recursos extras
---------------

- Modo claro/escuro com botão de alternância.
- Mensagens aleatórias de sucesso para deixar o processo mais leve.
- Validação de código e exibição de mensagens de erro detalhadas.

Requisitos
----------

- Navegador com suporte a extensões (Chrome, Edge etc.)
- Permissão para abrir múltiplas abas
- Acesso ao Jira da sua organização

-----
Autor
Luís Franco
