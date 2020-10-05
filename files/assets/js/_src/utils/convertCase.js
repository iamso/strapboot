export const toCamel = str => str.toLowerCase().replace(/([- _]\w)/g, g => g[1].toUpperCase());

export const toPascal = str => toCamel(str).replace(/(\b\w)/gi, m => m.toUpperCase());

export const toSnake = str => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase());

export const toUnderscore = str => str.replace(/([A-Z])/g, g => '_' + g.toLowerCase());

