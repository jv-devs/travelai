type DreamerResult = {
  name: string
  description: string
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

type AppUser = {
  uid: string
  email: string
  displayName: string
  photoURL: string
}
