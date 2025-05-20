## CHALLENGE ODONTROPREV

# SinisterBuster

## ARTHUR FENILI  - RM 552752

## ENZO ANTUNES OLIVEIRA - RM 553185

## VINICIO RAPHAEL SANTANA - RM 553813

---

## Solução do Grupo

A Odontoprev busca reduzir a sinistralidade no setor odontológico — casos de uso excessivo ou indevido de serviços, como consultas desnecessárias e fraudes. Nossa solução, **SinisterBuster**, utiliza análise preditiva e cadastro de sinistros, permitindo:

- 📊 Monitorar custos e uso dos serviços odontológicos;
- 🔍 Detectar padrões de comportamento que levam a sinistros elevados;
- 🚨 Gerar alertas preventivos para intervir e reduzir custos;
- 📈 Melhorar a eficiência operacional e experiência dos pacientes.

---

## O que é o SinisterBuster?

SinisterBuster é um app mobile em **React Native + Expo** para gerenciar sinistros. Funcionalidades principais:

- 💾 **Autenticação** (Cadastro/Login);
- 📋 **CRUD de Sinistros** (médico, CRM, clínica) com listagem, detalhamento, edição e exclusão;
- 👤 **Perfil do Usuário** com exibição de dados e logout;
- ⚙️ **Configurações** (notificações, som, modo escuro, autoplay);
- 🔀 **Navegação** intuitiva via Stack e Bottom Tab.


## Como Rodar o Projeto

### 📋 Requisitos

- Node.js ≥16
- Expo CLI
- Emulador Android/iOS ou dispositivo físico
- (Opcional) Java 17 + Maven para backend

### 🔧 Instalação


# Clone o repositório
git clone https://github.com/viniciors/Sprint4-mobile.git
cd SinisterBuster

# Instale dependências
yarn install
# ou npm install


### ▶️ Executando o App

# Inicie o Expo
expo start -c


- **Android Emulador:** use `10.0.2.2` como host da API;
- **iOS Simulator:** `localhost` funciona;
- **Dispositivo Físico:** escaneie o QR Code com Expo Go.


## Estrutura do Projeto


                    challenge/
                    ├── assets/                # Imagens e ícones
                    ├── src/
                    │   ├── screens/
                    │   │   ├── HomeScreen.js
                    │   │   ├── LoginScreen.js
                    │   │   ├── SignUpScreen.js
                    │   │   ├── ForgotPasswordScreen.js
                    │   │   ├── ProfileScreen.js
                    │   │   ├── SettingsScreen.js
                    │   │   ├── SinistrosScreen.js
                    │   │   ├── SinistroFormScreen.js
                    │   │   └── SinistroDetailScreen.js
                    │   ├── navigation/
                    │   │   ├── StackNavigator.js
                    │   │   └── BottomTabNavigator.js
                    │   ├── services/
                    │   │   ├── api.js
                    │   │   └── firebaseConfig.js
                    │   └── styles/
                    │       ├── homeStyles.js
                    │       └── loginStyles.js
                    ├── App.js
                    └── package.json
