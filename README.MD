# Job Application Tracker

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Job Application Tracker to fullstackowa aplikacja zbudowana w TypeScript, wykorzystująca React z Vite po stronie frontendu oraz Express.js i Prisma ORM po stronie backendu. Aplikacja umożliwia użytkownikom śledzenie procesu aplikacji o pracę, zarządzanie statusami rekrutacji i przechowywanie istotnych informacji o potencjalnych pracodawcach.

## 🔥 Główne Funkcjonalności

### Backend
- Autentykacja użytkowników (JWT)
- CRUD dla ofert pracy
- Zarządzanie statusami rekrutacji
- Walidacja danych (Zod)
- Testy integracyjne (Vitest)
- TypeScript dla bezpieczeństwa typów
- Obsługa błędów middleware
- Rate limiting i zabezpieczenia

### Frontend
- React + TypeScript
- Vite jako bundler
- Tailwind CSS dla stylowania
- shadcn/ui dla komponentów UI
- Testy komponentów (Vitest + Testing Library)
- Responsywny design

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Autentykacja**: JWT
- **Walidacja**: Zod
- **Testy**: Vitest

### Frontend
- **Framework**: React
- **Bundler**: Vite
- **Stylowanie**: Tailwind CSS
- **Komponenty UI**: shadcn/ui
- **Testy**: Vitest + React Testing Library
- **Zarządzanie Stanem**: [planowany]

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
   DATABASE_URL="postgresql://user:password@localhost:5432/jobtracker"
   JWT_SECRET="twoj-sekretny-klucz"
   JWT_LIFETIME="1d"
   PORT=3000
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

### Uruchomienie frontendu (client)

1. **Przejdź do katalogu client**
   ```bash
   cd client
   ```

2. **Instalacja zależności**
   ```bash
   npm install
   ```

3. **Uruchomienie aplikacji**
   ```bash
   npm run dev
   ```

### Uruchomienie testów

#### Backend
```bash
cd server
npm test
```

#### Frontend
```bash
cd client
npm test
```

## 📚 API Reference

[Tu zostaje ta sama sekcja API Reference z poprzedniej wersji...]

## 🔒 Zabezpieczenia

[Tu zostaje ta sama sekcja Zabezpieczenia...]

## 🧪 Testy

Projekt zawiera testy zarówno po stronie backendu jak i frontendu:

### Backend Tests
```typescript
describe("Jobs API", () => {
  describe("Tworzenie oferty pracy (POST /api/v1/jobs)", () => {
    it("tworzy ofertę pracy z domyślnym statusem", async () => {
      const response = await createTestJob(token, TEST_JOBS.valid.basic);
      expect(response.status).toBe(201);
    });
  });
});
```

### Frontend Tests
```typescript
describe('LoginForm', () => {
  it('renders login form', () => {
    render(<LoginForm />)
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })
})
```

## 📝 Struktura projektu

```
project/
├── client/                # Frontend React aplikacji
│   ├── src/
│   │   ├── components/    # Komponenty React
│   │   ├── pages/        # Komponenty stron
│   │   ├── hooks/        # Custom hooks
│   │   ├── api/          # Funkcje API
│   │   ├── types/        # Typy TypeScript
│   │   └── utils/        # Narzędzia pomocnicze
│   └── package.json
│
├── server/                # Backend Express aplikacji
│   ├── src/
│   │   ├── controllers/  # Kontrolery
│   │   ├── routes/      # Trasy API
│   │   ├── middleware/  # Middleware
│   │   ├── errors/     # Obsługa błędów
│   │   ├── schema/    # Schematy walidacji
│   │   ├── types/    # Typy TypeScript
│   │   └── utils/   # Narzędzia pomocnicze
│   └── package.json
│

```

<!-- ### Rozwiązywanie problemów

[Tu zostaje ta sama sekcja Rozwiązywanie problemów z dodaniem:]

- Problemy z frontendem:
  - Sprawdź czy proxy jest poprawnie skonfigurowane w vite.config.ts
  - Upewnij się, że backend jest uruchomiony na porcie 3000
  - W przypadku problemów z typami, wykonaj `npm run build` w obu projektach -->

## 📄 Licencja

Ten projekt jest udostępniony na licencji MIT - szczegóły w pliku [LICENSE](LICENSE)

## 🙋‍♂️ Autor

Twoje Imię - [@twoj_twitter](https://twitter.com/twoj_twitter)

Project Link: [https://github.com/twoje-repo/job-tracker](https://github.com/twoje-repo/job-tracker)