# Servidor HTTP simples em PowerShell (suporta arquivos binários)
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8080/')
$listener.Start()

Write-Host "Servidor iniciado em http://localhost:8080/"
Write-Host "Pressione Ctrl+C para parar o servidor"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $url = $request.Url.LocalPath
        if ($url -eq '/') { $url = '/index.html' }

        $filePath = Join-Path $PWD $url.TrimStart('/')

        if (Test-Path $filePath) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()

            switch ($ext) {
                '.html' { $response.ContentType = 'text/html; charset=utf-8' }
                '.css'  { $response.ContentType = 'text/css; charset=utf-8' }
                '.js'   { $response.ContentType = 'application/javascript; charset=utf-8' }
                '.png'  { $response.ContentType = 'image/png' }
                '.jpg'  { $response.ContentType = 'image/jpeg' }
                '.jpeg' { $response.ContentType = 'image/jpeg' }
                '.gif'  { $response.ContentType = 'image/gif' }
                '.svg'  { $response.ContentType = 'image/svg+xml; charset=utf-8' }
                default { $response.ContentType = 'application/octet-stream' }
            }

            # Ler e escrever como binário para imagens/arquivos não-texto
            $isBinary = $ext -in @('.png', '.jpg', '.jpeg', '.gif')
            if ($isBinary) {
                $buffer = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            } else {
                $content = Get-Content $filePath -Raw -Encoding UTF8
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
        } else {
            $response.StatusCode = 404
            $errorContent = "404 - Arquivo não encontrado: $url"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($errorContent)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }

        $response.Close()
    }
} finally {
    $listener.Stop()
}