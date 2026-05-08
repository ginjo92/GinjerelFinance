$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$bundledNode = "C:\Users\jluis\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$node = if (Test-Path $bundledNode) { $bundledNode } else { "node" }

if (-not $env:OPENAI_API_KEY) {
  $secureKey = Read-Host "OpenAI API key for AI chat (press Enter for local insight mode)" -AsSecureString
  if ($secureKey.Length -gt 0) {
    $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureKey)
    try {
      $env:OPENAI_API_KEY = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
    } finally {
      [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
    }
  }
}

Write-Host "Starting GinjerelFinance at http://localhost:8787"
Write-Host "Close this window or press Ctrl+C to stop the server."
Set-Location $root
& $node server.js