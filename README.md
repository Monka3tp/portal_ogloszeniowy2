# Portal Ogłoszeniowy

## Opis projektu

Portal Ogłoszeniowy to aplikacja webowa umożliwiająca publikowanie i przeglądanie ogłoszeń. Projekt został zbudowany przy użyciu React i Firebase, oferując funkcjonalność rejestracji, logowania, dodawania ogłoszeń oraz ich obserwowania.

## Funkcjonalności

- **Rejestracja i logowanie** - system autentykacji oparty na Firebase
- **Przeglądanie ogłoszeń** - lista wszystkich dostępnych ogłoszeń
- **Szczegóły ogłoszenia** - podgląd pełnej informacji o wybranym ogłoszeniu
- **Dodawanie ogłoszeń** - możliwość utworzenia nowego ogłoszenia z opisem, zdjęciami i ceną
- **Obserwowanie ogłoszeń** - zapisywanie interesujących ogłoszeń w osobistej liście
- **Panel użytkownika** - zarządzanie obserwowanymi ogłoszeniami

## Technologie

- **React** - biblioteka JavaScript do budowania interfejsów użytkownika
- **TanStack Router** - biblioteka do obsługi routingu w React
- **Firebase** - platforma do uwierzytelniania i przechowywania danych użytkownika
- **Bootstrap** - framework CSS do szybkiego tworzenia responsywnych stron
- **Framer Motion** - biblioteka do animacji UI
- **React-Toastify** - biblioteka do wyświetlania powiadomień
- **ReCAPTCHA** - ochrona przed botami przy dodawaniu ogłoszeń
- **JSON Server** - symulacja API do przechowywania ogłoszeń w formacie JSON
- **i inne** - różne biblioteki pomocnicze do zarządzania stanem, stylami i animacjami

## Struktura projektu

- **App.jsx** - główny komponent aplikacji, konfiguracja routingu
- **Header.jsx** - komponent nawigacyjny
- **Ogloszenia.jsx** - komponent wyświetlający listę ogłoszeń
- **DetOgloszenie.jsx** - komponent wyświetlający szczegóły ogłoszenia
- **DodajOgloszenie.jsx** - formularz dodawania nowego ogłoszenia
- **Account.jsx** - panel zarządzania kontem użytkownika
- **Login.jsx/Register.jsx** - komponenty do uwierzytelniania
- **UserContext.jsx** - kontekst przechowujący informacje o zalogowanym użytkowniku
- **firebaseUtils.js** - funkcje pomocnicze do komunikacji z Firebase
- **oraz inne** - komponenty pomocnicze i style

## Jak uruchomić projekt

1. Zainstaluj zależności:
   ```
   npm install
   ```

2. Uruchom API JSON Server:
   ```
   npx json-server --watch db.json
   ```

3. Uruchom serwer ReCaptcha:
   ```
   node server.js
   ```
   
4. Uruchom aplikację React:
   ```
    npm run dev
    ```

5. Aplikacja będzie dostępna pod adresem `http://localhost:5173`.

## Autorzy

Projekt został stworzony przez Wojciecha Gontarka, Monikę Nowicką oraz Krystiana Hordyńskiego jako aplikacja prezentacyjna.