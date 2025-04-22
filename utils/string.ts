let id_counter = 0
export function unique_id() {
  return `id-${id_counter++}`
}

export function normalizeFileName(name: string): string {
  return name
    .normalize("NFD") // Remove acentos
    .replace(/[\u0300-\u036f]/g, "") // Remove marcas diacríticas
    .replace(/[^a-zA-Z0-9-_]/g, "-") // Substitui caracteres especiais por hífens
    .replace(/--+/g, "-") // Remove hífens duplicados
    .replace(/^-+|-+$/g, "") // Remove hífens do início/fim
    .toLowerCase()
}
