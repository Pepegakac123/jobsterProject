# Job Application Tracker API

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)

Job Application Tracker to REST API zbudowane w TypeScript, wykorzystujące Express.js i Prisma ORM. Aplikacja umożliwia użytkownikom śledzenie procesu aplikacji o pracę, zarządzanie statusami rekrutacji i przechowywanie istotnych informacji o potencjalnych pracodawcach.

## 🔥 Główne Funkcjonalności

- Autentykacja użytkowników (JWT)
- CRUD dla ofert pracy
- Zarządzanie statusami rekrutacji
- Walidacja danych (Zod)
- Testy integracyjne (Vitest)
- TypeScript dla bezpieczeństwa typów
- Obsługa błędów middleware
- Rate limiting i zabezpieczenia

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Język**: TypeScript
- **ORM**: Prisma
- **Autentykacja**: JWT
- **Walidacja**: Zod
- **Testy**: Vitest
- **Dokumentacja API**: Swagger UI

## 🚀 Jak uruchomić

1. **Klonowanie repozytorium**
   ```bash
   git clone https://github.com/twoje-repo/job-tracker.git
   cd job-tracker
   ```

2. **Instalacja zależności**
   ```bash
   npm install
   ```

3. **Konfiguracja środowiska**
   
   Stwórz plik `.env` w głównym katalogu:
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

5. **Uruchomienie aplikacji**
   - Development:
     ```bash
     npm run dev
     ```
   - Production:
     ```bash
     npm run build
     npm start
     ```

6. **Uruchomienie testów**
   ```bash
   npm test
   ```

## 📚 API Reference

### Autentykacja

#### Rejestracja użytkownika
```http
POST /api/v1/auth/register
```
| Parameter  | Type     | Description                |
| :--------  | :------- | :------------------------- |
| `name`     | `string` | **Wymagane**. Min. 3 znaki |
| `email`    | `string` | **Wymagane**. Unikalny email |
| `password` | `string` | **Wymagane**. Min. 6 znaków |

#### Logowanie
```http
POST /api/v1/auth/login
```
| Parameter  | Type     | Description                |
| :--------  | :------- | :------------------------- |
| `email`    | `string` | **Wymagane**. Email użytkownika |
| `password` | `string` | **Wymagane**. Hasło użytkownika |

### Zarządzanie ofertami pracy

#### Pobierz wszystkie oferty
```http
GET /api/v1/jobs
```

#### Pobierz pojedynczą ofertę
```http
GET /api/v1/jobs/:id
```

#### Utwórz nową ofertę
```http
POST /api/v1/jobs
```
| Parameter  | Type     | Description                |
| :--------  | :------- | :------------------------- |
| `company`  | `string` | **Wymagane**. Nazwa firmy |
| `position` | `string` | **Wymagane**. Stanowisko |
| `status`   | `enum`   | PENDING/INTERVIEW/REJECTED/OFFER/ACCEPTED |

#### Aktualizuj ofertę
```http
PATCH /api/v1/jobs/:id
```

#### Usuń ofertę
```http
DELETE /api/v1/jobs/:id
```

## 🔒 Zabezpieczenia

- Walidacja danych wejściowych (Zod)
- Haszowanie haseł (bcrypt)
- JWT dla autentykacji
- Rate limiting
- XSS Protection
- CORS
- Helmet dla nagłówków HTTP

## 🧪 Testy

Projekt zawiera kompleksowe testy integracyjne napisane w Vitest:

```typescript
describe("Jobs API", () => {
  describe("Tworzenie oferty pracy (POST /api/v1/jobs)", () => {
    it("tworzy ofertę pracy z domyślnym statusem", async () => {
      const response = await createTestJob(token, TEST_JOBS.valid.basic);
      expect(response.status).toBe(201);
      expect(response.body.job).toMatchObject({
        company: TEST_JOBS.valid.basic.company,
        position: TEST_JOBS.valid.basic.position,
        status: "PENDING",
      });
    });
  });
});
```

## 🌟 Przykłady użycia

### Rejestracja użytkownika
```typescript
const response = await fetch('http://localhost:3000/api/v1/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: "Jan Kowalski",
    email: "jan@example.com",
    password: "Test123!@#"
  }),
});
```

### Dodawanie nowej oferty
```typescript
const response = await fetch('http://localhost:3000/api/v1/jobs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    company: "Tech Corp",
    position: "Senior Developer",
    status: "INTERVIEW"
  }),
});
```

## 📝 Struktura projektu

```
src/
├── controllers/         # Kontrolery aplikacji
│   ├── auth.ts         # Logika autentykacji
│   └── jobs.ts         # Zarządzanie ofertami pracy
├── errors/             # Obsługa błędów
│   ├── bad-request.ts
│   ├── custom-api.ts
│   ├── index.ts
│   ├── not-found.ts
│   └── unauthenticated.ts
├── middleware/         # Middleware
│   ├── authentication.ts
│   ├── error-handler.ts
│   └── not-found.ts
├── routes/            # Definicje tras
│   ├── auth.ts
│   └── jobs.ts
├── schema/           # Schematy walidacji
│   └── User.ts
├── types/           # Definicje TypeScript
│   └── index.ts
├── utils/          # Narzędzia pomocnicze
│   └── index.ts
└── app.ts         # Główny plik aplikacji
```

### Rozwiązywanie problemów

- Jeśli występuje błąd połączenia z bazą danych:
  - Sprawdź czy PostgreSQL jest uruchomiony
  - Zweryfikuj dane dostępowe w pliku `.env`
  - Upewnij się, że baza danych została utworzona

- Jeśli występuje błąd podczas instalacji zależności:
  - Wyczyść cache npm: `npm cache clean --force`
  - Usuń folder `node_modules` i `package-lock.json`
  - Uruchom ponownie `npm install`

## 📄 Licencja

Ten projekt jest udostępniony na licencji MIT - szczegóły w pliku [LICENSE](LICENSE)

## 🙋‍♂️ Autor

Twoje Imię - [@twoj_twitter](https://twitter.com/twoj_twitter)

Project Link: [https://github.com/twoje-repo/job-tracker](https://github.com/twoje-repo/job-tracker)