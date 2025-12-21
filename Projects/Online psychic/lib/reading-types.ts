import { ExtendedReadingType, ReadingTypeArrayResult } from '@/types/reading-types'

/**
 * Helper function to deduplicate reading types by name
 * Keeps the first occurrence of each reading type name
 */
export function deduplicateReadingTypes(
  readingTypes: ExtendedReadingType[] | null | undefined
): ReadingTypeArrayResult {
  if (!readingTypes || readingTypes.length === 0) {
    return []
  }

  const uniqueByName = new Map<string, ExtendedReadingType>()
  
  return readingTypes.filter((readingType) => {
    if (!readingType || !readingType.name) {
      return false
    }
    
    // If we've already seen this name, skip it
    if (uniqueByName.has(readingType.name)) {
      return false
    }
    
    // Store this reading type and keep it
    uniqueByName.set(readingType.name, readingType)
    return true
  })
}

