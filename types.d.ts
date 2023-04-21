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

type UserInputData = {
  origin: string
  vacationBudget: string
  travelSeason: string
  vacationType: string
}

type UserChoiceData = {
  destination: string
  vacationBudget: string
  travelSeason: string
  vacationType: string
}
