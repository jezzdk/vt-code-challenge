## Requirements

PHP 8.1
Node 18+

## Get started

Clone the repo

```bash
git clone git@github.com:jezzdk/vt-code-challenge.git && cd vt-code-challenge
```

Install dependencies

```bash
composer install
```

Generate application key

```bash
php artisan key:generate
```

Run migrations and seeders

```bash
php artisan migrate --seed
```

Install frontend dependencies

```bash
npm install
```

Build frontend assets

```bash
npm run build
```

## Development

Start the watcher

```bash
npm run dev
```

Start the backend webservice

```bash
php artisan serve
```

Run integration tests (backend)

```bash
php vendor/bin/pest
```
