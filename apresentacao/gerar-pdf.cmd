@echo off
rem Gera um PDF a partir de um HTML com o Chrome ou o Edge.
rem Uso: gerar-pdf.cmd arquivo.html   (ou arraste o .html para este arquivo)
setlocal
if "%~1"=="" (
  echo Uso: gerar-pdf.cmd arquivo.html
  pause
  exit /b 1
)
set "NAV=C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist "%NAV%" set "NAV=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not exist "%NAV%" (
  echo Chrome ou Edge nao encontrado.
  pause
  exit /b 1
)
set "ENTRADA=%~f1"
set "SAIDA=%~dpn1.pdf"
"%NAV%" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="%SAIDA%" "file:///%ENTRADA:\=/%"
echo PDF gerado: %SAIDA%
