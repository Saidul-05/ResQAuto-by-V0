// Enhanced transfer learning calculator with environmental factors

export interface EnvironmentalConditions {
  weather: {
    condition: "clear" | "rain" | "snow" | "fog" | "storm" | "extreme_heat" | "extreme_cold"
    severity: "light" | "moderate" | "heavy" | "severe"
    visibility: number // meters
    temperature: number // celsius
    windSpeed: number // km/h
    precipitation: number // mm/h
  }
  coverage: {
    cellSignal: "excellent" | "good" | "fair" | "poor" | "none"
    signalStrength: number // dBm (-50 to -120)
    dataSpeed: "5G" | "4G" | "3G" | "2G" | "edge"
    latency: number // ms
    reliability: number // 0-1 scale
  }
  location: {
    type: "urban" | "suburban" | "rural" | "highway" | "remote"
    population: number
    infrastructure: "excellent" | "good" | "fair" | "poor"
    emergencyServices: "immediate" | "nearby" | "distant" | "limited"
  }
  timeContext: {
    timeOfDay: "morning" | "afternoon" | "evening" | "night" | "late_night"
    dayOfWeek: "weekday" | "weekend"
    season: "spring" | "summer" | "fall" | "winter"
    isHoliday: boolean
  }
}

export interface TransferScenario {
  sourceEmergency: string
  targetEmergency: string
  baseTransferRate: number
  userExperience: "new" | "experienced" | "expert"
  stressLevel: number // 1-10
  urgency: "low" | "medium" | "high" | "critical"
}

export interface EnvironmentalImpact {
  weatherImpact: number // -1 to 1 (negative = reduces efficiency)
  coverageImpact: number // -1 to 1
  locationImpact: number // -1 to 1
  timeImpact: number // -1 to 1
  combinedImpact: number // -1 to 1
  adjustedTransferRate: number // final transfer efficiency
  confidenceLevel: number // 0-1
  riskFactors: string[]
  mitigationStrategies: string[]
}

// Weather impact calculation
export const calculateWeatherImpact = (weather: EnvironmentalConditions["weather"]): number => {
  let impact = 0

  // Base weather condition impact
  const weatherImpacts = {
    clear: 0.1,
    rain: -0.15,
    snow: -0.25,
    fog: -0.3,
    storm: -0.4,
    extreme_heat: -0.2,
    extreme_cold: -0.3,
  }

  impact += weatherImpacts[weather.condition]

  // Severity multiplier
  const severityMultipliers = {
    light: 0.5,
    moderate: 1.0,
    heavy: 1.5,
    severe: 2.0,
  }

  impact *= severityMultipliers[weather.severity]

  // Visibility impact
  if (weather.visibility < 100) impact -= 0.3
  else if (weather.visibility < 500) impact -= 0.2
  else if (weather.visibility < 1000) impact -= 0.1

  // Temperature extremes
  if (weather.temperature < -10 || weather.temperature > 40) {
    impact -= 0.15
  }

  // Wind impact
  if (weather.windSpeed > 50) impact -= 0.2
  else if (weather.windSpeed > 30) impact -= 0.1

  // Precipitation impact
  if (weather.precipitation > 10) impact -= 0.25
  else if (weather.precipitation > 5) impact -= 0.15
  else if (weather.precipitation > 1) impact -= 0.1

  return Math.max(-0.8, Math.min(0.3, impact))
}

// Coverage impact calculation
export const calculateCoverageImpact = (coverage: EnvironmentalConditions["coverage"]): number => {
  let impact = 0

  // Signal strength impact
  const signalImpacts = {
    excellent: 0.2,
    good: 0.1,
    fair: 0,
    poor: -0.3,
    none: -0.8,
  }

  impact += signalImpacts[coverage.cellSignal]

  // Data speed impact
  const speedImpacts = {
    "5G": 0.15,
    "4G": 0.1,
    "3G": 0,
    "2G": -0.2,
    edge: -0.4,
  }

  impact += speedImpacts[coverage.dataSpeed]

  // Latency impact
  if (coverage.latency > 1000) impact -= 0.3
  else if (coverage.latency > 500) impact -= 0.2
  else if (coverage.latency > 200) impact -= 0.1
  else if (coverage.latency < 50) impact += 0.1

  // Reliability impact
  impact += (coverage.reliability - 0.8) * 0.5

  return Math.max(-0.8, Math.min(0.3, impact))
}

// Location impact calculation
export const calculateLocationImpact = (location: EnvironmentalConditions["location"]): number => {
  let impact = 0

  // Location type impact
  const locationImpacts = {
    urban: 0.2,
    suburban: 0.1,
    rural: -0.1,
    highway: -0.15,
    remote: -0.4,
  }

  impact += locationImpacts[location.type]

  // Infrastructure impact
  const infrastructureImpacts = {
    excellent: 0.15,
    good: 0.05,
    fair: 0,
    poor: -0.2,
  }

  impact += infrastructureImpacts[location.infrastructure]

  // Emergency services proximity
  const servicesImpacts = {
    immediate: 0.2,
    nearby: 0.1,
    distant: -0.1,
    limited: -0.3,
  }

  impact += servicesImpacts[location.emergencyServices]

  // Population density (affects help availability)
  if (location.population > 100000) impact += 0.1
  else if (location.population < 1000) impact -= 0.2

  return Math.max(-0.6, Math.min(0.4, impact))
}

// Time context impact calculation
export const calculateTimeImpact = (timeContext: EnvironmentalConditions["timeContext"]): number => {
  let impact = 0

  // Time of day impact
  const timeImpacts = {
    morning: 0.05,
    afternoon: 0.1,
    evening: 0,
    night: -0.1,
    late_night: -0.2,
  }

  impact += timeImpacts[timeContext.timeOfDay]

  // Day of week impact
  if (timeContext.dayOfWeek === "weekend") {
    impact -= 0.05 // Fewer services available
  }

  // Holiday impact
  if (timeContext.isHoliday) {
    impact -= 0.1 // Reduced service availability
  }

  // Seasonal impact
  const seasonImpacts = {
    spring: 0.05,
    summer: 0.1,
    fall: 0,
    winter: -0.15,
  }

  impact += seasonImpacts[timeContext.season]

  return Math.max(-0.3, Math.min(0.2, impact))
}

// Main environmental transfer calculator
export const calculateEnvironmentalTransferRate = (
  scenario: TransferScenario,
  conditions: EnvironmentalConditions,
): EnvironmentalImpact => {
  // Calculate individual impacts
  const weatherImpact = calculateWeatherImpact(conditions.weather)
  const coverageImpact = calculateCoverageImpact(conditions.coverage)
  const locationImpact = calculateLocationImpact(conditions.location)
  const timeImpact = calculateTimeImpact(conditions.timeContext)

  // Weight impacts based on emergency urgency
  const urgencyWeights = {
    low: { weather: 0.8, coverage: 0.6, location: 0.7, time: 0.5 },
    medium: { weather: 1.0, coverage: 0.8, location: 0.8, time: 0.6 },
    high: { weather: 1.2, coverage: 1.0, location: 0.9, time: 0.7 },
    critical: { weather: 1.5, coverage: 1.2, location: 1.0, time: 0.8 },
  }

  const weights = urgencyWeights[scenario.urgency]

  // Calculate weighted combined impact
  const combinedImpact =
    (weatherImpact * weights.weather +
      coverageImpact * weights.coverage +
      locationImpact * weights.location +
      timeImpact * weights.time) /
    (weights.weather + weights.coverage + weights.location + weights.time)

  // Adjust base transfer rate
  let adjustedTransferRate = scenario.baseTransferRate + combinedImpact

  // Apply user experience modifier
  const experienceModifiers = {
    new: -0.1, // New users more affected by conditions
    experienced: 0, // Baseline
    expert: 0.05, // Experts less affected
  }

  adjustedTransferRate += experienceModifiers[scenario.userExperience]

  // Apply stress level modifier (high stress reduces environmental adaptation)
  const stressModifier = (scenario.stressLevel - 5) * -0.02
  adjustedTransferRate += stressModifier

  // Ensure bounds
  adjustedTransferRate = Math.max(0.1, Math.min(0.95, adjustedTransferRate))

  // Calculate confidence level
  const confidenceLevel = Math.max(0.3, Math.min(0.95, 0.8 - Math.abs(combinedImpact) * 0.5))

  // Identify risk factors
  const riskFactors: string[] = []
  if (weatherImpact < -0.2) riskFactors.push("Severe weather conditions")
  if (coverageImpact < -0.3) riskFactors.push("Poor network connectivity")
  if (locationImpact < -0.2) riskFactors.push("Remote location with limited services")
  if (timeImpact < -0.1) riskFactors.push("Off-hours with reduced availability")
  if (scenario.stressLevel > 7) riskFactors.push("High stress affecting performance")

  // Generate mitigation strategies
  const mitigationStrategies: string[] = []
  if (weatherImpact < -0.2) {
    mitigationStrategies.push("Use alternative verification methods less affected by weather")
    mitigationStrategies.push("Increase timeout periods for verification attempts")
  }
  if (coverageImpact < -0.3) {
    mitigationStrategies.push("Enable offline verification capabilities")
    mitigationStrategies.push("Use SMS fallback for critical communications")
  }
  if (locationImpact < -0.2) {
    mitigationStrategies.push("Pre-cache emergency protocols for remote areas")
    mitigationStrategies.push("Activate extended response time allowances")
  }
  if (timeImpact < -0.1) {
    mitigationStrategies.push("Route to 24/7 emergency services")
    mitigationStrategies.push("Use automated verification where possible")
  }

  return {
    weatherImpact,
    coverageImpact,
    locationImpact,
    timeImpact,
    combinedImpact,
    adjustedTransferRate,
    confidenceLevel,
    riskFactors,
    mitigationStrategies,
  }
}

// Get current environmental conditions (would integrate with real APIs)
export const getCurrentEnvironmentalConditions = async (
  latitude: number,
  longitude: number,
): Promise<EnvironmentalConditions> => {
  // In a real implementation, this would call weather APIs, cell tower APIs, etc.
  // For demo purposes, returning realistic simulated data

  const now = new Date()
  const hour = now.getHours()

  return {
    weather: {
      condition: Math.random() < 0.7 ? "clear" : Math.random() < 0.5 ? "rain" : "fog",
      severity: Math.random() < 0.6 ? "light" : Math.random() < 0.8 ? "moderate" : "heavy",
      visibility: Math.random() * 5000 + 500,
      temperature: Math.random() * 30 + 5,
      windSpeed: Math.random() * 40,
      precipitation: Math.random() * 5,
    },
    coverage: {
      cellSignal: Math.random() < 0.4 ? "excellent" : Math.random() < 0.7 ? "good" : "fair",
      signalStrength: -50 - Math.random() * 60,
      dataSpeed: Math.random() < 0.6 ? "4G" : Math.random() < 0.8 ? "5G" : "3G",
      latency: Math.random() * 200 + 20,
      reliability: Math.random() * 0.3 + 0.7,
    },
    location: {
      type: Math.random() < 0.4 ? "urban" : Math.random() < 0.7 ? "suburban" : "rural",
      population: Math.floor(Math.random() * 500000),
      infrastructure: Math.random() < 0.5 ? "good" : Math.random() < 0.8 ? "fair" : "excellent",
      emergencyServices: Math.random() < 0.6 ? "nearby" : Math.random() < 0.8 ? "immediate" : "distant",
    },
    timeContext: {
      timeOfDay:
        hour < 6 ? "late_night" : hour < 12 ? "morning" : hour < 17 ? "afternoon" : hour < 22 ? "evening" : "night",
      dayOfWeek: now.getDay() === 0 || now.getDay() === 6 ? "weekend" : "weekday",
      season:
        Math.floor(now.getMonth() / 3) === 0
          ? "winter"
          : Math.floor(now.getMonth() / 3) === 1
            ? "spring"
            : Math.floor(now.getMonth() / 3) === 2
              ? "summer"
              : "fall",
      isHoliday: false, // Would check against holiday calendar
    },
  }
}

// Historical environmental analysis
export const analyzeHistoricalEnvironmentalImpact = (
  emergencyRecords: Array<{
    conditions: EnvironmentalConditions
    transferSuccess: boolean
    transferRate: number
    responseTime: number
  }>,
) => {
  const analysis = {
    weatherPatterns: {} as Record<string, { successRate: number; avgTransferRate: number; count: number }>,
    coveragePatterns: {} as Record<string, { successRate: number; avgTransferRate: number; count: number }>,
    locationPatterns: {} as Record<string, { successRate: number; avgTransferRate: number; count: number }>,
    timePatterns: {} as Record<string, { successRate: number; avgTransferRate: number; count: number }>,
    correlations: {
      weatherVsSuccess: 0,
      coverageVsSuccess: 0,
      locationVsSuccess: 0,
      timeVsSuccess: 0,
    },
  }

  // Analyze patterns by condition type
  emergencyRecords.forEach((record) => {
    const { conditions, transferSuccess, transferRate } = record

    // Weather patterns
    const weatherKey = `${conditions.weather.condition}_${conditions.weather.severity}`
    if (!analysis.weatherPatterns[weatherKey]) {
      analysis.weatherPatterns[weatherKey] = { successRate: 0, avgTransferRate: 0, count: 0 }
    }
    const weatherPattern = analysis.weatherPatterns[weatherKey]
    weatherPattern.successRate =
      (weatherPattern.successRate * weatherPattern.count + (transferSuccess ? 1 : 0)) / (weatherPattern.count + 1)
    weatherPattern.avgTransferRate =
      (weatherPattern.avgTransferRate * weatherPattern.count + transferRate) / (weatherPattern.count + 1)
    weatherPattern.count++

    // Similar analysis for coverage, location, and time...
  })

  return analysis
}
