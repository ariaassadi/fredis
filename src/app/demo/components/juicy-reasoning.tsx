"use client";

import { useCallback, useEffect, useState } from "react";

import { MessageAccordion } from "./message-accordion";
import { ResultsTable } from "./results-table";
import { SupplierLogos } from "./supplier-logos";

interface Message {
  delay?: number;
  description?: string;
  id: string;
  showLogos?: boolean;
  showTable?: boolean;
  text: string;
  type: "calculation" | "complete" | "result";
}

// excel data for "smartphone pro max" from kista row
const SMARTPHONE_PRO_MAX_DATA = {
  location: "Kista",
  mav: 15000, // moving average value
  monthsOld: 7,
  provision: 30, // percentage
  stock: 230,
};

// excel data for "wireless headphones" from malmö row
const WIRELESS_HEADPHONES_DATA = {
  location: "Malmö",
  mav: 5000, // moving average value
  monthsOld: 24,
  provision: 80, // percentage
  stock: 42,
};

// nike air max data from weekend delivery scenario
const NIKE_AIR_MAX_DATA = {
  bestCost: 150.5, // kr
  centralCost: 204, // kr
  co2: 110, // grams
  courier: "WOLT",
  deliveryTime: "Saturday 16:40",
  distance: 3.2, // km
  location: "Gränby Centrum",
  savings: 54, // kr
  stock: 5,
};

const defaultMessages: Message[] = [
  {
    delay: 4000,
    description:
      "Checking availability and inventory status at the central warehouse to ensure fast delivery.",
    id: "1",
    text: "Checking inventory status at the central warehouse",
    type: "calculation",
  },
  {
    delay: 4500,
    description:
      "Analyzing prices from multiple suppliers to find the most cost-effective solution.",
    id: "2",
    showLogos: true,
    text: "Calculating packaging costs from 12 different suppliers",
    type: "calculation",
  },
  {
    delay: 3500,
    description:
      "Compiling all available options from the central warehouse with calculated costs.",
    id: "3",
    text: "Compiling options from the central warehouse",
    type: "calculation",
  },
  {
    delay: 4000,
    description:
      "Searching for nearby physical stores that have the products in stock for faster delivery.",
    id: "4",
    text: "Looking for physical stores with products in stock",
    type: "calculation",
  },
  {
    delay: 1500,
    description:
      "Found several stores with products available - now analyzing costs and delivery times.",
    id: "5",
    text: "Found 4 nearby stores with products in stock",
    type: "result",
  },
  {
    delay: 3500,
    description:
      "Checking active campaigns and offers that can reduce total costs.",
    id: "6",
    text: "Looking for campaigns",
    type: "calculation",
  },
  {
    delay: 3500,
    description:
      "Calculating personnel costs for order handling and the delivery process.",
    id: "7",
    text: "Calculating personnel costs",
    type: "calculation",
  },
  {
    delay: 4000,
    description:
      "Compiling all options from stores with detailed cost calculations.",
    id: "8",
    showTable: true,
    text: "Compiling options from stores",
    type: "calculation",
  },
  {
    delay: 2000,
    description:
      "Optimal solution found! Volt from Gränby Centrum offers the best price with fast delivery.",
    id: "9",
    text: "Optimal solution found! Volt from Gränby Centrum is 20 kr cheaper",
    type: "complete",
  },
];

const smartphoneMessages: Message[] = [
  {
    delay: 4000,
    description:
      "Checking availability and inventory status at the central warehouse to ensure fast delivery.",
    id: "1",
    text: "Checking inventory status at the central warehouse",
    type: "calculation",
  },
  {
    delay: 4500,
    description:
      "Analyzing prices from multiple suppliers to find the most cost-effective solution.",
    id: "2",
    showLogos: true,
    text: "Calculating packaging costs from 15 different suppliers",
    type: "calculation",
  },
  {
    delay: 3500,
    description:
      "Compiling all available options from the central warehouse with calculated costs.",
    id: "3",
    text: "Compiling options from the central warehouse",
    type: "calculation",
  },
  {
    delay: 4000,
    description:
      "Searching for nearby physical stores that have the products in stock for faster delivery.",
    id: "4",
    text: "Looking for physical stores with products in stock",
    type: "calculation",
  },
  {
    delay: 1500,
    description:
      "Found stores in Kista with products available - now analyzing costs and delivery times.",
    id: "5",
    text: "Found options in Kista with products in stock",
    type: "result",
  },
  {
    delay: 3500,
    description:
      "Calculating costs based on MAV (Moving Average Value) and Provision to optimize delivery.",
    id: "6",
    text: "Calculating costs based on MAV and Provision",
    type: "calculation",
  },
  {
    delay: 3500,
    description: `Analyzing stock balance and age (${SMARTPHONE_PRO_MAX_DATA.monthsOld} months) to find the best delivery solution.`,
    id: "7",
    text: `Analyzing stock balance and age (${SMARTPHONE_PRO_MAX_DATA.monthsOld} months)`,
    type: "calculation",
  },
  {
    delay: 4000,
    description:
      "Compiling all options from stores with detailed cost calculations.",
    id: "8",
    showTable: true,
    text: "Compiling options from stores",
    type: "calculation",
  },
  {
    delay: 2000,
    description: `Optimal solution found! Volt from Kista offers the best price (MAV: ${SMARTPHONE_PRO_MAX_DATA.mav.toLocaleString(
      "en-US"
    )} kr, Provision: ${SMARTPHONE_PRO_MAX_DATA.provision}%).`,
    id: "9",
    text: `Optimal solution found! Volt from Kista is cheaper (MAV: ${SMARTPHONE_PRO_MAX_DATA.mav.toLocaleString(
      "en-US"
    )} kr, Provision: ${SMARTPHONE_PRO_MAX_DATA.provision}%)`,
    type: "complete",
  },
];

const wirelessHeadphonesMessages: Message[] = [
  {
    delay: 4000,
    description:
      "Checking availability and inventory status at the central warehouse to ensure fast delivery.",
    id: "1",
    text: "Checking inventory status at the central warehouse",
    type: "calculation",
  },
  {
    delay: 4500,
    description:
      "Analyzing prices from multiple suppliers to find the most cost-effective solution.",
    id: "2",
    showLogos: true,
    text: "Calculating packaging costs from 15 different suppliers",
    type: "calculation",
  },
  {
    delay: 3500,
    description:
      "Compiling all available options from the central warehouse with calculated costs.",
    id: "3",
    text: "Compiling options from the central warehouse",
    type: "calculation",
  },
  {
    delay: 4000,
    description:
      "Searching for nearby physical stores that have the products in stock for faster delivery.",
    id: "4",
    text: "Looking for physical stores with products in stock",
    type: "calculation",
  },
  {
    delay: 1500,
    description:
      "Found stores in Malmö with products available - now analyzing costs and delivery times.",
    id: "5",
    text: "Found options in Malmö with products in stock",
    type: "result",
  },
  {
    delay: 3500,
    description:
      "Calculating costs based on MAV (Moving Average Value) and Provision to optimize delivery.",
    id: "6",
    text: "Calculating costs based on MAV and Provision",
    type: "calculation",
  },
  {
    delay: 3500,
    description: `Analyzing stock balance and age (${WIRELESS_HEADPHONES_DATA.monthsOld} months) to find the best delivery solution.`,
    id: "7",
    text: `Analyzing stock balance and age (${WIRELESS_HEADPHONES_DATA.monthsOld} months)`,
    type: "calculation",
  },
  {
    delay: 4000,
    description:
      "Compiling all options from stores with detailed cost calculations.",
    id: "8",
    showTable: true,
    text: "Compiling options from stores",
    type: "calculation",
  },
  {
    delay: 2000,
    description: `Optimal solution found! Volt from Malmö offers the best price (MAV: ${WIRELESS_HEADPHONES_DATA.mav.toLocaleString(
      "en-US"
    )} kr, Provision: ${WIRELESS_HEADPHONES_DATA.provision}%).`,
    id: "9",
    text: `Optimal solution found! Volt from Malmö is cheaper (MAV: ${WIRELESS_HEADPHONES_DATA.mav.toLocaleString(
      "en-US"
    )} kr, Provision: ${WIRELESS_HEADPHONES_DATA.provision}%)`,
    type: "complete",
  },
];

const nikeAirMaxMessages: Message[] = [
  {
    delay: 4000,
    description:
      "Checking availability at central warehouse - found 17 units available, but delivery would be Monday 15:00 (not optimal for weekend order).",
    id: "1",
    text: "Checking inventory status at the central warehouse",
    type: "calculation",
  },
  {
    delay: 4500,
    description:
      "Analyzing prices from multiple suppliers to find the most cost-effective solution.",
    id: "2",
    showLogos: true,
    text: "Calculating packaging costs from 10 different suppliers",
    type: "calculation",
  },
  {
    delay: 3500,
    description:
      "Analyzing weekend delivery options from central warehouse - traditional couriers (PostNord, UPS, DHL) unavailable on weekends. Central warehouse delivery would be Monday, not suitable for same-day needs.",
    id: "3",
    text: "Analyzing weekend delivery options from central warehouse",
    type: "calculation",
  },
  {
    delay: 4000,
    description:
      "Searching for nearby physical stores that have the products in stock for faster weekend delivery.",
    id: "4",
    text: "Searching physical stores with product in stock",
    type: "calculation",
  },
  {
    delay: 1500,
    description:
      "Found 4 nearby stores with products available - now analyzing costs and delivery times for weekend delivery.",
    id: "5",
    text: "Found 4 nearby stores with products in stock",
    type: "result",
  },
  {
    delay: 3500,
    description:
      "Evaluating campaigns and pricing to ensure the best possible profitability.",
    id: "6",
    text: "Evaluating campaign and pricing conditions",
    type: "calculation",
  },
  {
    delay: 3500,
    description:
      "Calculating staff and handling costs per store to find the most cost-effective option.",
    id: "7",
    text: "Calculating staff and handling costs per store",
    type: "calculation",
  },
  {
    delay: 4000,
    description:
      "Evaluating weekend courier availability - WOLT is available with an electric moped fleet for fast and environmentally friendly delivery.",
    id: "8",
    text: "Evaluating weekend courier availability (WOLT)",
    type: "calculation",
  },
  {
    delay: 4000,
    description:
      "Compiling all options from stores with detailed cost calculations. Gränby Centrum: 150.5 kr total cost, 110g CO₂ (vs 920g from central warehouse - 88% reduction).",
    id: "9",
    showTable: true,
    text: "Compiling options from stores",
    type: "calculation",
  },
  {
    delay: 2000,
    description: `Optimal solution found! ${NIKE_AIR_MAX_DATA.courier} from ${NIKE_AIR_MAX_DATA.location} selected due to: weekend courier availability, lowest total cost (${NIKE_AIR_MAX_DATA.bestCost} kr), lowest CO₂ footprint, and full-price sale. Saves ${NIKE_AIR_MAX_DATA.savings} kr vs central warehouse and delivers same-day.`,
    id: "10",
    text: `Optimal solution found! WOLT from ${NIKE_AIR_MAX_DATA.location} saves ${NIKE_AIR_MAX_DATA.savings} kr vs central warehouse and delivers same-day`,
    type: "complete",
  },
];

interface JuicyReasoningProps {
  isNikeAirMax?: boolean;
  isSmartphoneProMax?: boolean;
  isWirelessHeadphones?: boolean;
  onCalculationStateChange?: (isRunning: boolean, showResultsTable: boolean) => void;
  selectedDeliveryId?: string;
}

export function JuicyReasoning({
  isNikeAirMax = false,
  isSmartphoneProMax = false,
  isWirelessHeadphones = false,
  onCalculationStateChange,
  selectedDeliveryId,
}: JuicyReasoningProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeMessage, setActiveMessage] = useState<null | string>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showResultsTable, setShowResultsTable] = useState(false);
  const [showLogos, setShowLogos] = useState(false);
  const [completedMessages, setCompletedMessages] = useState<Set<string>>(
    () => new Set()
  );

  const startCalculations = useCallback(
    (
      useSmartphoneData = false,
      useHeadphonesData = false,
      useNikeData = false
    ) => {
      setIsRunning(true);
      setMessages([]);
      setShowResultsTable(false);
      setShowLogos(false);
      setCompletedMessages(new Set());

      const messagesToUse = useSmartphoneData
        ? smartphoneMessages
        : useHeadphonesData
        ? wirelessHeadphonesMessages
        : useNikeData
        ? nikeAirMaxMessages
        : defaultMessages;
      let currentIndex = 0;

      const processNextMessage = () => {
        if (currentIndex >= messagesToUse.length) {
          setIsRunning(false);
          setShowResultsTable(true);
          return;
        }

        const message = messagesToUse[currentIndex];
        setActiveMessage(message.id);

        // Add special effects for specific messages
        if (message.showLogos) {
          setTimeout(() => {
            setShowLogos(true);
            setTimeout(() => {
              setShowLogos(false);
            }, 2000);
          }, 1000);
        }

        if (message.showTable) {
          setTimeout(() => {
            setShowResultsTable(true);
          }, message.delay! - 500);
        }

        setTimeout(() => {
          setMessages((prev) => [...prev, message]);
          setCompletedMessages((prev) => new Set([message.id, ...prev]));
          setActiveMessage(null);
          currentIndex++;
          processNextMessage();
        }, message.delay || 1000);
      };

      processNextMessage();
    },
    []
  );

  // notify parent of calculation state changes
  useEffect(() => {
    if (onCalculationStateChange) {
      onCalculationStateChange(isRunning, showResultsTable);
    }
  }, [isRunning, showResultsTable, onCalculationStateChange]);

  // trigger calculations when product type props change
  useEffect(() => {
    if (isSmartphoneProMax || isWirelessHeadphones || isNikeAirMax) {
      startCalculations(isSmartphoneProMax, isWirelessHeadphones, isNikeAirMax);
    }
  }, [isSmartphoneProMax, isWirelessHeadphones, isNikeAirMax, startCalculations]);

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {messages.length === 0 && !isRunning && (
          <div className="mt-6 text-center text-muted-foreground">
            <p>
              Click "Go to checkout" on the side to see Juicy's optimizations in
              real time!
            </p>
          </div>
        )}

        {messages.map((message) => (
          <MessageAccordion
            isActive={activeMessage === message.id}
            isCompleted={completedMessages.has(message.id)}
            isNikeAirMax={isNikeAirMax}
            isSmartphoneProMax={isSmartphoneProMax}
            isWirelessHeadphones={isWirelessHeadphones}
            key={message.id}
            message={message}
          />
        ))}

        {/* Active Message */}
        {activeMessage && (
          <MessageAccordion
            isActive={true}
            isCompleted={false}
            isNikeAirMax={isNikeAirMax}
            isSmartphoneProMax={isSmartphoneProMax}
            isWirelessHeadphones={isWirelessHeadphones}
            message={
              (isSmartphoneProMax
                ? smartphoneMessages
                : isWirelessHeadphones
                ? wirelessHeadphonesMessages
                : isNikeAirMax
                ? nikeAirMaxMessages
                : defaultMessages
              ).find((m) => m.id === activeMessage)!
            }
          />
        )}

        {/* Supplier Logos Animation */}
        {showLogos && <SupplierLogos className="mt-3" />}

        {/* Results Table */}
        {showResultsTable && (
          <ResultsTable
            className="mt-3"
            isNikeAirMax={isNikeAirMax}
            isSmartphoneProMax={isSmartphoneProMax}
            isWirelessHeadphones={isWirelessHeadphones}
            selectedDeliveryId={selectedDeliveryId}
          />
        )}
      </div>
    </div>
  );
}
