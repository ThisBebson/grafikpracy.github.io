# Grafik Pracy — PWA

Gotowa strona instalowalna na ekranie głównym iPhone'a (Safari) i Androida. Nie wymaga bazy danych ani PHP.

## Uruchomienie na serwerze

1. Rozpakuj ZIP.
2. Wgraj **zawartość** folderu `GrafikPracy_PWA` na hosting z HTTPS, np. do `public_html/grafik/`.
3. Otwórz `https://twojadomena.pl/grafik/` w Safari na iPhonie.
4. Naciśnij ikonę Udostępnij i wybierz „Dodaj do ekranu początkowego”. Jeśli jest dostępne, wybierz otwieranie jako aplikacja.
5. Uruchom aplikację z nowej ikony.

Możesz też przetestować stronę na komputerze, otwierając `index.html`, ale funkcje PWA/offline wymagają HTTPS lub localhost. Na komputerze testowym można uruchomić `python -m http.server 8000` w folderze projektu i otworzyć `http://localhost:8000`.

## Funkcje

- Miesięczny kalendarz z dzisiejszą datą, godzinami zmian i polskimi świętami.
- Zmiany dzienne i nocne (gdy koniec <= początek, koniec przypada następnego dnia).
- Stawki godzinowe, niepłatne przerwy, notatki, edycja i usuwanie.
- Dodawanie seryjne w zakresie dat z opcjami pomijania weekendów i świąt.
- Sumy godzin i zarobków za miesiąc; eksport miesięcznych danych do CSV.
- Działanie offline po pierwszym poprawnym załadowaniu z HTTPS.

## Ważne

Dane są zapisywane w `localStorage` **na danym urządzeniu i w danej przeglądarce**. Nie ma synchronizacji pomiędzy urządzeniami. Usunięcie danych witryny lub przeglądarki może skasować grafik — regularnie eksportuj CSV. CSV to kopia do odczytu, nie mechanizm przywracania do aplikacji. Aplikacja nie oblicza podatków ani dodatków za nadgodziny. Święta są oznaczane, ale stawki w święta nie zmieniają się automatycznie. Zmiany nocne przypisywane są w całości do daty rozpoczęcia. Dodawanie seryjne tworzy nowe wpisy i nie nadpisuje istniejących.

## Pliki

- `index.html` — interfejs
- `style.css` — wygląd i responsywność
- `app.js` — kalendarz, święta, rozliczenia, zapis
- `manifest.webmanifest` — instalacja na telefonie
- `sw.js` — cache do pracy offline
- `icon-192.png`, `icon-512.png` — ikony
