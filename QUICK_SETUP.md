# 🔧 Configuração Rápida - Novo PC

## 📋 Checklist de 5 Minutos

### ✅ 1. Verificar Pré-requisitos
```bash
# Verificar se Git está instalado
git --version

# Verificar se Node.js está instalado
node --version

# Se não estiverem instalados, instale:
# Git: https://git-scm.com/download
# Node.js: https://nodejs.org/
```

### ✅ 2. Clonar Repositório
```bash
# Substituir pelo seu repositório
git clone https://github.com/SEU_USUARIO/nome-do-repositorio.git
cd nome-do-repositorio
```

### ✅ 3. Configurar Vercel
```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Fazer login (use mesma conta do outro PC)
vercel login

# Linkar projeto existente
vercel
```

### ✅ 4. Configuração Automática
```bash
# Verificar se arquivos de config existem
ls -la vercel.json
ls -la .gitignore

# Se existirem, o deploy é automático!
```

### ✅ 5. Testar Deploy
```bash
# Fazer pequena alteração de teste
echo "<!-- Deploy test: $(date) -->" >> index.html

# Commit e push
git add .
git commit -m "Teste de deploy automático"
git push origin main
```

## 🎯 Configuração Visual (Interface Web)

### No Vercel Dashboard:
1. Acesse: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Login com GitHub
3. Clique: "New Project"
4. Importe seu repositório
5. Configure:
   - Framework: **Static**
   - Root Directory: **.** (ponto)
   - Build Command: **(vazio)**
   - Output Directory: **.** (ponto)

### No GitHub:
1. Vá em: Settings → Integrations
2. Procure: Vercel
3. Configure: Acesso ao repositório

## ⚡ Comandos Rápidos

```bash
# Status rápido
git status && vercel status

# Deploy manual (se automático falhar)
vercel --prod

# Ver logs
vercel logs

# Rollback (voltar versão)
vercel rollback
```

## 📱 URLs Importantes

- **Vercel Dashboard**: vercel.com/dashboard
- **GitHub**: github.com/SEU_USUARIO/nome-do-repositorio
- **Seu Site**: [vercel-url] (será mostrada após deploy)

## 🚨 Se Falhar...

### Reset Rápido:
```bash
# 1. Limpar cache
rm -rf .vercel

# 2. Reconfigurar
vercel

# 3. Force deploy
vercel --force
```

### Verificar Problemas:
```bash
# Ver logs de erro
vercel logs --follow

# Verificar config
vercel inspect
```

## ✅ Confirmação de Sucesso

Após configurar, você verá:
1. **Email do Vercel**: "Deploy realizado com sucesso"
2. **Dashboard Vercel**: Status verde
3. **Seu site**: Alterações visíveis em 10-30 segundos

**Tempo total estimado**: 5-10 minutos

---

💡 **Dica**: Salve este arquivo para referência futura!