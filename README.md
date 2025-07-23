# Todo Backend

Bu proje, Express.js ile oluşturulmuş bir Todo API sunucusudur. Kimlik doğrulama JWT ve HTTP Only cookie üzerinden yapılmaktadır. Kullanıcı işlemleri ve todo yönetimi REST API üzerinden gerçekleştirilir.

## Özellikler

- Kullanıcı kayıt ve giriş işlemleri
- JWT + HTTP Only cookie ile güvenli oturum yönetimi
- Todo ekleme, silme, güncelleme, tamamlanma durumunu değiştirme
- CORS ve CSRF güvenlik önlemleri
- Xata veritabanı kullanımı

## Kurulum

```bash
git clone https://github.com/EmirhanG7/todo-backend.git
cd todo-backend
npm install
```

## Çalıştırma

```bash
npm start
```

## Ortam Değişkenleri

`.env` dosyası aşağıdaki bilgileri içermelidir:

```
DATABASE_URL=your_xata_database_url
JWT_SECRET=your_jwt_secret
```

## Kullanılan Teknolojiler

- Node.js
- Express.js
- Drizzle ORM
- PostgreSQL (Xata)
- JWT + HTTP Only cookie
- Dotenv
- CORS

---

**Frontend:** [todo-frontend GitHub Reposu](https://github.com/EmirhanG7/todo-frontend)