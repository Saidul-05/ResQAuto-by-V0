// Environmental Context Service for Transfer Learning Enhancement

export interface WeatherCondition {
  type: "clear" | "cloudy" | "rain" | "snow" | "fog" | "storm" | "extreme_heat" | "extreme_cold"
  severity: "light" | "moderate" | "heavy" | "severe"
  visibility: number // meters
  temperature: number // celsius
  windSpeed: number // km/h
  humidity: number // percentage
}

export interface CoverageCondition {
  cellSignal: "excellent" | "good" | "fair" | "poor" | "none"
  signalStrength: number // -50 to -120 dBm
  networkType: "5G" | "4G" | "3G" | "2G" | "WiFi" | "satellite"
  dataSpeed: number // Mbps
  latency: number // ms
  reliability: number // 0-1 scale
}

export interface LocationContext {
  region: "urban" | "suburban" | "rural" | "highway" | "remote" | "wilderness"
  population: number
  nearestTower: number // km
  emergencyServices: number // km to nearest
  terrain: "flat" | "hilly" | "mountainous" | "coastal" | "desert"
  infrastructure: "excellent" | "good" | "fair" | "poor" | "minimal"
}

export interface EnvironmentalContext {
  weather: WeatherCondition
  coverage: CoverageCondition
  location: LocationContext
  timeOfDay: "dawn" | "morning" | "afternoon" | "evening" | "night" | "late_night"
  season: "spring" | "summer" | "fall" | "winter"
  timestamp: Date
  confidence: number // 0-1 scale for data accuracy
}

export interface EnvironmentalImpact {
  verificationDifficulty: number // 0-1 scale (higher = more difficult)
  stressMultiplier: number // 1.0 = normal, >1.0 = more stress
  timeMultiplier: number // 1.0 = normal, >1.0 = takes longer
  successProbability: number // 0-1 scale
  transferEfficiency: number // 0-1 scale for knowledge transfer
  recommendedMethods: string[] // preferred biometric methods
  fallbackStrategies: string[] // backup verification approaches
}

// Environmental impact calculations
export class EnvironmentalContextService {
  private static instance: EnvironmentalContextService
  private weatherCache = new Map<string, WeatherCondition>()
  private coverageCache = new Map<string, CoverageCondition>()

  static getInstance(): EnvironmentalContextService {
    if (!EnvironmentalContextService.instance) {
      EnvironmentalContextService.instance = new EnvironmentalContextService()
    }
    return EnvironmentalContextService.instance
  }

  // Get current environmental context
  async getCurrentEnvironmentalContext(latitude: number, longitude: number): Promise<EnvironmentalContext> {
    try {
      const [weather, coverage, location] = await Promise.all([
        this.getWeatherCondition(latitude, longitude),
        this.getCoverageCondition(latitude, longitude),
        this.getLocationContext(latitude, longitude),
      ])

      const now = new Date()
      const timeOfDay = this.getTimeOfDay(now)
      const season = this.getSeason(now)

      return {
        weather,
        coverage,
        location,
        timeOfDay,
        season,
        timestamp: now,
        confidence: 0.85, // Simulated confidence level
      }
    } catch (error) {
      console.error("Error getting environmental context:", error)
      return this.getDefaultEnvironmentalContext()
    }
  }

  // Calculate environmental impact on verification process
  calculateEnvironmentalImpact(context: EnvironmentalContext): EnvironmentalImpact {
    let verificationDifficulty = 0.1 // Base difficulty
    let stressMultiplier = 1.0
    let timeMultiplier = 1.0
    let successProbability = 0.9 // Base success rate
    let transferEfficiency = 1.0 // Base transfer efficiency
    const recommendedMethods: string[] = []
    const fallbackStrategies: string[] = []

    // Weather impact
    const weatherImpact = this.calculateWeatherImpact(context.weather)
    verificationDifficulty += weatherImpact.difficulty
    stressMultiplier *= weatherImpact.stressMultiplier
    timeMultiplier *= weatherImpact.timeMultiplier
    successProbability *= weatherImpact.successMultiplier
    transferEfficiency *= weatherImpact.transferMultiplier

    // Coverage impact
    const coverageImpact = this.calculateCoverageImpact(context.coverage)
    verificationDifficulty += coverageImpact.difficulty
    timeMultiplier *= coverageImpact.timeMultiplier
    successProbability *= coverageImpact.successMultiplier
    transferEfficiency *= coverageImpact.transferMultiplier

    // Location impact
    const locationImpact = this.calculateLocationImpact(context.location)
    verificationDifficulty += locationImpact.difficulty
    stressMultiplier *= locationImpact.stressMultiplier
    successProbability *= locationImpact.successMultiplier
    transferEfficiency *= locationImpact.transferMultiplier

    // Time of day impact
    const timeImpact = this.calculateTimeImpact(context.timeOfDay)
    verificationDifficulty += timeImpact.difficulty
    stressMultiplier *= timeImpact.stressMultiplier
    successProbability *= timeImpact.successMultiplier

    // Determine recommended methods based on conditions
    if (context.weather.visibility > 1000 && context.timeOfDay !== "night") {
      recommendedMethods.push("face", "iris")
    }
    if (context.coverage.signalStrength > -80) {
      recommendedMethods.push("fingerprint", "voice")
    }
    if (context.weather.type === "extreme_cold") {
      recommendedMethods.push("voice", "iris")
      fallbackStrategies.push("emergency_override")
    }
    if (context.coverage.cellSignal === "poor" || context.coverage.cellSignal === "none") {
      fallbackStrategies.push("offline_verification", "satellite_backup")
    }

    // Ensure we have default methods
    if (recommendedMethods.length === 0) {
      recommendedMethods.push("fingerprint", "face")
    }
    if (fallbackStrategies.length === 0) {
      fallbackStrategies.push("emergency_override")
    }

    return {
      verificationDifficulty: Math.max(0, Math.min(1, verificationDifficulty)),
      stressMultiplier: Math.max(0.5, Math.min(3.0, stressMultiplier)),
      timeMultiplier: Math.max(0.5, Math.min(5.0, timeMultiplier)),
      successProbability: Math.max(0.1, Math.min(1.0, successProbability)),
      transferEfficiency: Math.max(0.1, Math.min(1.5, transferEfficiency)),
      recommendedMethods,
      fallbackStrategies,
    }
  }

  // Calculate adjusted transfer efficiency based on environmental factors
  calculateEnvironmentalTransferEfficiency(
    baseTransferEfficiency: number,
    sourceContext: EnvironmentalContext,
    targetContext: EnvironmentalContext,
  ): number {
    const sourceImpact = this.calculateEnvironmentalImpact(sourceContext)
    const targetImpact = this.calculateEnvironmentalImpact(targetContext)

    // Calculate similarity between environmental contexts
    const contextSimilarity = this.calculateContextSimilarity(sourceContext, targetContext)

    // Base transfer efficiency adjusted by environmental factors
    let adjustedEfficiency = baseTransferEfficiency

    // Apply source context impact
    adjustedEfficiency *= sourceImpact.transferEfficiency

    // Apply target context impact
    adjustedEfficiency *= targetImpact.transferEfficiency

    // Apply context similarity bonus/penalty
    adjustedEfficiency *= 0.7 + contextSimilarity * 0.6

    // Environmental stress correlation
    const stressSimilarity = Math.abs(sourceImpact.stressMultiplier - targetImpact.stressMultiplier)
    if (stressSimilarity < 0.3) {
      adjustedEfficiency *= 1.1 // Bonus for similar stress levels
    } else if (stressSimilarity > 1.0) {
      adjustedEfficiency *= 0.8 // Penalty for very different stress levels
    }

    return Math.max(0.1, Math.min(1.5, adjustedEfficiency))
  }

  // Private helper methods
  private async getWeatherCondition(lat: number, lng: number): Promise<WeatherCondition> {
    const cacheKey = `${Math.round(lat * 100)},${Math.round(lng * 100)}`

    if (this.weatherCache.has(cacheKey)) {
      return this.weatherCache.get(cacheKey)!
    }

    // Simulate weather API call
    const weatherTypes: WeatherCondition["type"][] = [
      "clear",
      "cloudy",
      "rain",
      "snow",
      "fog",
      "storm",
      "extreme_heat",
      "extreme_cold",
    ]
    const severities: WeatherCondition["severity"][] = ["light", "moderate", "heavy", "severe"]

    const weather: WeatherCondition = {
      type: weatherTypes[Math.floor(Math.random() * weatherTypes.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      visibility: Math.random() * 10000 + 100, // 100m to 10km
      temperature: Math.random() * 60 - 20, // -20°C to 40°C
      windSpeed: Math.random() * 100, // 0-100 km/h
      humidity: Math.random() * 100, // 0-100%
    }

    this.weatherCache.set(cacheKey, weather)
    return weather
  }

  private async getCoverageCondition(lat: number, lng: number): Promise<CoverageCondition> {
    const cacheKey = `coverage_${Math.round(lat * 100)},${Math.round(lng * 100)}`

    if (this.coverageCache.has(cacheKey)) {
      return this.coverageCache.get(cacheKey)!
    }

    // Simulate coverage based on location
    const signalLevels: CoverageCondition["cellSignal"][] = ["excellent", "good", "fair", "poor", "none"]
    const networks: CoverageCondition["networkType"][] = ["5G", "4G", "3G", "2G", "WiFi", "satellite"]

    const coverage: CoverageCondition = {
      cellSignal: signalLevels[Math.floor(Math.random() * signalLevels.length)],
      signalStrength: Math.random() * -70 - 50, // -50 to -120 dBm
      networkType: networks[Math.floor(Math.random() * networks.length)],
      dataSpeed: Math.random() * 100, // 0-100 Mbps
      latency: Math.random() * 200 + 10, // 10-210 ms
      reliability: Math.random() * 0.4 + 0.6, // 0.6-1.0
    }

    this.coverageCache.set(cacheKey, coverage)
    return coverage
  }

  private async getLocationContext(lat: number, lng: number): Promise<LocationContext> {
    // Simulate location analysis
    const regions: LocationContext["region"][] = ["urban", "suburban", "rural", "highway", "remote", "wilderness"]
    const terrains: LocationContext["terrain"][] = ["flat", "hilly", "mountainous", "coastal", "desert"]
    const infrastructures: LocationContext["infrastructure"][] = ["excellent", "good", "fair", "poor", "minimal"]

    return {
      region: regions[Math.floor(Math.random() * regions.length)],
      population: Math.floor(Math.random() * 1000000),
      nearestTower: Math.random() * 50, // 0-50 km
      emergencyServices: Math.random() * 30, // 0-30 km
      terrain: terrains[Math.floor(Math.random() * terrains.length)],
      infrastructure: infrastructures[Math.floor(Math.random() * infrastructures.length)],
    }
  }

  private getTimeOfDay(date: Date): EnvironmentalContext["timeOfDay"] {
    const hour = date.getHours()
    if (hour >= 5 && hour < 8) return "dawn"
    if (hour >= 8 && hour < 12) return "morning"
    if (hour >= 12 && hour < 17) return "afternoon"
    if (hour >= 17 && hour < 20) return "evening"
    if (hour >= 20 && hour < 24) return "night"
    return "late_night"
  }

  private getSeason(date: Date): EnvironmentalContext["season"] {
    const month = date.getMonth()
    if (month >= 2 && month <= 4) return "spring"
    if (month >= 5 && month <= 7) return "summer"
    if (month >= 8 && month <= 10) return "fall"
    return "winter"
  }

  private calculateWeatherImpact(weather: WeatherCondition) {
    let difficulty = 0
    let stressMultiplier = 1.0
    let timeMultiplier = 1.0
    let successMultiplier = 1.0
    let transferMultiplier = 1.0

    // Weather type impact
    switch (weather.type) {
      case "clear":
        difficulty += 0.0
        break
      case "cloudy":
        difficulty += 0.1
        break
      case "rain":
        difficulty += 0.2
        stressMultiplier *= 1.1
        timeMultiplier *= 1.2
        successMultiplier *= 0.9
        transferMultiplier *= 0.95
        break
      case "snow":
        difficulty += 0.3
        stressMultiplier *= 1.2
        timeMultiplier *= 1.4
        successMultiplier *= 0.8
        transferMultiplier *= 0.9
        break
      case "fog":
        difficulty += 0.25
        stressMultiplier *= 1.15
        timeMultiplier *= 1.3
        successMultiplier *= 0.85
        transferMultiplier *= 0.92
        break
      case "storm":
        difficulty += 0.4
        stressMultiplier *= 1.5
        timeMultiplier *= 1.8
        successMultiplier *= 0.7
        transferMultiplier *= 0.8
        break
      case "extreme_heat":
        difficulty += 0.2
        stressMultiplier *= 1.3
        timeMultiplier *= 1.1
        successMultiplier *= 0.85
        transferMultiplier *= 0.9
        break
      case "extreme_cold":
        difficulty += 0.25
        stressMultiplier *= 1.4
        timeMultiplier *= 1.5
        successMultiplier *= 0.75
        transferMultiplier *= 0.85
        break
    }

    // Severity impact
    switch (weather.severity) {
      case "light":
        break
      case "moderate":
        difficulty *= 1.2
        stressMultiplier *= 1.1
        timeMultiplier *= 1.1
        break
      case "heavy":
        difficulty *= 1.5
        stressMultiplier *= 1.3
        timeMultiplier *= 1.4
        successMultiplier *= 0.9
        transferMultiplier *= 0.95
        break
      case "severe":
        difficulty *= 2.0
        stressMultiplier *= 1.6
        timeMultiplier *= 2.0
        successMultiplier *= 0.7
        transferMultiplier *= 0.8
        break
    }

    // Visibility impact
    if (weather.visibility < 500) {
      difficulty += 0.3
      successMultiplier *= 0.8
      transferMultiplier *= 0.9
    } else if (weather.visibility < 1000) {
      difficulty += 0.15
      successMultiplier *= 0.9
      transferMultiplier *= 0.95
    }

    return {
      difficulty,
      stressMultiplier,
      timeMultiplier,
      successMultiplier,
      transferMultiplier,
    }
  }

  private calculateCoverageImpact(coverage: CoverageCondition) {
    let difficulty = 0
    let timeMultiplier = 1.0
    let successMultiplier = 1.0
    let transferMultiplier = 1.0

    // Signal strength impact
    switch (coverage.cellSignal) {
      case "excellent":
        difficulty += 0.0
        break
      case "good":
        difficulty += 0.05
        timeMultiplier *= 1.1
        break
      case "fair":
        difficulty += 0.15
        timeMultiplier *= 1.3
        successMultiplier *= 0.9
        transferMultiplier *= 0.95
        break
      case "poor":
        difficulty += 0.3
        timeMultiplier *= 1.8
        successMultiplier *= 0.75
        transferMultiplier *= 0.85
        break
      case "none":
        difficulty += 0.5
        timeMultiplier *= 3.0
        successMultiplier *= 0.5
        transferMultiplier *= 0.7
        break
    }

    // Network type impact
    switch (coverage.networkType) {
      case "5G":
      case "WiFi":
        break
      case "4G":
        timeMultiplier *= 1.1
        break
      case "3G":
        timeMultiplier *= 1.4
        successMultiplier *= 0.95
        break
      case "2G":
        timeMultiplier *= 2.5
        successMultiplier *= 0.8
        transferMultiplier *= 0.9
        break
      case "satellite":
        timeMultiplier *= 2.0
        successMultiplier *= 0.85
        transferMultiplier *= 0.95
        break
    }

    return {
      difficulty,
      timeMultiplier,
      successMultiplier,
      transferMultiplier,
    }
  }

  private calculateLocationImpact(location: LocationContext) {
    let difficulty = 0
    let stressMultiplier = 1.0
    let successMultiplier = 1.0
    let transferMultiplier = 1.0

    // Region impact
    switch (location.region) {
      case "urban":
        difficulty += 0.0
        break
      case "suburban":
        difficulty += 0.05
        break
      case "rural":
        difficulty += 0.15
        stressMultiplier *= 1.1
        transferMultiplier *= 0.95
        break
      case "highway":
        difficulty += 0.1
        stressMultiplier *= 1.2
        transferMultiplier *= 0.9
        break
      case "remote":
        difficulty += 0.3
        stressMultiplier *= 1.4
        successMultiplier *= 0.8
        transferMultiplier *= 0.85
        break
      case "wilderness":
        difficulty += 0.4
        stressMultiplier *= 1.6
        successMultiplier *= 0.7
        transferMultiplier *= 0.8
        break
    }

    // Infrastructure impact
    switch (location.infrastructure) {
      case "excellent":
        break
      case "good":
        difficulty += 0.05
        break
      case "fair":
        difficulty += 0.1
        successMultiplier *= 0.95
        break
      case "poor":
        difficulty += 0.2
        successMultiplier *= 0.85
        transferMultiplier *= 0.9
        break
      case "minimal":
        difficulty += 0.35
        successMultiplier *= 0.7
        transferMultiplier *= 0.8
        break
    }

    return {
      difficulty,
      stressMultiplier,
      successMultiplier,
      transferMultiplier,
    }
  }

  private calculateTimeImpact(timeOfDay: EnvironmentalContext["timeOfDay"]) {
    let difficulty = 0
    let stressMultiplier = 1.0
    let successMultiplier = 1.0

    switch (timeOfDay) {
      case "morning":
      case "afternoon":
        break
      case "dawn":
      case "evening":
        difficulty += 0.1
        successMultiplier *= 0.95
        break
      case "night":
        difficulty += 0.2
        stressMultiplier *= 1.2
        successMultiplier *= 0.9
        break
      case "late_night":
        difficulty += 0.3
        stressMultiplier *= 1.4
        successMultiplier *= 0.8
        break
    }

    return {
      difficulty,
      stressMultiplier,
      successMultiplier,
    }
  }

  private calculateContextSimilarity(context1: EnvironmentalContext, context2: EnvironmentalContext): number {
    let similarity = 0
    let factors = 0

    // Weather similarity
    if (context1.weather.type === context2.weather.type) similarity += 0.3
    else if (this.isWeatherSimilar(context1.weather.type, context2.weather.type)) similarity += 0.15
    factors += 0.3

    // Coverage similarity
    if (context1.coverage.cellSignal === context2.coverage.cellSignal) similarity += 0.2
    else if (this.isCoverageSimilar(context1.coverage.cellSignal, context2.coverage.cellSignal)) similarity += 0.1
    factors += 0.2

    // Location similarity
    if (context1.location.region === context2.location.region) similarity += 0.2
    else if (this.isLocationSimilar(context1.location.region, context2.location.region)) similarity += 0.1
    factors += 0.2

    // Time similarity
    if (context1.timeOfDay === context2.timeOfDay) similarity += 0.15
    else if (this.isTimeSimilar(context1.timeOfDay, context2.timeOfDay)) similarity += 0.075
    factors += 0.15

    // Season similarity
    if (context1.season === context2.season) similarity += 0.15
    else if (this.isSeasonSimilar(context1.season, context2.season)) similarity += 0.075
    factors += 0.15

    return similarity / factors
  }

  private isWeatherSimilar(weather1: WeatherCondition["type"], weather2: WeatherCondition["type"]): boolean {
    const similarGroups = [
      ["clear", "cloudy"],
      ["rain", "snow", "storm"],
      ["extreme_heat", "extreme_cold"],
    ]

    return similarGroups.some((group) => group.includes(weather1) && group.includes(weather2))
  }

  private isCoverageSimilar(
    coverage1: CoverageCondition["cellSignal"],
    coverage2: CoverageCondition["cellSignal"],
  ): boolean {
    const similarGroups = [
      ["excellent", "good"],
      ["fair", "poor"],
    ]

    return similarGroups.some((group) => group.includes(coverage1) && group.includes(coverage2))
  }

  private isLocationSimilar(location1: LocationContext["region"], location2: LocationContext["region"]): boolean {
    const similarGroups = [
      ["urban", "suburban"],
      ["rural", "highway"],
      ["remote", "wilderness"],
    ]

    return similarGroups.some((group) => group.includes(location1) && group.includes(location2))
  }

  private isTimeSimilar(time1: EnvironmentalContext["timeOfDay"], time2: EnvironmentalContext["timeOfDay"]): boolean {
    const similarGroups = [
      ["dawn", "morning"],
      ["afternoon", "evening"],
      ["night", "late_night"],
    ]

    return similarGroups.some((group) => group.includes(time1) && group.includes(time2))
  }

  private isSeasonSimilar(season1: EnvironmentalContext["season"], season2: EnvironmentalContext["season"]): boolean {
    const similarGroups = [
      ["spring", "summer"],
      ["fall", "winter"],
    ]

    return similarGroups.some((group) => group.includes(season1) && group.includes(season2))
  }

  private getDefaultEnvironmentalContext(): EnvironmentalContext {
    return {
      weather: {
        type: "clear",
        severity: "light",
        visibility: 5000,
        temperature: 20,
        windSpeed: 10,
        humidity: 50,
      },
      coverage: {
        cellSignal: "good",
        signalStrength: -70,
        networkType: "4G",
        dataSpeed: 25,
        latency: 50,
        reliability: 0.85,
      },
      location: {
        region: "suburban",
        population: 50000,
        nearestTower: 2,
        emergencyServices: 5,
        terrain: "flat",
        infrastructure: "good",
      },
      timeOfDay: "afternoon",
      season: "spring",
      timestamp: new Date(),
      confidence: 0.6,
    }
  }
}

// Export convenience functions
export const getEnvironmentalContext = (lat: number, lng: number) =>
  EnvironmentalContextService.getInstance().getCurrentEnvironmentalContext(lat, lng)

export const calculateEnvironmentalImpact = (context: EnvironmentalContext) =>
  EnvironmentalContextService.getInstance().calculateEnvironmentalImpact(context)

export const calculateEnvironmentalTransferEfficiency = (
  baseEfficiency: number,
  sourceContext: EnvironmentalContext,
  targetContext: EnvironmentalContext,
) =>
  EnvironmentalContextService.getInstance().calculateEnvironmentalTransferEfficiency(
    baseEfficiency,
    sourceContext,
    targetContext,
  )
