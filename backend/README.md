# PolyNFT Backend

## Prepare .env

```bash
$ cp .env.example .env
```

## Run local

```bash
$ npm install
$ npm run serve
```

## Upload payload

Note: payload should be base64-encoded

### Request

```bash
curl -X POST http://localhost:3000/api/v1/upload \
    -H "Content-Type: application/json" \
    -d '{"payload":"VGVzdFRlc3QK"}'
```

### Response

```bash
{"ipfs":"https://ipfs.io/ipfs/QmWbUiHLAgVVV254jEKVY2gLeZ8bjXzGPqyErjmxL9jFSX"}
```
