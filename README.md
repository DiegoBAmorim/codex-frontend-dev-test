📌 Codex Dev Test

📖 Descrição

Este projeto foi desenvolvido para Teste Front-End Codex. A aplicação utiliza React para a construção da interface, garantindo uma experiência responsiva e moderna.

🚀 Tecnologias Utilizadas

React: Biblioteca principal para desenvolvimento da interface.

Yarn: Gerenciador de pacotes para instalação e gestão de dependências.

Tailwind CSS: Framework CSS utilitário para estilização rápida e responsiva.

Ant Design: Biblioteca de componentes prontos para otimização do desenvolvimento.

ArcGIS API for JavaScript: Utilizado para renderização e manipulação de mapas interativos.

📂 Estrutura do Projeto

```bash
/src
├── components/       # Componentes reutilizáveis
│   ├── MapView.tsx         # Componente principal do mapa
│   ├── MapView.test.tsx    # Testes do componente MapView
│   ├── Drawer.tsx          # Componente de menu lateral
│   ├── Drawer.test.tsx     # Testes do componente Drawer
│   ├── Input.tsx           # Componente de entrada de dados
│   ├── Input.test.tsx      # Testes do componente Input
│   ├── Header.tsx          # Componente de cabeçalho
│   ├── Header.test.tsx     # Testes do componente Header
│
├── hooks/            # Hooks personalizados
│   ├── useDrawer.ts        # Hook para controle do menu lateral
│   ├── useSearch.ts        # Hook para busca de localizações
│   ├── useFeatureLayer.ts  # Hook para controle das camadas selecionadas
│
├── pages/            # Páginas da aplicação
│   ├── Home.tsx           # Tela inicial
│
├── styles/           # Arquivos de estilo (Tailwind configurado)
│
├── tests/            # Testes unitários e de integração
│
├── App.tsx           # Componente raiz da aplicação
├── index.tsx         # Ponto de entrada do React

🎯 Funcionalidades Implementadas

Exibição de Mapa Interativo usando a API do ArcGIS.

Camadas de Feições carregadas dinamicamente.

Busca Inteligente com useSearch, permitindo filtragem de localizações.

Menu Lateral controlado pelo hook useDrawer.

Uso de Componentes do Ant Design para formulários, botões e modais.

Responsividade e estilização via Tailwind CSS.

🛠️ Como Rodar o Projeto

Clone o repositório:

git clone https://github.com/seu-usuario/seu-repositorio.git

Entre na pasta do projeto:

cd nome-do-projeto

Instale as dependências:

yarn install

Inicie o servidor de desenvolvimento:

yarn dev

Acesse no navegador: http://localhost:3000

✅ Testes

Os testes foram implementados usando Jest e Testing Library. Para rodar os testes, utilize:

yarn test

📌 Considerações Finais

O projeto foi estruturado para facilitar manutenção e expansão. Caso haja dúvidas ou sugestões, fique à vontade para contribuir! 🚀
