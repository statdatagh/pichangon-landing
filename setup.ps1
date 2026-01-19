# setup.ps1 - Script de instalacion completa para pichangon-landing
Write-Host "Instalando dependencias de PICHANGON LANDING..." -ForegroundColor Green

# Verificar Node.js
Write-Host "`nVerificando Node.js..." -ForegroundColor Yellow
node --version
npm --version

# Instalar dependencias
Write-Host "`nInstalando dependencias de npm..." -ForegroundColor Yellow
Write-Host "(Esto puede tomar varios minutos por Radix UI y shadcn/ui...)" -ForegroundColor Cyan
npm install

# Verificar archivos de configuracion
Write-Host "`nVerificando archivos de configuracion..." -ForegroundColor Yellow

if (Test-Path "vite.config.js") {
    Write-Host "vite.config.js encontrado" -ForegroundColor Green
} else {
    Write-Host "vite.config.js NO encontrado" -ForegroundColor Yellow
}

if (Test-Path "tailwind.config.js") {
    Write-Host "tailwind.config.js encontrado" -ForegroundColor Green
} else {
    Write-Host "tailwind.config.js NO encontrado" -ForegroundColor Yellow
}

if (Test-Path ".env") {
    Write-Host "Archivo .env encontrado" -ForegroundColor Green
} else {
    Write-Host "Archivo .env NO encontrado (opcional para landing)" -ForegroundColor Yellow
}

Write-Host "`nInstalacion completada!" -ForegroundColor Green
Write-Host "`nProximos pasos:" -ForegroundColor Cyan
Write-Host "1. Ejecuta 'npm run dev' para iniciar el servidor de desarrollo"
Write-Host "2. La landing estara disponible en http://localhost:5173"
Write-Host "3. Para build de produccion: 'npm run build'"
Write-Host "4. Para preview del build: 'npm run preview'"
