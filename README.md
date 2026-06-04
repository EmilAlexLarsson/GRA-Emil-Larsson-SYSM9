# Carnordic Technology

Carnordic Technology är en e-handel för begagnade bildelar.
Användaren kan bläddra bland produkter, söka och filtrera produkter, se produktdetaljer, lägga produkter i varukorgen, spara favoriter, registrera/logga in och skapa en order.

Projektet består av en frontend byggd med React och en backend byggd med Node.js, Express och MongoDB.

---

## Tekniker

### Frontend

- React
- React Router
- Context API
- CSS
- LocalStorage
- Vite

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- CORS

---

## Starta projektet

Projektet består av två delar:

```txt
carnordic-client   = frontend
carnordic-server   = backend
```

Frontend och backend behöver startas i två separata terminaler.

---

## Starta backend

Gå först till backend-mappen:

```bash
cd carnordic-server
```

Installera dependencies:

```bash
npm install
```

Skapa en `.env`-fil i `carnordic-server` om den inte redan finns.

Exempel på `.env`:

```env
PORT=3000
CONNECTION_STRING=din_mongodb_connection_string
ACCESS_TOKEN_SECRET=din_jwt_secret
```

Fyll databasen:

```bash
npm run seed
```

Starta backend:

```bash
npm run dev
```

Backend körs normalt på:

```txt
http://localhost:3000
```

---

## Starta frontend

Öppna en ny terminal och gå till frontend-mappen:

```bash
cd carnordic-client
```

Installera dependencies:

```bash
npm install
```

Starta frontend:

```bash
npm run dev
```

Frontend körs normalt på:

```txt
http://localhost:5173
```

---

## Standardanvändare / testkonto

Du kan logga in med följande testkonto:

```txt
Användarnamn: user
Lösenord: password
```

Om testkontot inte finns i databasen kan du skapa en ny användare via registreringssidan i applikationen.

---

## Funktionalitet

- Visa alla produkter
- Söka produkter
- Filtrera produkter efter kategori
- Visa detaljer för en produkt
- Lägga produkter i varukorgen
- Öka och minska antal i varukorgen
- Ta bort produkter från varukorgen
- Varukorgen sparas i LocalStorage
- Registrera användare
- Logga in och logga ut med JWT
- Spara favoriter
- Gästfavoriter sparas i LocalStorage
- Inloggade användares favoriter sparas i databasen
- Skapa order
- Visa orderbekräftelse

---

## API-routes

### Products

```txt
GET /api/products
GET /api/products/:id
```

### Users

```txt
POST /api/users/register
POST /api/users/login
GET /api/users/current
```

### Favorites

```txt
GET /api/favorites
POST /api/favorites
DELETE /api/favorites/:productId
```

### Orders

```txt
POST /api/orders
GET /api/orders/:id
```

---

## Projektstruktur

### `carnordic-client`

Innehåller frontend-delen av projektet.

- `pages/` innehåller hela sidor, till exempel produktsida, varukorg och checkout.
- `components/` innehåller återanvändbara komponenter, till exempel `ProductCard`, `CartItem` och `OrderSummary`.
- `contexts/` innehåller global state för auth, varukorg och favoriter.
- `styles/` innehåller CSS uppdelat efter pages och components.
- `api.jsx` innehåller frontendens API-anrop till backend.

### `carnordic-server`

Innehåller backend-delen av projektet.

- `server.js` startar Express-servern och kopplar routes.
- `routes/` bestämmer vilka endpoints som finns.
- `controllers/` innehåller logiken för varje route.
- `models/` innehåller Mongoose-modeller för MongoDB.
- `middleware/` innehåller token-validering.
- `config/` innehåller databasanslutningen.

---

## Skapad av

Emil Larsson
