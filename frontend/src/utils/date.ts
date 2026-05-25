export function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(value));
}

export function toDateInputValue(value: string) {
  return value.slice(0, 10);
}
