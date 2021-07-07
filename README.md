![KompaSaude](./assets/logo.png)

Repositório com o desafio técnico da Kompa Saúde para a posição de React Native.

Repositório com as instruções do desafio: https://github.com/assinasaude/prontuario-mobile

Abaixo está listado o motivo das escolhas sobre as bibliotecas utilizadas, assim como instalar e como rodas os testes. 

## Preview do app no iOS
https://youtu.be/ZjTLFQK6XWI

[![App Preview](https://img.youtube.com/vi/ZjTLFQK6XWI/0.jpg)](https://youtu.be/ZjTLFQK6XWI)

---- 

## Como instalar o projeto

1. Clone o repositório. `git clone https://github.com/eduduardo/desafio-kompa-saude.git`
2. Rode: `yarn install` ou `npm install`
3. Para rodar o projeto no android: `react-native run-android`
4. Para rodar o projeto no iOS: `react-native run-ios`

### Como rodar manualmente no iOS
1. Depois do `yarn install`
2. Rode: `cd ios/ && pod install`
3. Abra `ios/KompaSaude.xcworkspace` no XCODE (version >= 12.4)
4. Faça o build do projeto com o target de simulador ou device físico
5. Rode no terminal `yarn start` para inicial o servidor de bundle.

### Manual run Android
1. Depois do `yarn install`
2. Rode `cd android/ && sh gradlew installDebug`
3. Rode no terminal `yarn start` para inicial o servidor de bundle.

## Como rodar os testes

O projeto possue testes unitários e de interação do usuário com as funcionalidades requisitadas.
1. Rode: `yarn test` ou `npm run test`

----

## Stack de tecnologias utilizadas

1. [react-native](https://github.com/facebook/react-native) - utilizado em sua versão mais recente.
2. [react-navigation](https://github.com/react-navigation/react-navigation) - utilizado para o roteamento, facilitando bastante na criação do modal do requisito
3. [redux](https://github.com/reduxjs/redux) e [react-redux](https://github.com/reduxjs/react-redux) - gerenciamento do estado global da aplicação.
4. [redux-thunk](https://github.com/reduxjs/redux-thunk) - utilizado para disparar as ações de forma assíncrona.
5. [redux-persist](https://github.com/rt2zz/redux-persist) - utilizado para persistir os dados de favoritos
6. [@react-native-async-storage](https://github.com/react-native-async-storage/async-storage) - utilizado pelo redux-persist para persistir os dados como AsyncStorage.
7. [axios](https://github.com/axios/axios) - utilizado para cuidar melhor dos retornos das requests json vindas da API.
8. [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) - utilizado para renderizar alguns ícones da interface

*Nota sobre os commits:*

Utilizei o conceito de [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) para organizar os commits, acredito que um repositório deve contar a história sobre o que foi modificado ;)

## Testes

1. [jest](https://github.com/facebook/jest) - utilizado para a base dos testes.
2. [@testing-library/react-native](https://github.com/callstack/react-native-testing-library) - utilizado para renderizar e manipular como usuário os components e pages do app.
3. [redux-mock-store](https://github.com/reduxjs/redux-mock-store) - utilizado para mockar o redux
4. [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter) - utilizado para mockar as requests para a API pelo axios.