This repository is example for `apollo-client` [issue](https://github.com/apollographql/apollo-client/issues/7722)

If we use `watchQuery` with `network-only` fetch policy, the http request will be duplicated.

<details>
<summary>Example logs</summary>

```
Server log:
---
INFO | MUTATION handler called
INFO | QUERY handler called
INFO | QUERY handler called
---
```

```
Client log:
---
MUTATION | HTTP fetch called. Operation -> CreateEntity
QUERY | HTTP fetch called. Operation -> GetEntities
QUERY | HTTP fetch called. Operation -> GetEntities
---
```

</details>

<br />

### Start guide

- `npm install`
- `npm run start:server`
- `npm run start:client`

Tested on nodejs `v14.15.4`
