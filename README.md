# Grafik Pracy PWA — wersja 2.1

Naprawiono dodawanie seryjne: formularz używa dat od/do, a nie nieistniejącego pola date. Poprawiono obliczanie zakresu przez zmianę czasu letniego/zimowego. Dodano odstępy safe-area dla Dynamic Island i dolnego wskaźnika gestów iPhone 15 Pro oraz wygodniejsze formularze mobilne. Zmieniono cache service workera na network-first, aby aktualizacje na GitHub Pages docierały do zainstalowanej aplikacji, gdy jest internet.

## Aktualizacja GitHub Pages
Wgraj i zastąp wszystkie pliki w głównym katalogu repozytorium. Nie zmieniaj domeny ani ścieżki aplikacji. Po publikacji uruchom aplikację z dostępem do internetu i odśwież ją; w razie potrzeby zamknij i uruchom ponownie aplikację z ekranu głównego.

## Test
Otwórz Dodawanie seryjne → Ustaw zakres, wybierz od/do, godziny i stawkę, naciśnij Dodaj zmiany i zatwierdź. Sprawdź miesiąc i sumę godzin.

## Prywatność
Zachowano ten sam format szyfrowanych danych localStorage (`grafik-secure-v2`), hasło i kopie. Nie usuwaj danych Safari/PWA. Przed aktualizacją wykonaj zaszyfrowaną kopię zapasową. GitHub Pages pozostaje publiczny — kod strony jest dostępny wszystkim, a zapisany lokalnie grafik nie jest wysyłany na GitHub.

## Uruchomienie
Wymagany HTTPS (GitHub Pages) lub localhost. Na iPhonie Safari → Udostępnij → Dodaj do ekranu początkowego.


## v2.2
- Kalendarz miesięczny i tygodniowy; strzałki przesuwają odpowiednio miesiąc lub tydzień.
- W kafelkach dni widać godziny każdej zmiany i skróconą notatkę. Pełna notatka jest widoczna po wybraniu dnia.
- Lista „Zmiany w miesiącu” domyślnie zwinięta, można ją rozwinąć.
- Podsumowanie roczne zarobków i godzin dla roku widocznego w kalendarzu.
- Format zaszyfrowanych danych i hasło pozostają bez zmian.
- Przed aktualizacją wykonaj zaszyfrowaną kopię zapasową; podmień pliki na GitHub Pages, nie usuwaj danych Safari.
