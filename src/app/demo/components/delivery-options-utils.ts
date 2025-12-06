import type { DeliveryOption } from "./delivery-options";

// excel data for smartphone pro max (kista row)
const SMARTPHONE_DATA = {
  location: "Kista",
  mav: 15000,
  monthsOld: 7,
  provision: 30,
  stock: 230,
};

// excel data for wireless headphones (malmö row)
const WIRELESS_HEADPHONES_DATA = {
  location: "Malmö",
  mav: 5000,
  monthsOld: 24,
  provision: 80,
  stock: 42,
};

// nike air max data from weekend delivery scenario
const NIKE_AIR_MAX_DATA = {
  location: "Gränby Centrum",
  bestCost: 150.5,
  centralCost: 204,
  savings: 54,
  courier: "WOLT",
};

// calculate delivery cost from mav and provision
// higher provision and reasonable mav = better discount on delivery
function calculateDeliveryCost(
  mav: number,
  provision: number,
  centrallagerCost: number
): number {
  // provision-based discount scaled by mav
  // higher mav + provision = better delivery optimization
  const discount = (provision / 100) * (mav / 300);
  return Math.round(centrallagerCost - Math.min(discount, 50)); // cap discount at 50 kr
}

export interface ProductTypeFlags {
  isSmartphoneProMax?: boolean;
  isWirelessHeadphones?: boolean;
  isNikeAirMax?: boolean;
}

export function getDeliveryOptions(
  flags: ProductTypeFlags
): DeliveryOption[] {
  const {
    isSmartphoneProMax = false,
    isWirelessHeadphones = false,
    isNikeAirMax = false,
  } = flags;

  let centrallagerCost: number;
  let bestCost: number;
  let bestLocation: string;
  let courierName: string;
  let showPickupOption: boolean;

  if (isSmartphoneProMax) {
    centrallagerCost = 149;
    const calculatedBestCost = calculateDeliveryCost(
      SMARTPHONE_DATA.mav,
      SMARTPHONE_DATA.provision,
      centrallagerCost
    );
    const totalSavings = centrallagerCost - calculatedBestCost;
    const customerSavings = Math.round(totalSavings / 2);
    bestCost = Math.round(centrallagerCost - customerSavings);
    bestLocation = SMARTPHONE_DATA.location;
    courierName = "Volt";
    showPickupOption = false;
  } else if (isWirelessHeadphones) {
    centrallagerCost = 149;
    const calculatedBestCost = calculateDeliveryCost(
      WIRELESS_HEADPHONES_DATA.mav,
      WIRELESS_HEADPHONES_DATA.provision,
      centrallagerCost
    );
    const totalSavings = centrallagerCost - calculatedBestCost;
    const customerSavings = Math.round(totalSavings / 2);
    bestCost = Math.round(centrallagerCost - customerSavings);
    bestLocation = WIRELESS_HEADPHONES_DATA.location;
    courierName = "Volt";
    showPickupOption = false;
  } else if (isNikeAirMax) {
    centrallagerCost = Math.round(NIKE_AIR_MAX_DATA.centralCost);
    const calculatedBestCost = NIKE_AIR_MAX_DATA.bestCost;
    const totalSavings = centrallagerCost - calculatedBestCost;
    const customerSavings = Math.round(totalSavings / 2);
    bestCost = Math.round(centrallagerCost - customerSavings);
    bestLocation = NIKE_AIR_MAX_DATA.location;
    courierName = NIKE_AIR_MAX_DATA.courier;
    showPickupOption = false;
  } else {
    centrallagerCost = 149;
    const calculatedBestCost = 119; // default gränby cost
    const totalSavings = centrallagerCost - calculatedBestCost;
    const customerSavings = Math.round(totalSavings / 2);
    bestCost = Math.round(centrallagerCost - customerSavings);
    bestLocation = "Gränby Centrum";
    courierName = "Volt";
    showPickupOption = true;
  }

  const options: DeliveryOption[] = [
    {
      id: "central-warehouse",
      name: "UPS from central warehouse",
      price: Math.round(centrallagerCost),
      isRecommended: false,
    },
    {
      id: "best-option",
      name: `${courierName} from ${bestLocation}`,
      price: Math.round(centrallagerCost),
      discountedPrice: Math.round(bestCost),
      location: bestLocation,
      isRecommended: true,
    },
  ];

  if (showPickupOption) {
    options.push({
      id: "pickup-granby",
      name: "Pickup at Gränby",
      price: Math.round(99),
      isRecommended: false,
    });
  }

  return options;
}

export function getJuicyProfit(flags: ProductTypeFlags): number {
  const {
    isSmartphoneProMax = false,
    isWirelessHeadphones = false,
    isNikeAirMax = false,
  } = flags;

  let centrallagerCost: number;
  let calculatedBestCost: number;

  if (isSmartphoneProMax) {
    centrallagerCost = 149;
    calculatedBestCost = calculateDeliveryCost(
      SMARTPHONE_DATA.mav,
      SMARTPHONE_DATA.provision,
      centrallagerCost
    );
  } else if (isWirelessHeadphones) {
    centrallagerCost = 149;
    calculatedBestCost = calculateDeliveryCost(
      WIRELESS_HEADPHONES_DATA.mav,
      WIRELESS_HEADPHONES_DATA.provision,
      centrallagerCost
    );
  } else if (isNikeAirMax) {
    centrallagerCost = Math.round(NIKE_AIR_MAX_DATA.centralCost);
    calculatedBestCost = NIKE_AIR_MAX_DATA.bestCost;
  } else {
    centrallagerCost = 149;
    calculatedBestCost = 119; // default gränby cost
  }

  const totalSavings = centrallagerCost - calculatedBestCost;
  const customerSavings = Math.round(totalSavings / 2);
  const juicyProfit = totalSavings - customerSavings;

  return Math.round(juicyProfit);
}
