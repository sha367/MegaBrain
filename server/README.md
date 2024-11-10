# API

## Chats
### GET `chats/`
```typescript
params: {}
```
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
```typescript
params: {}
```
### GET `model/`
```typescript
params: {
  id: string
}
```
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
