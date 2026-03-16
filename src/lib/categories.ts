export const CATEGORIES = ["UI", "Backend", "Docs", "Inspiration"] as const

export function isCategory(value: string): value is (typeof CATEGORIES[number]) {
    return CATEGORIES.includes(value as typeof CATEGORIES[number]);
}