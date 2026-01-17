export const CATEGORIES = ["UI", "Backend", "Docs", "Inspiration"] as const
export type Category = (typeof CATEGORIES)[number]

export function isCategory(x: string): x is Category {
    return (CATEGORIES as readonly string[]).includes(x)
}