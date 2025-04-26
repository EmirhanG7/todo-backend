# Todo App - Backend

Bu proje, Node.js ve Express.js kullanarak geliştirilmiş bir Todo API sunucusudur.  
JWT ile kimlik doğrulama ve PostgreSQL veritabanı desteği içerir.

---

## Kullanılan Teknolojiler

- Node.js
- Express.js
- PostgreSQL
- Drizzle ORM
- bcrypt
- jsonwebtoken
- cors

---

## Kurulum

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. `.env` dosyası oluşturun:

```env
PORT=3001
DATABASE_URL=postgresql://kullanici:parola@host:port/veritabani
JWT_SECRET=super_gizli_jwt
```

3. Veritabanı tablolarını oluşturun:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

4. Uygulamayı başlatın:

```bash
npm run dev
```
veya

```bash
npm start
```

---

## API Endpointleri

| Method | URL                     | Açıklama                           |
|--------|--------------------------|------------------------------------|
| POST   | `/api/auth/register`      | Yeni kullanıcı kaydı oluşturur    |
| POST   | `/api/auth/login`         | Kullanıcı girişi ve token döner   |
| GET    | `/api/auth/me`            | Kullanıcı bilgisini döner         |
| GET    | `/api/todos`              | Kullanıcıya ait todo listesini döner |
| POST   | `/api/todos`              | Yeni todo ekler                   |
| PATCH  | `/api/todos/:id`          | Todo günceller (başlık/durum)     |
| DELETE | `/api/todos/:id`          | Todo siler                        |

> **Not:** `/api/todos` işlemleri için `Authorization: Bearer <token>` header'ı zorunludur.

---

## Notlar

- CORS yapılandırması `localhost:5173` ve Vercel'deki frontend için açık.
- Veritabanı bağlantısında SSL gerekiyorsa `DATABASE_URL` sonuna `?sslmode=require` ekleyin.
- Node.js 18+ sürümü tavsiye edilir.

---
