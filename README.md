**AvantSoft - Aplicativo React Native**

Este é um aplicativo React Native para gerenciamento de clientes, vendas e dashboard, com suporte a múltiplos idiomas (i18n), navegação entre telas e autenticação simulada (mock).

_**Funcionalidades principais**_

• Tela de login com validação e dados pré-preenchidos
• Navegação entre telas (Dashboard, Usuários, Vendas)
• Contexto para gerenciamento global dos clientes
• Dashboard com gráficos (PieChart e BarChart) para visualizar vendas
• Tela de usuários com filtro e modais para adicionar clientes
• Internacionalização (Português e Inglês) com troca dinâmica de idioma
• Logout que reseta a navegação para tela de login

_**Tecnologias**_

• React Native
• React Navigation (Stack Navigator)
• React Native Chart Kit (PieChart, BarChart)
• React-i18next para internacionalização
• Context API para gerenciamento de estado global
• Expo Vector Icons
• @react-native-community/datetimepicker para seleção de datas

_**Estrutura de pastas**_

• /src/components - Componentes reutilizáveis (Navbar, ModalAddUser, etc)
• /src/contexts - Contextos React (ClientContext)
• /src/screens - Telas do app (LoginScreen, DashboardScreen, UsersScreen, SalesScreen, MainApp)
• /src/styles - Estilos com Styled Components ou StyleSheet
• /src/utils - Funções utilitárias (ex: formatação de data)
• /src/i18n - Configuração e arquivos de tradução
• /src/types - Tipagens TypeScript

_**Como rodar**_

• Clone o repositório
git clone https://github.com/seu-usuario/avantsoft.git
cd avantsoft

• Instale as dependências
npm install
# ou
yarn install

• Rode o projeto
npx expo go
Abra o app no simulador/emulador ou dispositivo físico (Expo Go)

_**Traduções**_
O app suporta Português e Inglês, com troca dinâmica pelo botão na Navbar.

**_Login_**
Para teste, use as credenciais mockadas:
Email: user@example.com
Senha: 123456

**_Observações_**
• A autenticação é simulada localmente, sem backend real.
• O contexto de clientes está populado com dados mockados.

A navegação e logout são gerenciados via React Navigation.
