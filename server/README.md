# API

## Chats
### GET `chats/`
### GET `chat/`
```typescript
params: {
  id: string
}
```
### POST `chat/`
```typescript
params: {
  id: string
}
```
### POST `chat/new/`
```typescript
params: {
  message?: string
}
```
### DELETE `chat/`
```typescript
params: {
  id: string
}
```

## Models
### GET `models/`
### POST `model/download/`
```typescript
params: {
  id: string
}
```
### DELETE `model/delete/`
```typescript
params: {
  id: string
}
```
