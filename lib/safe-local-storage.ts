// Safe localStorage wrapper to prevent SSR issues
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === "undefined") {
      return null
    }
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      return null
    }
  },

  setItem: (key: string, value: string): boolean => {
    if (typeof window === "undefined") {
      return false
    }
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.error("Error setting localStorage item:", error)
      return false
    }
  },

  removeItem: (key: string): boolean => {
    if (typeof window === "undefined") {
      return false
    }
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error("Error removing localStorage item:", error)
      return false
    }
  },
}
