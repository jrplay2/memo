# 🚀 Guia Completo de Deploy Automático - Trae IDE + GitHub + Vercel

## 📋 Resumo da Configuração Atual

### ✅ Status do Projeto
- **Framework**: HTML/CSS/JavaScript (Estático)
- **Deploy**: Vercel com integração GitHub
- **Configuração**: Automática via commits
- **Última alteração**: Correção do número 11 (Baralho → Dado)

## 🔧 Configuração no PC Atual

### 1. Arquivos de Configuração

#### 📄 `vercel.json` (Configuração Vercel)
```json
{
  "version": 2,
  "rewrites": [
    { "source": "/cod/1", "destination": "/cod/1/index.html" },
    { "source": "/cod", "destination": "/cod/index.html" }
  ],
  "headers": [
    {
      "source": "/novas_imagens/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

#### 📄 `netlify.toml` (Configuração alternativa Netlify)
```toml
[build]
  publish = "."
```

#### 📄 `.gitignore` (Arquivos ignorados)
```
# Arquivos do sistema
.DS_Store
Thumbs.db

# Arquivos de ambiente
.env
.env.local

# Diretórios de dependências
/node_modules

# Arquivos de log
*.log

# Diretórios de build
/dist
/build

# Arquivos de IDE
.idea/
.vscode/
```

## 🔄 Processo de Deploy Automático

### Como funciona atualmente:
1. **Você faz alterações no código** usando Trae IDE
2. **Salva o arquivo** (Ctrl+S)
3. **Commit automático** para GitHub
4. **Vercel detecta** a mudança
5. **Deploy automático** em 10-30 segundos
6. **Site atualizado** instantaneamente

## 💻 Configuração no Novo PC

### Passo 1: Preparação Inicial
```bash
# 1. Instalar Git
https://git-scm.com/download

# 2. Instalar Node.js (para Vercel CLI)
https://nodejs.org/

# 3. Instalar Vercel CLI (opcional, mas recomendado)
npm i -g vercel
```

### Passo 2: Clonar Repositório
```bash
# No terminal do Trae IDE
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
```

### Passo 3: Configurar Integração Vercel

#### Opção A: Via Interface Web (Recomendado)
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Importe seu repositório
5. Configure:
   - **Framework Preset**: Static
   - **Build Command**: (deixe vazio)
   - **Output Directory**: . (ponto)
   - **Install Command**: (deixe vazio)

#### Opção B: Via CLI
```bash
# No diretório do projeto
vercel

# Siga os passos:
# 1. Login com GitHub
# 2. Linkar projeto
# 3. Configurar deploy
```

### Passo 4: Configurar Deploy Automático

#### No GitHub:
1. Vá em Settings → Secrets and Variables → Actions
2. Adicione os secrets do Vercel:
   - `VERCEL_TOKEN`: Seu token do Vercel
   - `VERCEL_ORG_ID`: ID da organização
   - `VERCEL_PROJECT_ID`: ID do projeto

#### No Vercel:
1. Project Settings → Git
2. Habilitar "Automatically deploy on push"
3. Configurar branch (main/master)

## 🎯 Testando o Deploy Automático

### Teste 1: Alteração Simples
```html
<!-- Abra index.html e mude algo simples -->
<!-- Por exemplo, altere um título -->
<h1>Meu Jogo Educativo - ATUALIZADO</h1>
```

### Passos:
1. Salve o arquivo (Ctrl+S)
2. Commit: `git add . && git commit -m "Teste de deploy automático"`
3. Push: `git push origin main`
4. Verifique no Vercel (Dashboard)
5. Acesse seu site após 10-30 segundos

## 📊 Dashboard e Monitoramento

### Vercel Dashboard
- **URL**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Funções**: 
  - Ver deploys em tempo real
  - Rollback para versões anteriores
  - Analytics e performance
  - Configurações de domínio

### GitHub Actions (se configurado)
- Verifica se o deploy foi bem-sucedido
- Notificações de falha
- Histórico de alterações

## ⚠️ Troubleshooting Comum

### Problema: Deploy não atualiza
**Soluções:**
1. Verifique se o commit foi feito: `git log --oneline -5`
2. Confira branch correta: `git branch`
3. Veja status no Vercel Dashboard
4. Force redeploy no Vercel

### Problema: Arquivos não sincronizam
**Soluções:**
1. Verifique `.gitignore`
2. Confirme arquivos staged: `git status`
3. Commit force: `git add -A && git commit -m "Force update"`

### Problema: Vercel não detecta mudanças
**Soluções:**
1. Reconectar repositório no Vercel
2. Verificar webhooks no GitHub
3. Verificar permissões do Vercel no GitHub

## 🔑 Comandos Úteis

```bash
# Status do Git
git status

# Ver últimos commits
git log --oneline -10

# Push para GitHub
git push origin main

# Deploy manual (se necessário)
vercel --prod

# Ver logs do Vercel
vercel logs
```

## 📱 Notificações

### Configurar notificações:
1. **Vercel**: Settings → Notifications
2. **GitHub**: Settings → Notifications
3. **Email**: Configure para receber updates

## 🎮 Dica Extra: Teste Rápido

Para testar se tudo está funcionando:

```html
<!-- Adicione isso no index.html -->
<div id="last-update"></div>
<script>
  document.getElementById('last-update').textContent = 
    'Última atualização: ' + new Date().toLocaleString('pt-BR');
</script>
```

Isso mostrará a data/hora da última atualização, confirmando que o deploy funcionou.

---

## 🚀 Resumo Final

1. **Clone** o repositório no novo PC
2. **Configure** Vercel com mesmo projeto
3. **Conecte** GitHub e Vercel
4. **Teste** com uma pequena alteração
5. **Monitore** via dashboards

**Tempo estimado**: 15-30 minutos para configuração completa

Se encontrar problemas, verifique:
- ✅ Conexão GitHub-Vercel
- ✅ Permissões corretas
- ✅ Branch correta
- ✅ Arquivos de configuração

**Sucesso!** 🎉 Seu deploy automático está configurado!