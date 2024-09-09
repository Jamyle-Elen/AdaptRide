# 🚍🌍 Transporte Acessível - Aplicativo de Transporte Inclusivo

## 📝 Sobre

O **Transporte Acessível** é um projeto dedicado a fornecer soluções de transporte para pessoas com deficiência e idosos, com o objetivo de tornar a mobilidade mais inclusiva e segura. Desenvolvido como parte do seu projeto de desenvolvimento de software, a aplicação combina recursos avançados de geolocalização e comunicação em tempo real para garantir uma experiência de transporte mais acessível e confortável.

## 🚧 Problematização

A mobilidade é um desafio significativo para pessoas com deficiência e idosos, que frequentemente enfrentam barreiras físicas e logísticas. O acesso limitado ao transporte adaptado e a falta de informações em tempo real podem comprometer a segurança e a qualidade de vida desses indivíduos. O objetivo é enfrentar esses desafios por meio de uma solução que proporcione informações precisas e suporte para facilitar a locomoção e garantir a segurança durante as viagens.

## 💡 Solução Tecnológica: Transporte Acessível

O **Transporte Acessível** oferece uma plataforma inovadora que aborda as questões de mobilidade e segurança através das seguintes funcionalidades:

- **Solicitação de Corridas**: Permite aos usuários solicitar corridas com opções de veículos adaptados para necessidades específicas.
  
- **Aceitação e Cancelamento de Corridas**: Motoristas podem aceitar ou cancelar solicitações de corridas, melhorando a eficiência e a flexibilidade no atendimento.

- **Geolocalização e Navegação**: Utiliza geolocalização em tempo real para fornecer informações precisas sobre rotas e locais de interesse, garantindo um planejamento de viagem mais eficaz.

- **Alertas de Segurança**: Notifica os usuários sobre áreas de alto risco, com informações sobre assaltos e outras situações perigosas, promovendo a segurança durante a viagem.


## 📜 Algumas Informações Importantes

- **O que é uma API?**
  
  API (Interface de Programação de Aplicações) é um conjunto de definições e protocolos que permitem que diferentes softwares interajam entre si. Em nosso projeto, a API é fundamental para a comunicação entre o aplicativo e os serviços de backend.

- **O que é uma API REST?**
  
  APIs REST (Representational State Transfer) são um tipo de API que usa princípios de arquitetura para a troca de informações entre sistemas. Elas seguem um conjunto de regras e convenções para comunicação.

- **Métodos HTTP**
  - `GET`: Recuperar dados do servidor.
  - `POST`: Enviar dados para o servidor para criar um novo recurso.
  - `PATCH`: Atualizar parcialmente um recurso existente.
  - `PUT`: Atualizar completamente um recurso existente.
  - `DELETE`: Remover um recurso do servidor.

- **Status de Resposta HTTP**
  - 1xx - Informativo
  - 2xx - Sucesso
  - 3xx - Redirecionamento
  - 4xx - Erro do Cliente
  - 5xx - Erro do Servidor

- **Padrão MVC**
  - **Model (Modelo)**: Representa a lógica de negócios e os dados da aplicação.
  - **View (Visão)**: Representa a interface do usuário e a forma como os dados são apresentados.
  - **Controller (Controlador)**: Atua como intermediário entre o Modelo e a Visão, decidindo como a aplicação deve responder a ações.

- **Módulos ES6**
  
  Módulos ES6 ajudam a organizar e estruturar o código de forma eficiente, dividindo-o em partes menores e reutilizáveis. Cada módulo é responsável por uma parte específica do código.

- **SQLite**
  
  SQLite é um sistema de gerenciamento de banco de dados relacional leve e autônomo, ideal para aplicações que necessitam de um banco de dados simples e eficiente.

- **Object-Relational Mapping (ORM)**
  
  ORM é uma técnica que permite interagir com bancos de dados relacionais usando uma abordagem orientada a objetos, facilitando a manipulação dos dados sem precisar escrever consultas SQL diretamente.

- **Middleware**
  
  Middleware atua como intermediário entre diferentes sistemas ou camadas de uma aplicação, facilitando a comunicação e integração entre componentes.

## 🛠 Funcionalidades das Rotas

### Rotas sobre Autenticação - `passenger/driver.routes.js`

| Método | Rota                   | Função                                 |
| ------ | ---------------------- | -------------------------------------- |
| POST   | /register/passengers   | Registrar passageiro                   |
| POST   | /login/passenger       | Login para a passageiro já registrado  |
| POST   | /register/drivers      | Registrar motorista                    |
| POST   | /login/driver          | Login para a motorista já registrado   |

### Rotas sobre Solicitação de Corrida - `rides.routes.js`

| Método | Rota                      | Função                          |
| ------ | ---------------- | ---------------------------------------- |
| POST   | /request-rides   | Criar solicitação de corrida             |
| POST   | /accept-ride     | Aceitar corrida                          |
| POST   | /decline-ride    | Recusar corrida                          |
| POST   | /infoRide        | Criar solicitação de coleta              |
| GET    | /rides           | Buscar todas as solicitações de coleta   |

### Rotas sobre Passageiros - `passenger.routes.js`

| Método | Rota                     | Função                       |
| ------ | ------------------------ | ---------------------------- |
| GET    | /profile/passenger/:id   | Buscar dados do passageiro   |

### Rotas sobre Motoristas - `driver.routes.js`

| Método | Rota                  | Função                      |
| ------ | --------------------- | --------------------------- |
| GET    | /profile/driver/:id   | Buscar dados do motorista   |

## 📥 Instalação e Configuração do Ambiente

1. **Instale o Node.js**
   
   Certifique-se de que o Node.js está instalado no seu sistema. [Baixe e instale o Node.js](https://nodejs.org/en/download/prebuilt-installer).

2. **Instale as Dependências**

   Navegue até a raiz do diretório do projeto e execute o seguinte comando para instalar as dependências:

   ```bash
   npm install
   ```
   ```bash
   node watch server.js
   ```
   ```bash
   node watch sever2.js
   ```
   Utilizamos 2 servidores, um está rodando o projeto `PORT: 3000` e o outro está na parte da solicitação das corridas `PORT: 3001`
