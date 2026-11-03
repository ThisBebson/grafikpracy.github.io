# Grafik Pracy PWA — wersja 2.0 (szyfrowana)

## GitHub Pages
1. Utwórz publiczne repozytorium GitHub i wgraj **zawartość** tego katalogu do głównego folderu repozytorium.
2. Settings → Pages → Build and deployment → Deploy from a branch → main → / (root) → Save.
3. Otwórz podany adres HTTPS. W Safari na iPhonie wybierz Udostępnij → Dodaj do ekranu początkowego.
4. Przy pierwszym uruchomieniu ustaw hasło co najmniej 10 znaków. Przechowuj je bezpiecznie.

## Prywatność
- GitHub Pages jest PUBLICZNY: każdy może otworzyć kod aplikacji, ale nie ma dostępu do lokalnego grafiku użytkownika.
- Grafik jest szyfrowany AES-256-GCM przy użyciu klucza pochodzącego z hasła (PBKDF2 SHA-256, 310 000 iteracji), a zapisany wyłącznie lokalnie w przeglądarce.
- Każda instalacja przeglądarki ma własny magazyn. Nie jest to sprzętowe przypisanie do jednego telefonu.
- Automatyczna blokada po 5 minutach bezczynności, a po ukryciu aplikacji po około 1 minucie (czas zależy od ograniczeń iOS).
- Eksport CSV jest NIEZASZYFROWANY. Preferuj zaszyfrowane kopie JSON.
- Utrata hasła lub danych przeglądarki bez kopii = nieodwracalna utrata grafiku.
- Na wspólnym urządzeniu inni mogą odczytać dane podczas odblokowanej sesji.
- Wersja 1: stare dane localStorage są przenoszone po utworzeniu hasła. Przed migracją wykonaj własną kopię, jeśli to możliwe.
- Strona nie chroni przed złośliwym kodem dodanym do repozytorium, rozszerzeniami przeglądarki ani przejęciem konta GitHub. Włącz 2FA na GitHub.
- To nie jest system kont użytkowników ani prawdziwe blokowanie urządzenia. Aby ukryć całą stronę, zastosuj hosting z kontrolą dostępu po stronie serwera (np. Cloudflare Access).

## Uruchamianie
Wymagane HTTPS (GitHub Pages) lub localhost. Bezpośrednie otwieranie pliku index.html może nie działać z Web Crypto i service workerem.

## Pliki
index.html, style.css, app.js, security.js, sw.js, manifest.webmanifest, icon-192.png, icon-512.png.
