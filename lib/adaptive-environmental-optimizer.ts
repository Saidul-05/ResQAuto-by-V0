// Adaptive Environmental Factor Optimization Engine

import type { EnvironmentalContext, EnvironmentalImpact } from "./environmental-context"

export interface VerificationOutcome {
  id: string
  timestamp: Date
  environmentalContext: EnvironmentalContext
  predictedImpact: EnvironmentalImpact
  actualOutcome: {
    success: boolean
    verificationTime: number // milliseconds
    stressLevel: number // 1-10 scale
    userSatisfaction: number // 1-10 scale
    methodUsed: string
    attemptsRequired: number
    errorType?: string
  }
  userId: string
  emergencyType: string
  location: { lat: number; lng: number }
}

export interface OptimizationMetrics {
  predictionAccuracy: number // 0-1 scale
  averageError: number
  improvementRate: number
  totalOptimizations: number
  lastOptimization: Date
  confidenceLevel: number
}

export interface LearningParameters {
  learningRate: number
  explorationRate: number
  decayRate: number
  minSampleSize: number
  maxAdjustmentPerStep: number
  convergenceThreshold: number
  safetyBounds: {
    minMultiplier: number
    maxMultiplier: number
  }
}

export interface EnvironmentalFactorAdjustment {
  factorType: "weather" | "coverage" | "location" | "time"
  factorName: string
  currentValue: number
  suggestedValue: number
  confidence: number
  sampleSize: number
  improvementPotential: number
  riskLevel: "low" | "medium" | "high"
}

export interface OptimizationSession {
  id: string
  startTime: Date
  endTime?: Date
  status: "active" | "completed" | "paused" | "failed"
  totalAdjustments: number
  performanceImprovement: number
  adjustments: EnvironmentalFactorAdjustment[]
  metrics: OptimizationMetrics
}

// Adaptive Learning Engine
export class AdaptiveEnvironmentalOptimizer {
  private static instance: AdaptiveEnvironmentalOptimizer
  private outcomes: VerificationOutcome[] = []
  private currentSession: OptimizationSession | null = null
  private learningParameters: LearningParameters
  private isOptimizing = false
  private optimizationHistory: OptimizationSession[] = []

  constructor() {
    this.learningParameters = {
      learningRate: 0.01,
      explorationRate: 0.1,
      decayRate: 0.95,
      minSampleSize: 50,
      maxAdjustmentPerStep: 0.1,
      convergenceThreshold: 0.001,
      safetyBounds: {
        minMultiplier: 0.5,
        maxMultiplier: 3.0,
      },
    }
    this.loadHistoricalData()
  }

  static getInstance(): AdaptiveEnvironmentalOptimizer {
    if (!AdaptiveEnvironmentalOptimizer.instance) {
      AdaptiveEnvironmentalOptimizer.instance = new AdaptiveEnvironmentalOptimizer()
    }
    return AdaptiveEnvironmentalOptimizer.instance
  }

  // Start automatic optimization
  async startOptimization(): Promise<OptimizationSession> {
    if (this.isOptimizing) {
      throw new Error("Optimization already in progress")
    }

    this.isOptimizing = true
    this.currentSession = {
      id: `opt_${Date.now()}`,
      startTime: new Date(),
      status: "active",
      totalAdjustments: 0,
      performanceImprovement: 0,
      adjustments: [],
      metrics: {
        predictionAccuracy: 0,
        averageError: 0,
        improvementRate: 0,
        totalOptimizations: 0,
        lastOptimization: new Date(),
        confidenceLevel: 0,
      },
    }

    console.log("🤖 Starting adaptive environmental optimization...")

    // Start optimization loop
    this.runOptimizationLoop()

    return this.currentSession
  }

  // Stop optimization
  stopOptimization(): void {
    if (this.currentSession && this.currentSession.status === "active") {
      this.currentSession.status = "completed"
      this.currentSession.endTime = new Date()
      this.optimizationHistory.push(this.currentSession)
      this.saveOptimizationHistory()
    }
    this.isOptimizing = false
    console.log("🛑 Adaptive optimization stopped")
  }

  // Record verification outcome for learning
  recordOutcome(outcome: VerificationOutcome): void {
    this.outcomes.push(outcome)

    // Keep only recent outcomes (last 10,000)
    if (this.outcomes.length > 10000) {
      this.outcomes = this.outcomes.slice(-10000)
    }

    // Trigger optimization if we have enough data
    if (this.isOptimizing && this.outcomes.length >= this.learningParameters.minSampleSize) {
      this.processNewOutcome(outcome)
    }

    this.saveOutcomes()
  }

  // Get current optimization status
  getOptimizationStatus(): {
    isActive: boolean
    currentSession: OptimizationSession | null
    totalOutcomes: number
    recentPerformance: number
    nextOptimization: Date | null
  } {
    const recentOutcomes = this.outcomes.slice(-100)
    const recentPerformance =
      recentOutcomes.length > 0
        ? recentOutcomes.filter((o) => o.actualOutcome.success).length / recentOutcomes.length
        : 0

    return {
      isActive: this.isOptimizing,
      currentSession: this.currentSession,
      totalOutcomes: this.outcomes.length,
      recentPerformance,
      nextOptimization: this.isOptimizing ? new Date(Date.now() + 300000) : null, // 5 minutes
    }
  }

  // Get optimization recommendations
  getOptimizationRecommendations(): EnvironmentalFactorAdjustment[] {
    if (this.outcomes.length < this.learningParameters.minSampleSize) {
      return []
    }

    const recommendations: EnvironmentalFactorAdjustment[] = []

    // Analyze weather factors
    const weatherRecommendations = this.analyzeWeatherFactors()
    recommendations.push(...weatherRecommendations)

    // Analyze coverage factors
    const coverageRecommendations = this.analyzeCoverageFactors()
    recommendations.push(...coverageRecommendations)

    // Analyze location factors
    const locationRecommendations = this.analyzeLocationFactors()
    recommendations.push(...locationRecommendations)

    // Analyze time factors
    const timeRecommendations = this.analyzeTimeFactors()
    recommendations.push(...timeRecommendations)

    return recommendations.sort((a, b) => b.improvementPotential - a.improvementPotential)
  }

  // Apply optimization recommendations
  async applyOptimizations(adjustments: EnvironmentalFactorAdjustment[]): Promise<void> {
    if (!this.currentSession) {
      throw new Error("No active optimization session")
    }

    for (const adjustment of adjustments) {
      if (adjustment.riskLevel === "low" || adjustment.confidence > 0.8) {
        await this.applyAdjustment(adjustment)
        this.currentSession.adjustments.push(adjustment)
        this.currentSession.totalAdjustments++
      }
    }

    this.updateSessionMetrics()
  }

  // Get performance analytics
  getPerformanceAnalytics(): {
    overallAccuracy: number
    factorAccuracy: Record<string, number>
    improvementTrends: Array<{ date: Date; accuracy: number; performance: number }>
    topPerformingConditions: Array<{ condition: string; successRate: number; sampleSize: number }>
    challengingConditions: Array<{ condition: string; successRate: number; sampleSize: number }>
  } {
    const recentOutcomes = this.outcomes.slice(-1000)

    const overallAccuracy = this.calculatePredictionAccuracy(recentOutcomes)
    const factorAccuracy = this.calculateFactorAccuracy(recentOutcomes)
    const improvementTrends = this.calculateImprovementTrends()
    const topPerformingConditions = this.getTopPerformingConditions()
    const challengingConditions = this.getChallengingConditions()

    return {
      overallAccuracy,
      factorAccuracy,
      improvementTrends,
      topPerformingConditions,
      challengingConditions,
    }
  }

  // Private methods
  private async runOptimizationLoop(): Promise<void> {
    while (this.isOptimizing && this.currentSession?.status === "active") {
      try {
        // Wait for optimization interval (5 minutes)
        await new Promise((resolve) => setTimeout(resolve, 300000))

        if (!this.isOptimizing) break

        // Get recommendations
        const recommendations = this.getOptimizationRecommendations()

        if (recommendations.length > 0) {
          // Apply safe optimizations
          const safeRecommendations = recommendations
            .filter((r) => r.riskLevel === "low" && r.confidence > 0.7)
            .slice(0, 3) // Apply max 3 at a time

          if (safeRecommendations.length > 0) {
            await this.applyOptimizations(safeRecommendations)
            console.log(`🔧 Applied ${safeRecommendations.length} environmental optimizations`)
          }
        }

        // Update learning parameters
        this.updateLearningParameters()
      } catch (error) {
        console.error("Optimization loop error:", error)
        if (this.currentSession) {
          this.currentSession.status = "failed"
        }
        this.isOptimizing = false
      }
    }
  }

  private processNewOutcome(outcome: VerificationOutcome): void {
    // Calculate prediction error
    const predictionError = this.calculatePredictionError(outcome)

    // Update learning based on error
    if (predictionError > 0.2) {
      // Significant error
      this.triggerImmediateAdjustment(outcome)
    }
  }

  private calculatePredictionError(outcome: VerificationOutcome): number {
    const predicted = outcome.predictedImpact
    const actual = outcome.actualOutcome

    // Calculate error in success prediction
    const successError = predicted.successProbability - (actual.success ? 1 : 0)

    // Calculate error in time prediction
    const timeError =
      Math.abs(
        actual.verificationTime / 1000 - predicted.timeMultiplier * 30, // 30s baseline
      ) / 30

    // Calculate error in stress prediction
    const stressError = Math.abs(actual.stressLevel / 10 - (predicted.stressMultiplier - 1))

    return (Math.abs(successError) + timeError + stressError) / 3
  }

  private analyzeWeatherFactors(): EnvironmentalFactorAdjustment[] {
    const adjustments: EnvironmentalFactorAdjustment[] = []
    const weatherTypes = ["clear", "cloudy", "rain", "snow", "fog", "storm", "extreme_heat", "extreme_cold"]

    for (const weatherType of weatherTypes) {
      const weatherOutcomes = this.outcomes.filter((o) => o.environmentalContext.weather.type === weatherType)

      if (weatherOutcomes.length >= 20) {
        // Minimum sample size
        const actualSuccessRate = weatherOutcomes.filter((o) => o.actualOutcome.success).length / weatherOutcomes.length
        const predictedSuccessRate =
          weatherOutcomes.reduce((sum, o) => sum + o.predictedImpact.successProbability, 0) / weatherOutcomes.length

        const error = Math.abs(actualSuccessRate - predictedSuccessRate)

        if (error > 0.1) {
          // Significant error
          const currentMultiplier = this.getCurrentWeatherMultiplier(weatherType)
          const suggestedMultiplier = this.calculateOptimalMultiplier(weatherOutcomes, currentMultiplier)

          adjustments.push({
            factorType: "weather",
            factorName: weatherType,
            currentValue: currentMultiplier,
            suggestedValue: suggestedMultiplier,
            confidence: Math.min(0.9, weatherOutcomes.length / 100),
            sampleSize: weatherOutcomes.length,
            improvementPotential: error,
            riskLevel: this.calculateRiskLevel(error, weatherOutcomes.length),
          })
        }
      }
    }

    return adjustments
  }

  private analyzeCoverageFactors(): EnvironmentalFactorAdjustment[] {
    const adjustments: EnvironmentalFactorAdjustment[] = []
    const signalLevels = ["excellent", "good", "fair", "poor", "none"]

    for (const signalLevel of signalLevels) {
      const coverageOutcomes = this.outcomes.filter((o) => o.environmentalContext.coverage.cellSignal === signalLevel)

      if (coverageOutcomes.length >= 15) {
        const actualSuccessRate =
          coverageOutcomes.filter((o) => o.actualOutcome.success).length / coverageOutcomes.length
        const predictedSuccessRate =
          coverageOutcomes.reduce((sum, o) => sum + o.predictedImpact.successProbability, 0) / coverageOutcomes.length

        const error = Math.abs(actualSuccessRate - predictedSuccessRate)

        if (error > 0.1) {
          const currentMultiplier = this.getCurrentCoverageMultiplier(signalLevel)
          const suggestedMultiplier = this.calculateOptimalMultiplier(coverageOutcomes, currentMultiplier)

          adjustments.push({
            factorType: "coverage",
            factorName: signalLevel,
            currentValue: currentMultiplier,
            suggestedValue: suggestedMultiplier,
            confidence: Math.min(0.9, coverageOutcomes.length / 80),
            sampleSize: coverageOutcomes.length,
            improvementPotential: error,
            riskLevel: this.calculateRiskLevel(error, coverageOutcomes.length),
          })
        }
      }
    }

    return adjustments
  }

  private analyzeLocationFactors(): EnvironmentalFactorAdjustment[] {
    const adjustments: EnvironmentalFactorAdjustment[] = []
    const regions = ["urban", "suburban", "rural", "highway", "remote", "wilderness"]

    for (const region of regions) {
      const locationOutcomes = this.outcomes.filter((o) => o.environmentalContext.location.region === region)

      if (locationOutcomes.length >= 10) {
        const actualSuccessRate =
          locationOutcomes.filter((o) => o.actualOutcome.success).length / locationOutcomes.length
        const predictedSuccessRate =
          locationOutcomes.reduce((sum, o) => sum + o.predictedImpact.successProbability, 0) / locationOutcomes.length

        const error = Math.abs(actualSuccessRate - predictedSuccessRate)

        if (error > 0.1) {
          const currentMultiplier = this.getCurrentLocationMultiplier(region)
          const suggestedMultiplier = this.calculateOptimalMultiplier(locationOutcomes, currentMultiplier)

          adjustments.push({
            factorType: "location",
            factorName: region,
            currentValue: currentMultiplier,
            suggestedValue: suggestedMultiplier,
            confidence: Math.min(0.9, locationOutcomes.length / 50),
            sampleSize: locationOutcomes.length,
            improvementPotential: error,
            riskLevel: this.calculateRiskLevel(error, locationOutcomes.length),
          })
        }
      }
    }

    return adjustments
  }

  private analyzeTimeFactors(): EnvironmentalFactorAdjustment[] {
    const adjustments: EnvironmentalFactorAdjustment[] = []
    const timeSlots = ["dawn", "morning", "afternoon", "evening", "night", "late_night"]

    for (const timeSlot of timeSlots) {
      const timeOutcomes = this.outcomes.filter((o) => o.environmentalContext.timeOfDay === timeSlot)

      if (timeOutcomes.length >= 10) {
        const actualSuccessRate = timeOutcomes.filter((o) => o.actualOutcome.success).length / timeOutcomes.length
        const predictedSuccessRate =
          timeOutcomes.reduce((sum, o) => sum + o.predictedImpact.successProbability, 0) / timeOutcomes.length

        const error = Math.abs(actualSuccessRate - predictedSuccessRate)

        if (error > 0.1) {
          const currentMultiplier = this.getCurrentTimeMultiplier(timeSlot)
          const suggestedMultiplier = this.calculateOptimalMultiplier(timeOutcomes, currentMultiplier)

          adjustments.push({
            factorType: "time",
            factorName: timeSlot,
            currentValue: currentMultiplier,
            suggestedValue: suggestedMultiplier,
            confidence: Math.min(0.9, timeOutcomes.length / 40),
            sampleSize: timeOutcomes.length,
            improvementPotential: error,
            riskLevel: this.calculateRiskLevel(error, timeOutcomes.length),
          })
        }
      }
    }

    return adjustments
  }

  private calculateOptimalMultiplier(outcomes: VerificationOutcome[], currentMultiplier: number): number {
    // Use gradient descent to find optimal multiplier
    let bestMultiplier = currentMultiplier
    let bestError = this.calculateMultiplierError(outcomes, currentMultiplier)

    const stepSize = this.learningParameters.learningRate
    const maxSteps = 100

    for (let step = 0; step < maxSteps; step++) {
      // Try increasing
      const higherMultiplier = bestMultiplier + stepSize
      const higherError = this.calculateMultiplierError(outcomes, higherMultiplier)

      // Try decreasing
      const lowerMultiplier = bestMultiplier - stepSize
      const lowerError = this.calculateMultiplierError(outcomes, lowerMultiplier)

      if (higherError < bestError && higherError < lowerError) {
        bestMultiplier = higherMultiplier
        bestError = higherError
      } else if (lowerError < bestError) {
        bestMultiplier = lowerMultiplier
        bestError = lowerError
      } else {
        break // Converged
      }

      // Apply safety bounds
      bestMultiplier = Math.max(
        this.learningParameters.safetyBounds.minMultiplier,
        Math.min(this.learningParameters.safetyBounds.maxMultiplier, bestMultiplier),
      )
    }

    // Limit adjustment size
    const maxChange = this.learningParameters.maxAdjustmentPerStep
    const change = bestMultiplier - currentMultiplier
    const limitedChange = Math.max(-maxChange, Math.min(maxChange, change))

    return currentMultiplier + limitedChange
  }

  private calculateMultiplierError(outcomes: VerificationOutcome[], multiplier: number): number {
    let totalError = 0

    for (const outcome of outcomes) {
      // Simulate what the prediction would be with this multiplier
      const adjustedPrediction = outcome.predictedImpact.successProbability * (2 - multiplier)
      const actualSuccess = outcome.actualOutcome.success ? 1 : 0
      totalError += Math.abs(adjustedPrediction - actualSuccess)
    }

    return totalError / outcomes.length
  }

  private calculateRiskLevel(error: number, sampleSize: number): "low" | "medium" | "high" {
    if (sampleSize < 20) return "high"
    if (error > 0.3) return "high"
    if (error > 0.15 || sampleSize < 50) return "medium"
    return "low"
  }

  private getCurrentWeatherMultiplier(weatherType: string): number {
    // Get from current environmental settings
    const settings = JSON.parse(localStorage.getItem("environmentalSettings") || "{}")
    return settings.weather?.[weatherType]?.impactMultiplier || 1.0
  }

  private getCurrentCoverageMultiplier(signalLevel: string): number {
    const settings = JSON.parse(localStorage.getItem("environmentalSettings") || "{}")
    return settings.coverage?.impactMultipliers?.[signalLevel] || 1.0
  }

  private getCurrentLocationMultiplier(region: string): number {
    const settings = JSON.parse(localStorage.getItem("environmentalSettings") || "{}")
    return settings.location?.regionMultipliers?.[region] || 1.0
  }

  private getCurrentTimeMultiplier(timeSlot: string): number {
    const settings = JSON.parse(localStorage.getItem("environmentalSettings") || "{}")
    return settings.time?.timeMultipliers?.[timeSlot] || 1.0
  }

  private async applyAdjustment(adjustment: EnvironmentalFactorAdjustment): Promise<void> {
    const settings = JSON.parse(localStorage.getItem("environmentalSettings") || "{}")

    switch (adjustment.factorType) {
      case "weather":
        if (!settings.weather) settings.weather = {}
        if (!settings.weather[adjustment.factorName]) settings.weather[adjustment.factorName] = {}
        settings.weather[adjustment.factorName].impactMultiplier = adjustment.suggestedValue
        break
      case "coverage":
        if (!settings.coverage) settings.coverage = { impactMultipliers: {} }
        settings.coverage.impactMultipliers[adjustment.factorName] = adjustment.suggestedValue
        break
      case "location":
        if (!settings.location) settings.location = { regionMultipliers: {} }
        settings.location.regionMultipliers[adjustment.factorName] = adjustment.suggestedValue
        break
      case "time":
        if (!settings.time) settings.time = { timeMultipliers: {} }
        settings.time.timeMultipliers[adjustment.factorName] = adjustment.suggestedValue
        break
    }

    localStorage.setItem("environmentalSettings", JSON.stringify(settings))
  }

  private triggerImmediateAdjustment(outcome: VerificationOutcome): void {
    // For critical errors, make immediate small adjustments
    const error = this.calculatePredictionError(outcome)

    if (error > 0.4) {
      // Very high error
      console.log("🚨 High prediction error detected, triggering immediate adjustment")

      // Make small conservative adjustment
      const adjustment = this.learningParameters.learningRate * 0.5
      // Apply adjustment logic here
    }
  }

  private updateLearningParameters(): void {
    // Decay exploration rate over time
    this.learningParameters.explorationRate *= this.learningParameters.decayRate
    this.learningParameters.explorationRate = Math.max(0.01, this.learningParameters.explorationRate)

    // Adjust learning rate based on recent performance
    const recentOutcomes = this.outcomes.slice(-100)
    if (recentOutcomes.length > 50) {
      const recentAccuracy = this.calculatePredictionAccuracy(recentOutcomes)
      if (recentAccuracy > 0.9) {
        this.learningParameters.learningRate *= 0.95 // Slow down when performing well
      } else if (recentAccuracy < 0.7) {
        this.learningParameters.learningRate *= 1.05 // Speed up when performing poorly
      }
    }
  }

  private updateSessionMetrics(): void {
    if (!this.currentSession) return

    const recentOutcomes = this.outcomes.slice(-500)
    this.currentSession.metrics = {
      predictionAccuracy: this.calculatePredictionAccuracy(recentOutcomes),
      averageError: this.calculateAverageError(recentOutcomes),
      improvementRate: this.calculateImprovementRate(),
      totalOptimizations: this.currentSession.totalAdjustments,
      lastOptimization: new Date(),
      confidenceLevel: this.calculateConfidenceLevel(recentOutcomes),
    }
  }

  private calculatePredictionAccuracy(outcomes: VerificationOutcome[]): number {
    if (outcomes.length === 0) return 0

    let totalError = 0
    for (const outcome of outcomes) {
      totalError += this.calculatePredictionError(outcome)
    }

    return Math.max(0, 1 - totalError / outcomes.length)
  }

  private calculateAverageError(outcomes: VerificationOutcome[]): number {
    if (outcomes.length === 0) return 0

    let totalError = 0
    for (const outcome of outcomes) {
      totalError += this.calculatePredictionError(outcome)
    }

    return totalError / outcomes.length
  }

  private calculateImprovementRate(): number {
    if (this.optimizationHistory.length < 2) return 0

    const recent = this.optimizationHistory.slice(-2)
    const oldAccuracy = recent[0].metrics.predictionAccuracy
    const newAccuracy = recent[1].metrics.predictionAccuracy

    return newAccuracy - oldAccuracy
  }

  private calculateConfidenceLevel(outcomes: VerificationOutcome[]): number {
    const sampleSize = outcomes.length
    const accuracy = this.calculatePredictionAccuracy(outcomes)

    // Confidence based on sample size and accuracy
    const sizeConfidence = Math.min(1, sampleSize / 1000)
    const accuracyConfidence = accuracy

    return (sizeConfidence + accuracyConfidence) / 2
  }

  private calculateFactorAccuracy(outcomes: VerificationOutcome[]): Record<string, number> {
    const factorAccuracy: Record<string, number> = {}

    // Weather factor accuracy
    const weatherTypes = ["clear", "cloudy", "rain", "snow", "fog", "storm", "extreme_heat", "extreme_cold"]
    for (const weather of weatherTypes) {
      const weatherOutcomes = outcomes.filter((o) => o.environmentalContext.weather.type === weather)
      factorAccuracy[`weather_${weather}`] = this.calculatePredictionAccuracy(weatherOutcomes)
    }

    // Coverage factor accuracy
    const signalLevels = ["excellent", "good", "fair", "poor", "none"]
    for (const signal of signalLevels) {
      const signalOutcomes = outcomes.filter((o) => o.environmentalContext.coverage.cellSignal === signal)
      factorAccuracy[`coverage_${signal}`] = this.calculatePredictionAccuracy(signalOutcomes)
    }

    return factorAccuracy
  }

  private calculateImprovementTrends(): Array<{ date: Date; accuracy: number; performance: number }> {
    const trends: Array<{ date: Date; accuracy: number; performance: number }> = []
    const daysBack = 30
    const now = new Date()

    for (let i = daysBack; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)

      const dayOutcomes = this.outcomes.filter((o) => o.timestamp >= dayStart && o.timestamp < dayEnd)

      if (dayOutcomes.length > 0) {
        const accuracy = this.calculatePredictionAccuracy(dayOutcomes)
        const performance = dayOutcomes.filter((o) => o.actualOutcome.success).length / dayOutcomes.length

        trends.push({ date, accuracy, performance })
      }
    }

    return trends
  }

  private getTopPerformingConditions(): Array<{ condition: string; successRate: number; sampleSize: number }> {
    const conditions: Record<string, { successes: number; total: number }> = {}

    for (const outcome of this.outcomes) {
      const condition = `${outcome.environmentalContext.weather.type}_${outcome.environmentalContext.coverage.cellSignal}_${outcome.environmentalContext.location.region}`

      if (!conditions[condition]) {
        conditions[condition] = { successes: 0, total: 0 }
      }

      conditions[condition].total++
      if (outcome.actualOutcome.success) {
        conditions[condition].successes++
      }
    }

    return Object.entries(conditions)
      .filter(([_, data]) => data.total >= 5) // Minimum sample size
      .map(([condition, data]) => ({
        condition,
        successRate: data.successes / data.total,
        sampleSize: data.total,
      }))
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 10)
  }

  private getChallengingConditions(): Array<{ condition: string; successRate: number; sampleSize: number }> {
    const topConditions = this.getTopPerformingConditions()
    return topConditions.sort((a, b) => a.successRate - b.successRate).slice(0, 10)
  }

  private loadHistoricalData(): void {
    try {
      const stored = localStorage.getItem("adaptiveOptimizationOutcomes")
      if (stored) {
        this.outcomes = JSON.parse(stored).map((o: any) => ({
          ...o,
          timestamp: new Date(o.timestamp),
        }))
      }

      const historyStored = localStorage.getItem("optimizationHistory")
      if (historyStored) {
        this.optimizationHistory = JSON.parse(historyStored).map((s: any) => ({
          ...s,
          startTime: new Date(s.startTime),
          endTime: s.endTime ? new Date(s.endTime) : undefined,
        }))
      }
    } catch (error) {
      console.error("Error loading historical data:", error)
    }
  }

  private saveOutcomes(): void {
    try {
      localStorage.setItem("adaptiveOptimizationOutcomes", JSON.stringify(this.outcomes))
    } catch (error) {
      console.error("Error saving outcomes:", error)
    }
  }

  private saveOptimizationHistory(): void {
    try {
      localStorage.setItem("optimizationHistory", JSON.stringify(this.optimizationHistory))
    } catch (error) {
      console.error("Error saving optimization history:", error)
    }
  }
}

// Export convenience functions
export const startAdaptiveOptimization = () => AdaptiveEnvironmentalOptimizer.getInstance().startOptimization()

export const stopAdaptiveOptimization = () => AdaptiveEnvironmentalOptimizer.getInstance().stopOptimization()

export const recordVerificationOutcome = (outcome: VerificationOutcome) =>
  AdaptiveEnvironmentalOptimizer.getInstance().recordOutcome(outcome)

export const getOptimizationStatus = () => AdaptiveEnvironmentalOptimizer.getInstance().getOptimizationStatus()

export const getOptimizationRecommendations = () =>
  AdaptiveEnvironmentalOptimizer.getInstance().getOptimizationRecommendations()

export const getPerformanceAnalytics = () => AdaptiveEnvironmentalOptimizer.getInstance().getPerformanceAnalytics()
