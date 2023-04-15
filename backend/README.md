# PolyNFT Backend

### Prepare .env

```bash
$ cp .env.example .env
```

### Run local

```bash
$ npm install
$ npm run serve
```

### Upload payload

Note: payload should be base64-encoded

```
curl -X POST http://localhost:3000/api/v1/upload \
    -H "Content-Type: application/json" \
    -d '{"payload":"VGVzdFRlc3QK"}'
```
