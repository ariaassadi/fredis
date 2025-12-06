import type {
  DashboardSummary,
  ExecutionStep,
  OpportunityData,
  PredictionResult,
  ProfitData,
  TrendData,
} from "./types";

export const INITIAL_TRENDS: TrendData[] = [
  {
    confidence: 98,
    product: "Adidas Superstar",
    region: "Gothenburg",
    trend: 32,
  },
  {
    confidence: 91,
    product: "Nike Air Max",
    region: "Stockholm",
    trend: -18,
  },
  {
    confidence: 88,
    product: "New Balance 550",
    region: "Malmö",
    trend: 12,
  },
];

export const TREND_SUMMARY =
  "Adidas Superstar sales surged 32% in Gothenburg, likely due to local event footfall. Stockholm sales dropped 18% — stock remains high.";

export const PROFITABILITY_FLAGS: ProfitData[] = [
  {
    flags: ["Stockholm: 14,000 kr lost margin last week due to late courier fees"],
    forecast: 15,
    margin: -14000,
    region: "Stockholm",
  },
];

export const OPPORTUNITIES: OpportunityData[] = [
  {
    confidence: 97,
    description:
      "Move 60 pairs of Adidas Superstar (Stockholm → Gothenburg)",
    profitImpact: 11400,
    rank: 1,
    timeToImplement: "1 day",
  },
  {
    confidence: 93,
    description: "Switch Malmö weekend courier to WOLT",
    profitImpact: 3200,
    rank: 2,
    timeToImplement: "Instant",
  },
  {
    confidence: 89,
    description:
      "Redeploy 2 idle staff to pick-pack during weekday afternoons",
    profitImpact: 2900,
    rank: 3,
    timeToImplement: "2 days",
  },
];

export const BEFORE_AFTER_DATA = {
  before: {
    location: "Stockholm",
    markdownRisk: 28,
    stockLevel: "Overstock",
  },
  after: {
    location: "Gothenburg",
    markdownRisk: 0,
    stockLevel: "Optimal",
  },
  predictedResults: {
    marginIncrease: 11400,
    stockTurnover: 37,
    co2Reduction: 480,
    customerSatisfaction: 0.3,
  },
};

export const ACTION_CARD_STEPS = [
  "Allocate stock in ERP",
  "Schedule pickup (Juicy API → WOLT)",
  "Notify both store managers",
  "Auto-adjust stock in POS",
];

export const EXECUTION_TIMELINE: ExecutionStep[] = [
  {
    eta: "09:00",
    status: "scheduled",
    step: "Pick/Pack Stockholm",
  },
  {
    eta: "10:15",
    status: "confirmed",
    step: "Pickup by WOLT",
  },
  {
    eta: "14:45",
    status: "en route",
    step: "Delivery to Gothenburg",
  },
  {
    eta: "15:10",
    status: "completed",
    step: "Stock Received",
  },
  {
    eta: "Next day",
    status: "logged",
    step: "Profit Realized",
  },
];

export const VALIDATION_RESULT: PredictionResult = {
  accuracy: 96,
  forecastWeeks: 1.3,
  predictedMarginGain: 11400,
  realizedMarginGain: 10950,
  sellThroughWeeks: 1.2,
};

export const SUMMARY_INSIGHTS: DashboardSummary = {
  co2Change: -41,
  deliveryTimeChange: -48,
  insights: [
    "Yesterday's action increased total regional profitability by 10.3%.",
    "Gothenburg store now operating at 118% of sales forecast.",
    "Stock markdown risk in Stockholm decreased by 26%.",
    "CO₂ per delivery reduced by 41%.",
    "Model prediction accuracy 96%. Keep trend monitoring active.",
  ],
  predictionAccuracy: 96,
  profitChange: 10.3,
};

