type DreamerResult = {
  name: string
  description: string
  // Temporary fix for conditional styling
  [key: string]: any | undefined
}

type BuilderResult = {
  name: string
  activities: string[]
  // Temporary fix for conditional styling
  [key: string]: any | undefined
}
