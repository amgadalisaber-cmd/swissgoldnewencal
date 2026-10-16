# Gold Savings Calculator — Swiss Gold

A one-page English calculator for the Swiss Gold family workshop, in the same colours and font (Poppins) as the presentation.
The visitor picks a daily saving amount and a number of years (1 to 10). The page shows how many grams of 24k gold buying that amount every day, up to October 2026, would have bought, and what that gold is worth today.

## Files

| File | What it is |
|---|---|
| `index.html` | The page: layout, text, links |
| `style.css` | Colors, font, layout |
| `script.js` | Monthly gold prices and the calculation |
| `logo.png` | Swiss Gold logo (must stay in the same folder) |

No build step and no dependencies. The only external resource is the Poppins font from Google Fonts.

## Run it locally

Double-click `index.html`, or from this folder:

```
npx serve .
```

## Publish it (free)

**Vercel**

```
cd ~/Desktop/"Swissgold Workshop"/calculator
npx vercel --prod
```

Log in when the browser opens, accept the defaults, and copy the `.vercel.app` link it prints.

**Netlify (no terminal)**: open https://app.netlify.com/drop and drag this whole folder onto the page.

The QR code on the savings slide of the deck points to https://swissgold-calculator.vercel.app.

## How the calculation works

For every day from 15 October of the chosen start year to 14 Oct 2026:

```
grams += daily_amount / price_of_1g_24k_that_month
paid  += daily_amount
```

- **Value today** = total grams × `NOW`
- **Gain** = value today − paid
- **Multiplier** = value today ÷ paid

Prices exclude making charges and taxes, so the result is an illustration, not a quote.

## Updating the numbers

All numbers live at the top of `script.js`:

- **`NOW`**: Swiss Gold's buy-back price per 24k gram, used for "value today". Currently **7045.71 EGP** (16 Oct 2026).
- **`P`**: one 24k price per month (`"YYYY-MM": price`) from Oct 2016 to Oct 2026. To move forward, add new months and move `END`.
- **`END`**: last day of the history. Months in JavaScript dates start at 0, so `Date.UTC(2026,9,14)` means 14 October 2026.

Update the date and price in the note in `index.html` whenever you change `NOW`.

The earlier Arabic version is in the `calculator-site` folder.

## Price sources

Monthly 24k prices in EGP from local Egyptian market reports (Al Mal, Ahram Online, Al Dostor, Daily News Egypt, Amwal Al Ghad) and pricegold.net for months without a local report.
The full list with a source link for each month is in `gold_history_2016_2026.csv` in the Swissgold Workshop folder. October 2016 uses a 3 Oct pre-float price and February 2018 uses a pricegold.net conversion.

## Links on the page

| | |
|---|---|
| Website | https://www.swissgold.com.eg |
| Instagram | https://www.instagram.com/swissgold.eg |
| Facebook | https://www.facebook.com/swissgold.eg |
| LinkedIn | https://www.linkedin.com/company/swissgold-eg |
| WhatsApp | https://wa.me/201212222280 |
| Hotline | 19215 |

The LinkedIn address was not confirmed. Check it opens the right page before publishing.
