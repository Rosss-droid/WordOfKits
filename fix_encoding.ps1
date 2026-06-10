$utf8 = [System.Text.Encoding]::UTF8
$content = [System.IO.File]::ReadAllText("app.js", $utf8)
$fixed = $content

# === EMOJI 4-byte (F0 9F...) ===
$fixed = $fixed.Replace("ðŸ›'", "🛒")
$fixed = $fixed.Replace("ðŸ"¦", "📦")
$fixed = $fixed.Replace("ðŸ'•", "👕")
$fixed = $fixed.Replace("ðŸ'š", "👚")
$fixed = $fixed.Replace("ðŸ†", "🏆")
$fixed = $fixed.Replace("ðŸ"§", "🔧")
$fixed = $fixed.Replace("ðŸ˜¢", "😢")
$fixed = $fixed.Replace("ðŸ˜€", "😀")
$fixed = $fixed.Replace("ðŸ'", "👍")
$fixed = $fixed.Replace("ðŸŒ", "🌍")
$fixed = $fixed.Replace("ðŸ"", "🔍")
$fixed = $fixed.Replace("ðŸŽ", "🎁")
$fixed = $fixed.Replace("ðŸŽ½", "🎽")
$fixed = $fixed.Replace("ðŸ'¬", "💬")
$fixed = $fixed.Replace("ðŸ'°", "💰")
$fixed = $fixed.Replace("ðŸŒŸ", "🌟")
$fixed = $fixed.Replace("ðŸ'«", "💫")
$fixed = $fixed.Replace("ðŸ"", "📧")
$fixed = $fixed.Replace("ðŸ'¾", "💾")
$fixed = $fixed.Replace("ðŸ"–", "📖")
$fixed = $fixed.Replace("ðŸ"", "📝")
$fixed = $fixed.Replace("ðŸ—'ï¸", "🗑️")
$fixed = $fixed.Replace("ðŸ—'", "🗑")

# === EMOJI 3-byte ===
$fixed = $fixed.Replace("âš½", "⚽")
$fixed = $fixed.Replace("âš¡", "⚡")
$fixed = $fixed.Replace("âœ…", "✅")
$fixed = $fixed.Replace("âœ•", "✕")
$fixed = $fixed.Replace("âœ"", "✔")
$fixed = $fixed.Replace("âœï¸", "✏️")
$fixed = $fixed.Replace("â†'", "→")
$fixed = $fixed.Replace("â†"", "←")
$fixed = $fixed.Replace("â†"", "↓")
$fixed = $fixed.Replace("â†'", "↑")
$fixed = $fixed.Replace("â™¥", "♥")
$fixed = $fixed.Replace("â˜…", "★")
$fixed = $fixed.Replace("â˜†", "☆")

# === TRATTINI E PUNTEGGIATURA ===
$fixed = $fixed.Replace("â€"", "—")
$fixed = $fixed.Replace("â€™", "'")
$fixed = $fixed.Replace("â€˜", "'")
$fixed = $fixed.Replace("â€œ", [char]0x201C + "")
$fixed = $fixed.Replace("â€", [char]0x201D + "")
$fixed = $fixed.Replace("â€¦", "…")
$fixed = $fixed.Replace("â€¢", "•")

# === SIMBOLO EURO ===
$fixed = $fixed.Replace("â‚¬", "€")

# === LETTERE ACCENTATE ITALIANE ===
$fixed = $fixed.Replace("Ã ", "à")
$fixed = $fixed.Replace("Ã¡", "á")
$fixed = $fixed.Replace("Ã¨", "è")
$fixed = $fixed.Replace("Ã©", "é")
$fixed = $fixed.Replace("Ã¬", "ì")
$fixed = $fixed.Replace("Ã­", "í")
$fixed = $fixed.Replace("Ã²", "ò")
$fixed = $fixed.Replace("Ã³", "ó")
$fixed = $fixed.Replace("Ã¹", "ù")
$fixed = $fixed.Replace("Ãº", "ú")
$fixed = $fixed.Replace("Ã»", "û")
$fixed = $fixed.Replace("Ã‰", "É")
$fixed = $fixed.Replace("Ãˆ", "È")
$fixed = $fixed.Replace("ÃŒ", "Ì")

# === CARATTERI SPECIALI ===
$fixed = $fixed.Replace("Â·", "·")
$fixed = $fixed.Replace("Â°", "°")
$fixed = $fixed.Replace("Â«", "«")
$fixed = $fixed.Replace("Â»", "»")
$fixed = $fixed.Replace("Â½", "½")

# Salva il file corretto (UTF-8 con BOM)
[System.IO.File]::WriteAllText("app.js.fixed", $fixed, $utf8)

# Verifica
$fixedLines = $fixed -split "`n"
Write-Host "=== VERIFICA DOPO FIX ==="
Write-Host "Riga 2   (titolo):    $($fixedLines[1])"
Write-Host "Riga 688 (euro):      $($fixedLines[687])"
Write-Host "Riga 792 (fabric):    $($fixedLines[791])"
Write-Host "Riga 816 (showToast): $($fixedLines[815])"
Write-Host "Riga 976 (vuoto):     $($fixedLines[975])"
Write-Host "Riga 1037 (Qta):      $($fixedLines[1036])"
Write-Host "Riga 1043 (invio):    $($fixedLines[1042])"
Write-Host "Riga 1105 (errore):   $($fixedLines[1104])"
Write-Host ""
Write-Host "File salvato come app.js.fixed"
