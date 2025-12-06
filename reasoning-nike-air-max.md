Juicy Demo — “From Order to Delivery”
Scenario: Saturday Afternoon Order in Uppsala

Customer places order online (Saturday 14:37)
Product: Nike Air Max 270, White/Black
Delivery address: Uppsala City Centre
Checkout shows: “AI is finding your fastest and greenest delivery option…”
Timestamp triggers weekend fulfillment mode (AI uses weekend-specific cost & courier data).
Analyses customer location and delivery window
Coordinates and postal zone fetched from Klarna API.
AI categorizes order type: Same-day eligible (within 25 km radius).
Weekend rules loaded: Traditional couriers (PostNord, UPS) unavailable.

Checks product availability in central warehouse
Query → Central DC: Stock: 17 units available.
Warehouse SLA: Next pickup Monday morning 08:00 → ETA Monday 15:00.
Delivery delay detected → not optimal for weekend order.

Calculates packaging and handling costs from central warehouse
Pulls rates from 12 suppliers: corrugated box, label, filler.
Median cost: 11 SEK/package, handling time 12 min/order.
Labor rate: 220 SEK/h → Handling cost = 44 SEK.





 Generates warehouse delivery alternative summary
Option
ETA
Cost
Notes
Central Warehouse → UPS
Monday 15:00
149 SEK
No weekend delivery


Searches physical stores with product in stock
Real-time inventory fetched from 28 partner stores within 50 km radius.
AI filters: SKU exact match, size availability, open hours, staff capacity.

Finds 4 stores nearby with stock
Store
Distance
Stock
Open hours
Available staff
Gränby Centrum
3.2 km
5 units
10:00–18:00
2 idle staff
Uppsala City
5.8 km
8 units
10:00–17:00
1 idle staff
Sports City
2.7 km
2 units
10:00–19:00
busy
Flagship Boutique
4.1 km
1 unit
11:00–15:00
closing soon


Evaluates campaign and pricing conditions
Fetches live promo data from each retailer.
Gränby Centrum has no markdowns (full margin maintained).
Uppsala City has 10% weekend promo → reduces profitability.

Calculates staff and handling cost per store
Pulls staff schedule and event forecast.
Gränby Centrum: 2 idle staff, average wage 210 SEK/h.
Estimated pick/pack time 9 min/order → 31.5 SEK staff cost.



Computes CO₂ footprint and delivery distance for each option

Uses route matrix and courier database.
| Option | Distance | CO₂ (g) | Delivery Time | Courier Availability |
|---------|-----------|----------|----------------|----------------------|
| Central DC | 78 km | 920 g | Monday | Weekend unavailable |
| Gränby | 3.2 km | 110 g | 45 min |  WOLT active |
| Sport City | 5.8 km | 200 g | 90 min | WOLT active |

AI evaluates delivery providers (courier selection)
Weekend mode filters out PostNord, UPS, DHL.
Remaining couriers: WOLT, Budbee Evening, Airmee Express.
WOLT wins:
SLA: 60–90 min delivery
Weekend support: YES
CO₂ class: Electric moped fleet
Cost: 69 SEK/order

AI runs total cost simulation for each store alternative
Source
Product margin
Handling
Courier
Total
ETA
CO₂
Status
Central DC
+250 SEK
+55 SEK
+149 SEK
+204 SEK
Mon 15:00
920 g
Slow
Gränby
+250 SEK
+31.5 SEK
+69 SEK
+150.5 SEK
Sat 16:40
110 g
 Optimal
Sport City
+225 SEK
+35 SEK
+69 SEK
+171 SEK
Sat 17:30
200 g
 Backup




AI selects optimal fulfillment source → Gränby Centrum
Reason: Weekend courier availability, lowest total cost, lowest CO₂, full price sale.
“ Optimal solution found: Gränby Centrum saves 54 SEK vs central warehouse and delivers sameday via WOLT.”

Triggers fulfillment workflow at Gränby store
Creates pick ticket → staff mobile app.
Estimated pick time: 9 min.
Sends push: “New online order — pick and pack by 15:10.”
AI monitors live store activity to ensure not interrupting in-store customers.
Order picked and confirmed (15:08)
Barcode scanned, stock updated in POS & e-commerce.
AI auto-generates WOLT handover code + QR label.

AI books courier automatically (15:10)
API call to WOLT → creates same-day delivery task.
Estimated pickup: 15:25, ETA 16:10.
Customer notified via Klarna app:
“Your order is on its way — delivered by WOLT today.”

Live tracking and coordination
Map widget shows courier en route.
AI monitors delays and reroutes if >10 min late.
Actual pickup: 15:23, delivery 16:04 → within SLA.

Delivery completed (16:04)
Customer confirms receipt via app.
AI logs actual cost, time, and courier feedback to analytics layer.

Post-order analytics and reporting
Metric
Result
Improvement vs baseline
Total cost/order
150.5 SEK
−32%
Delivery time
1h 27min
−91%
CO₂ footprint
110 g
−88%
Weekend SLA coverage
100%
Previously 0%
Customer rating
4.9/5
+0.6 improvement


Dashboard summary for retailer
“Juicy AI Results – Weekend Fulfillment Optimization”
 Store used: Gränby Centrum
 Courier: WOLT (electric moped)
 Total fulfillment time: 87 min
 Savings vs warehouse delivery: 54 SEK/order
 CO₂ reduction: 810 g saved
 Delivery window expanded: “Now delivering weekends”
 Utilized idle staff time: +15% productive hours

System recommendation for operations
“Enable WOLT as preferred weekend courier for Uppsala region.
Reallocate 10 more SKUs to Gränby for faster weekend delivery fulfillment.”

