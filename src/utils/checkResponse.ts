type TResponse = { data: unknown } | { error: { message: string }}

export const checkResponse = (response: TResponse) => {
  if ('error' in response) {
    throw new Error(response.error.message)
  }

  if (!('data' in response)) {
    throw new Error('Invalid response')
  }

  return response.data;
}
