# StudentHelper (StudyQuest)

Aplikacja PWA łącząca funkcje interaktywnego notatnika, automatycznego generatora quizów AI oraz systemu grywalizacji RPG.

---

## O Projekcie

StudyQuest to nowoczesna aplikacja PWA stworzona z myślą o uczniach, studentach oraz nauczycielach. Projekt stanowi rozwinięcie klasycznego notatnika o mechanizmy zwiększające efektywność nauki: generowanie quizów z notatek za pomocą sztucznej inteligencji (Gemini AI) oraz grywalizację w stylu gier RPG.

* Autor: Maciej Mowel (nr albumu: 42935, studia niestacjonarne)
* Promotor: dr inż. Marcin Kacprowicz
* Uczelnia: Uniwersytet VIZJA, Kierunek: Informatyka

---

## Kluczowe Funkcje

* Notatnik z organizacją według przedmiotów – przejrzysty interfejs do tworzenia, edycji i kategoryzowania notatek.
* AI Quiz Generator (Gemini AI) – bezpośrednie przekształcanie notatek w interaktywne quizy wyboru (ABCD) za pomocą jednego kliknięcia.
* System Progresji RPG – zdobywanie punktów doświadczenia (XP) i kolejnych poziomów za aktywność naukową (tworzenie notatek, rozwiązywanie quizów).
* Kalendarz & Plan Zajęć – organizacja harmonogramu lekcji/wykładów, ustawianie czasów trwania zajęć oraz przerw.
* Profil Użytkownika & Statystyki – śledzenie poziomów, średniej skuteczności w quizach, historii wyników oraz opcja eksportu/importu danych (JSON).
* Wsparcie PWA & Dark Mode – możliwość instalacji na urządzeniach mobilnych (Android/iOS) i desktopowych, praca offline oraz dynamiczny motyw ciemny.

---

## Stos Technologiczny

| Warstwa | Technologia / Narzędzie | Opis / Uzasadnienie |
| :--- | :--- | :--- |
| Język programowania | JavaScript (ES6+) | Główny język aplikacji. |
| Frontend / PWA | React (Context API, Service Worker) | Architektura komponentowa, zarządzanie stanem RPG za pomocą Context API, manifest.json. |
| Backend | Node.js + Express | Serwerowa warstwa pośrednia API. |
| Baza Danych | Supabase | Elastyczne przechowywanie danych (notatki, profil RPG, JSON). |
| Integracja AI | Google Gemini AI API | Wydajne przetwarzanie języka naturalnego i strukturyzowanie quizów. |
| Narzędzia & IDE | Visual Studio Code, Android Studio | Tworzenie kodu oraz emulacja/debugowanie urządzeń mobilnych. |
| Hosting | Render | Utrzymanie aplikacji w chmurze. |

---

## Architektura i Wdrożenie

Aplikacja została zaprojektowana w oparciu o architekturę trójwarstwową (3-tier architecture):
1. Warstwa Prezentacji (Klient PWA): Komponenty UI napisane w React (Mobile First) z obsługą offline dzięki Service Workerom.
2. Warstwa Logiki (Serwer Node.js/Express): Pośredniczy w komunikacji, przetwarza prompty do Gemini AI oraz dba o bezpieczny przepływ danych.
3. Warstwa Danych (Supabase): Chmurowa baza przechowująca dane w formacie JSON.

---

## Przegląd Ekranów Aplikacji

1. Ekran Logowania / Rejestracji: Autoryzacja użytkowników w systemie StudyQuest.
2. Ekran Notatek & Generator Quizów: Tworzenie notatek z przypisanym przedmiotem oraz szybka konwersja do Quizu AI.
3. Plan Zajęć & Kalendarz: Zarządzanie czasem, dniami tygodnia, czasem trwania zajęć i przerwami.
4. Mój Profil: Panel gracza z paskiem postępu XP, wskaźnikami skuteczności, historią rozwiązanych quizów oraz opcjami eksportu danych.

---

## Plan Rozwoju (Roadmap)

- [ ] Wielomodalne AI (Multimodal): Skanowanie notatek ze zdjęć, PDF-ów i tablic.
- [ ] Rozbudowa RPG: Drzewka umiejętności, customizacja awatara, ekwipunek oraz zadania codzienne (Questy).
- [ ] Moduł Społecznościowy: Rankingi znajomych, udostępnianie notatek i wspólne rozwiązywanie testów.
- [ ] Alternatywne formaty sprawdzianów: Fiszki (flashcards), pytania otwarte, prawda/fałsz.
- [ ] Powiadomienia Push & Integracje: Przypomnienia o kolokwiach i synchronizacja z Google Calendar / Outlook.

---

© 2026 Maciej Mowel. Uniwersytet VIZJA Warszawa.
