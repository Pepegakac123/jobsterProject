# Job Application Tracker

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Job Application Tracker to projekt fullstackowy, który powstał jako narzędzie do nauki nowoczesnego stosu technologicznego w web developmencie. Backend jest już w pełni funkcjonalny, napisany w TypeScript z Express.js i Prisma ORM. Frontend jest obecnie w fazie rozwoju - buduję go w React z Vite. Aplikacja pozwala śledzić swoje aplikacje o pracę, zarządzać ich statusami i analizować podstawowe statystyki.

## 🔥 Główne Funkcjonalności

### Backend
- **System Autentykacji**:
  - Rejestracja i logowanie użytkowników
  - JWT (JSON Web Tokens) dla bezpiecznej autoryzacji
  - Middleware dla ochrony endpointów
  - Specjalne zabezpieczenia dla konta testowego
  - Rate limiting dla endpointów auth (15 min window)

- **Zarządzanie Ofertami Pracy**:
  - Pełne operacje CRUD
  - Zaawansowane filtrowanie i wyszukiwanie ofert
  - Paginacja wyników
  - Sortowanie ofert (najnowsze, najstarsze, A-Z, Z-A)
  - Statusy aplikacji (PENDING, INTERVIEW, REJECTED, OFFER, ACCEPTED)

- **Statystyki i Analityka**:
  - Analiza aplikacji według statusów
  - Miesięczne podsumowania aplikacji
  - Trendy w czasie rzeczywistym

- **Bezpieczeństwo**:
  - Walidacja danych przez Zod
  - Hashowanie haseł (bcrypt)
  - Ochrona przed XSS
  - Helmet dla dodatkowych zabezpieczeń HTTP
  - Rate limiting dla krytycznych endpointów

### Frontend (aktualnie w developmencie 🚧)
- React + TypeScript jako główne technologie
- Vite zamiast Create React App - uczę się nowoczesnych narzędzi bundlowania
- Tailwind CSS - pierwsze podejście do utility-first CSS
- shadcn/ui - eksperymentuję z gotowymi komponentami UI
- Planuję dodać testy z Vitest + Testing Library
- W planach responsywny design

**Note:** Frontend jest obecnie w fazie intensywnego rozwoju. Skupiam się na implementacji kolejnych funkcjonalności i nauce best practices w React.

## 🛠️ Czego się uczę w tym projekcie?

### Backend - moja pierwsza poważniejsza aplikacja serwerowa
- **TypeScript + Node.js** - Podejście do bardziej zaawansowanych tematów związanych  z TS po stronie serwera
- **Express.js** - podstawy REST API i middleware
- **Prisma** - nowoczesne podejście do baz danych (po wcześniejszych przygodach z czystym SQL i Postgressem)
- **MySQL** - solidna baza relacyjna
- **JWT i bcrypt** - podstawy bezpiecznej autentykacji
- **Zod** - walidacja z TypeScriptem (sporo lepsza niż Joi!)
- **Testowanie z Vitest** - pierwszy raz piszę sensowne testy integracyjne
- **Security basics** - helmet, xss-clean, rate-limiting

### Frontend - work in progress! 
- **React 18** - uczę się najnowszych features
- **TypeScript** - Utrwalanie dobrych nawyków z TS
- **Tailwind + shadcn/ui** - próba umocnienia swojej wiedzy praktycznej na temat tych bibliotek
- **Testowanie** - planuję dodać testy komponentów przy użyciu Vitesta

## 🚀 Jak uruchomić

### Wymagania wstępne
- Node.js (v20.15.0 lub wyższa)
- NPM (v10.8.3 lub wyższa)
- PostgreSQL (v14 lub wyższa)

### Uruchomienie backendu (server)

1. **Przejdź do katalogu server**
   ```bash
   cd server
   ```

2. **Instalacja zależności**
   ```bash
   npm install
   ```

3. **Konfiguracja środowiska**
   Stwórz plik `.env` w katalogu server:
   ```env
   DATABASE_URL="mysql://user:password@localhost:5432/jobtracker"
   JWT_SECRET="twoj-sekretny-klucz"
   JWT_LIFETIME="30d"
   PORT=8000
   ```

4. **Inicjalizacja bazy danych**
   ```bash
   npm run db
   ```

5. **Uruchomienie serwera**
   - Development:
     ```bash
     npm run dev
     ```
   - Production:
     ```bash
     npm run build
     npm start
     ```

### API Endpoints

#### Auth Routes
```
POST   /api/v1/auth/register  - Rejestracja użytkownika
POST   /api/v1/auth/login     - Logowanie użytkownika
PATCH  /api/v1/auth/update    - Aktualizacja danych użytkownika
```

#### Jobs Routes
```
GET    /api/v1/jobs          - Pobieranie wszystkich ofert (z filtrowaniem)
POST   /api/v1/jobs          - Tworzenie nowej oferty
GET    /api/v1/jobs/:id      - Pobieranie pojedynczej oferty
PATCH  /api/v1/jobs/:id      - Aktualizacja oferty
DELETE /api/v1/jobs/:id      - Usunięcie oferty
```

#### Stats Routes
```
GET    /api/v1/stats         - Pobieranie statystyk aplikacji
```

## 🧪 Testy

Projekt zawiera kompleksowe testy integracyjne dla backendu:

### Przykładowe testy filtrowania ofert:
```typescript
describe("Filtering Jobs with correct data", () => {
  it("should return all jobs", async () => {
    const response = await request(app)
      .get("/api/v1/jobs")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(StatusCodes.OK);
  });

  it("should return only jobs with specific status", async () => {
    const response = await request(app)
      .get("/api/v1/jobs?status=PENDING")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.jobs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ status: "PENDING" })
      ])
    );
  });
});
```

## 📝 Struktura projektu

```
project/
├── server/                 
│   ├── src/
│   │   ├── controllers/    # Logika biznesowa
│   │   ├── routes/         # Definicje endpointów
│   │   ├── middleware/     # Middleware (auth, error handling)
│   │   ├── errors/         # Własne klasy błędów
│   │   ├── schema/         # Schematy walidacji (Zod)
│   │   ├── types/         # TypeScript interfaces i types
│   │   └── utils/         # Funkcje pomocnicze
│   ├── tests/             # Testy integracyjne
│   └── package.json
│
├── client/                # Frontend (w rozwoju)
    └── [struktura w rozwoju]
```

## 📝 Licencja

Ten projekt jest udostępniony na licencji MIT - szczegóły w pliku [LICENSE](LICENSE)