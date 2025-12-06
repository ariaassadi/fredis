export interface TrendData {
  product: string;
  region: string;
  trend: number; // percentage change
  confidence: number; // percentage
}

export interface OpportunityData {
  rank: number;
  description: string;
  profitImpact: number; // in kr
  timeToImplement: string;
  confidence: number; // percentage
}

export interface ExecutionStep {
  step: string;
  eta: string;
  status: "scheduled" | "confirmed" | "en route" | "completed" | "logged";
}

export interface PredictionResult {
  predictedMarginGain: number; // in kr
  realizedMarginGain: number; // in kr
  accuracy: number; // percentage
  sellThroughWeeks: number;
  forecastWeeks: number;
}

export interface ProfitData {
  region: string;
  margin: number; // in kr
  flags: string[];
  forecast: number; // percentage change
}

export interface DashboardSummary {
  profitChange: number; // percentage
  deliveryTimeChange: number; // percentage
  co2Change: number; // percentage
  predictionAccuracy: number; // percentage
  insights: string[];
}

