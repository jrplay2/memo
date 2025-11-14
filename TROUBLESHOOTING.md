# 🔧 Troubleshooting - Deploy Automático Trae + GitHub + Vercel

## 🚨 Problemas Comuns e Soluções

### ❌ 1. Deploy Não Atualiza

**Sintomas:**
- Alterações no código não aparecem no site
- Vercel não detecta mudanças

**Diagnóstico:**
```bash
# Verificar últimos commits
git log --oneline -5

# Verificar status do Git
git status

# Verificar branch atual
git branch --show-current
```

**Soluções:**
```bash
# 1. Verificar se está na branch correta
git checkout main

# 2. Forçar commit de todas as mudanças
git add -A
git commit -m "Force update: $(date)"
git push origin main --force

# 3. Verificar no Vercel Dashboard
# Acesse: vercel.com/dashboard → Seu Projeto → Deployments
```

---

### ❌ 2. Vercel Não Conecta ao GitHub

**Sintomas:**
- "Repository not found"
- "Permission denied"
- Webhooks não funcionam

**Soluções:**
```bash
# 1. Reautenticar Vercel
vercel logout
vercel login

# 2. Reconectar repositório
# Vercel Dashboard → Project Settings → Git → Disconnect → Reconnect

# 3. Verificar webhooks no GitHub
# GitHub → Settings → Webhooks → Verificar se Vercel está listado
```

---

### ❌ 3. Arquivos Não São Enviados

**Sintomas:**
- Alguns arquivos não aparecem no deploy
- Imagens faltando
- CSS não carrega

**Diagnóstico:**
```bash
# Verificar o que está sendo ignorado
cat .gitignore

# Verificar arquivos staged
git ls-files

# Verificar arquivos modificados
git diff --name-only
```

**Soluções:**
```bash
# 1. Adicionar arquivos específicos
git add -f nome-do-arquivo.ext

# 2. Verificar .gitignore
echo "# Seu projeto" >> .gitignore
echo "!novas_imagens/*" >> .gitignore

# 3. Commit com todos os arquivos
git add -A
git commit -m "Add missing files"
git push origin main
```

---

### ❌ 4. Build Falha no Vercel

**Sintomas:**
- "Build failed"
- "Command failed with exit code 1"
- Erros de configuração

**Soluções:**
```bash
# 1. Verificar vercel.json
cat vercel.json

# 2. Configuração correta para site estático
{
  "version": 2,
  "rewrites": [
    { "source": "/(.*)", "destination": "/$1" }
  ]
}

# 3. Limpar cache do Vercel
rm -rf .vercel
vercel --force
```

---

### ❌ 5. Deploy Demora Muito

**Sintomas:**
- Deploy pendente por mais de 5 minutos
- Timeouts frequentes

**Soluções:**
```bash
# 1. Verificar tamanho dos arquivos
du -sh *

# 2. Otimizar imagens
# Use: tinypng.com ou imagemin

# 3. Adicionar cache headers no vercel.json
{
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

---

## 🔍 Comandos de Diagnóstico

### Git Diagnóstico
```bash
# Histórico completo
git log --graph --oneline --all

# Verificar remote
git remote -v

# Verificar config
git config --list
```

### Vercel Diagnóstico
```bash
# Status do projeto
vercel status

# Logs detalhados
vercel logs --follow

# Informações do projeto
vercel inspect
```

### Sistema Diagnóstico
```bash
# Versões
node --version
git --version
vercel --version

# Conectividade
ping vercel.com
ping github.com
```

---

## 🛠️ Reset Completo (Último Recurso)

### Passo 1: Limpar Tudo
```bash
# 1. Remover configurações locais
rm -rf .git
rm -rf .vercel
rm -rf node_modules

# 2. Reconfigurar Git
git init
git remote add origin https://github.com/SEU_USUARIO/seu-repositorio.git

# 3. Reconfigurar Vercel
vercel
```

### Passo 2: Reconectar Serviços
1. **GitHub**: Crie novo repositório
2. **Vercel**: Delete projeto antigo → Crie novo
3. **Link**: Conecte novo repo ao novo projeto

---

## 📞 Suporte Adicional

### Recursos Úteis:
- **Vercel Docs**: vercel.com/docs
- **GitHub Help**: docs.github.com
- **Vercel Status**: vercel-status.com
- **GitHub Status**: githubstatus.com

### Comandos de Emergência:
```bash
# Deploy manual forçado
vercel --prod --force

# Rollback imediato
vercel rollback

# Ver logs em tempo real
vercel logs --tail
```

---

## ✅ Checklist Final de Verificação

Antes de pedir ajuda:
- [ ] Git está atualizado
- [ ] Vercel CLI está atualizado
- [ ] Commit foi feito
- [ ] Push foi realizado
- [ ] Branch está correta
- [ ] Vercel Dashboard mostra o deploy
- [ ] Logs foram verificados
- [ ] .gitignore não está bloqueando arquivos
- [ ] vercel.json está correto
- [ ] Conexão GitHub-Vercel está ativa

**Se ainda falhar após este checklist, poste:**
1. Mensagem de erro completa
2. Comandos que executou
3. Screenshots do dashboard
4. Logs relevantes