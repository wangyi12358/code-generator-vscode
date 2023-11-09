

export function camelCase(name: string) {
  return name.replace(/-(\w)/g, ($0, $1) => {
    return $1.toUpperCase();
  });
}