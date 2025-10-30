# ☕ ONG S.O.S. CAFÉ — Salvando Programadores do Sono Profundo

![Logo da S.O.S Café](img/logo_sem_fundo.png)

> **Versão:** 1.2  
> Projeto acadêmico desenvolvido com humor e propósito: garantir o direito fundamental do programador — **a cafeína!**
> Para acessar o site: https://hannateles.github.io/ONG-SOS-CAFE/index.html
---

## 🧩 Sobre o Projeto

O **S.O.S. Café** é uma ONG fictícia criada como trabalho universitário, com o objetivo de arrecadar fundos para salvar programadores que estão há mais de 8 horas sem café.  
O site foi desenvolvido com **HTML5, CSS3 e JavaScript puro**, com foco em acessibilidade, responsividade e uma boa dose de humor para devs.

---

## 🚀 Funcionalidades Principais

### 🖼️ Carrosséis Inteligentes
- **Carrossel principal com efeito *fade*** no banner inicial, com:
  - Troca automática a cada 5 segundos.  
  - Navegação manual por setas e bolinhas indicadoras.
- **Carrossel de galeria e parceiros**, com:
  - Suporte para múltiplas instâncias na mesma página.  
  - Navegação independente (cada carrossel tem sua lógica).  
  - Pausa automática ao passar o mouse.  
  - Auto-slide suave e contínuo.

---

### 📦 Formulários Dinâmicos e Validação Avançada

#### 🧍‍♂️ Formulário de Voluntariado
- Máscaras automáticas de **CPF**, **telefone** e **CEP** enquanto o usuário digita.  
- Validação oficial de CPF (com cálculo dos dígitos verificadores).  
- Verificação de idade mínima (18 anos) e máxima (100 anos).  
- Busca automática de endereço via **API ViaCEP** ao digitar o CEP.  
- Mensagens de sucesso com **SweetAlert2** e animações de exibição.

#### 💬 Formulário de Contato
- Validação de:
  - Nome completo  
  - E-mail válido  
  - Telefone com DDD  
  - Seleção de assunto  
  - Mensagem mínima (10 caracteres)  
- Feedback visual com **alertas interativos do SweetAlert2**.  
- Reseta automaticamente após envio.

---

### 💸 Doações via PIX
- Botão de cópia rápida da chave PIX com **`navigator.clipboard`**, exibindo:
  - Ícone de sucesso ✅  
  - Texto temporário “Copiado!”  
- Reativa automaticamente após 1,5 segundos.

---

### 🌆 Lightbox Interativo
- Clique em qualquer imagem da galeria para vê-la ampliada.  
- Fechamento com botão ❌ ou clicando fora da imagem.  
- Transição suave e visual limpo.

---

### ⚙️ Recursos Técnicos
- **Eventos globais com `addEventListener`** para garantir funcionamento em toda a SPA.  
- **Delegação de eventos** otimizada, evitando repetição de código.  
- Código modular e comentado para fácil manutenção.  
- Responsividade planejada para desktops, tablets e smartphones.

---

## 🛠️ Tecnologias Utilizadas
| Tecnologia | Função |
|-------------|--------|
| **HTML5** | Estrutura semântica e acessível |
| **CSS3** | Layout, animações e responsividade |
| **JavaScript (ES6)** | Lógica, interatividade e validação |
| **SweetAlert2** | Feedback visual com alertas personalizados |
| **ViaCEP API** | Busca automática de endereço por CEP |

---

## 🧪 Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/hannateles/ONG-SOS-CAFE.git

  
