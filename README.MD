# Job Application Tracker - Fullstackowy Projekt Rozwojowy 🚀

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)

## 📝 O Projekcie

Projekt rozwojowy stworzony w celu nauki i demonstracji umiejętności fullstack developera. Aplikacja służy do zarządzania procesem aplikowania o pracę, implementując podstawowe operacje CRUD, autoryzację oraz wizualizację danych.

### 🌟 Zaimplementowane Funkcjonalności

- System rejestracji i logowania (JWT)
- Zarządzanie ofertami pracy (CRUD)
- Filtrowanie i sortowanie ofert
- Dashboard ze statystykami
- Responsywny interfejs użytkownika

## 🛠️ Technologie

### Backend
- **Node.js & Express.js** - REST API
- **TypeScript** - type safety
- **Prisma** - ORM
- **MySQL** - baza danych
- **JWT** - autoryzacja
- **Zod** - walidacja
- **Vitest** - testy

### Frontend
- **React 18** z **Vite**
- **Redux Toolkit & RTK Query** - state management
- **React Hook Form** - obsługa formularzy
- **Tailwind CSS** & **shadcn/ui** - stylowanie
- **TypeScript**

## 💡 Zdobyte Umiejętności

1. **Backend Development**
   - Projektowanie REST API
   - Integracja z bazą danych przez ORM
   - Implementacja autentykacji
   - Walidacja danych wejściowych

2. **Frontend Development**
   - Zarządzanie stanem aplikacji
   - Komunikacja z API
   - Stylowanie komponentów
   - Formularze i walidacja

3. **Testowanie**
   - Testy jednostkowe API
   - Testy komponentów React
   - Pokrycie testami krytycznych funkcjonalności

4. **DevOps**
   - TypeScript w projekcie fullstackowym
   - Konfiguracja Biome
   - Praca z systemem kontroli wersji

## 🔧 Struktura Projektu
```
jobsterProject/
├── client/                # Frontend React
│   ├── src/
│   │   ├── api/          # API konfiguracja
│   │   ├── assets/       # Zasoby statyczne
│   │   ├── components/   # Komponenty React
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Funkcje pomocnicze
│   │   ├── pages/        # Komponenty stron
│   │   ├── routes/       # Konfiguracja routingu
│   │   ├── schema/       # Schematy walidacji
│   │   ├── store/        # Redux store
│   │   ├── test/         # Testy
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Narzędzia
│   └── package.json
│
└── server/                # Backend Express
    ├── src/
    │   ├── controllers/  # Kontrolery API
    │   ├── errors/       # Obsługa błędów
    │   ├── middleware/   # Middleware
    │   ├── routes/       # Endpointy API
    │   ├── schema/       # Schematy Prisma/Zod
    │   ├── types/        # TypeScript types
    │   └── utils/        # Funkcje pomocnicze
    ├── tests/            # Testy
    ├── prisma/           # Konfiguracja ORM
    └── package.json
```
## 🧪 Przykłady Implementacji

### Autentykacja z JWT
```typescript
const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  // Implementacja weryfikacji tokena...
};
```

### Komunikacja z API (RTK Query)
```typescript
export const jobsApiSlice = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query<JobsPayload, SearchQueryOptions>({
      query: (params) => ({
        url: "/jobs",
        params,
      }),
    }),
    // Inne endpointy...
  }),
});
```

### Instrukcja Instalacji - Job Application Tracker

#### Wymagania Systemowe
- Node.js v20.15.0+
- npm v10.8.3+
- MySQL

### 1. Pobranie Projektu
```bash
git clone <repository-url>
cd jobsterProject
```

### 2. Konfiguracja Backend (port 8000)

```bash
# Przejdź do katalogu server
cd server

# Instalacja zależności
npm install
```

#### Konfiguracja .env
Utwórz plik `.env` w katalogu `server`:
```env
PORT=8000
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=30d
DATABASE_URL="mysql://username:password@localhost:3306/jobs_api"
```

#### Inicjalizacja Bazy Danych
```bash
# Synchronizacja schematu bazy danych
npm run db

# Uruchomienie serwera developerskiego
npm run dev
```

### 3. Konfiguracja Frontend

```bash
# Przejdź do katalogu client
cd client

# Instalacja zależności
npm install

# Uruchomienie aplikacji (domyślnie port 5173)
npm run dev
```

### 4. Weryfikacja Instalacji

#### Sprawdź działanie endpointów:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`


### 5. Rozwiązywanie Problemów

#### Typowe problemy:
1. **Port 8000 zajęty**
   - Zmień port w pliku `.env`
   - Zatrzymaj inne aplikacje używające portu 8000

2. **Błąd połączenia z bazą danych**
   - Sprawdź poprawność DATABASE_URL
   - Upewnij się, że serwer MySQL jest uruchomiony
   - Sprawdź uprawnienia użytkownika bazy danych

3. **Problemy z Node.js**
   - Sprawdź wersję Node.js: `node --version`
   - Użyj nvm do przełączenia na wymaganą wersję


## 📄 Licencja

MIT License
