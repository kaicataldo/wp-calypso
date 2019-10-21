# localize-monetary-amount

Locale- (language and geo) and currency-aware formatting of exact monetary amounts.

What this package does:
  * Number localization (separator symbols, grouping conventions)
  * Exact arithmetic with all digits of precision. No floats.
  * Designed for displaying product prices in catalogs, carts, checkout, and receipts.
  * No dependencies
  
What this package doesn't do:
  * Localize digit symbols (Hindu-Arabic digits only)
  * Take options. Locale preferences are hardcoded. Please submit a PR if a locale looks off.

## Example usage

You'll need:
  * An ISO 631-1 language code with an optional ISO 3166-1 alpha-2 region code, separated by a hyphen. Examples: `en`, `en-gb`, `fr-be`.
  * An ISO 4217 currency code. Examples: 'USD', 'JPY', 'BRL'.
  * An integer number of _minor units_. This is the minimal unit of your currency; e.g. cents for USD, yen for JPY.

By default, if the fractional part is zero it is omitted unless the locale prefers otherwise.

```js
import localizeMonetaryAmount from 'localize-monetary-amount';

// Strip zero minor units:
localizeMonetaryAmount( 'en-us', 'USD', 500 ); // '$5'

// Non-breaking spaces:
localizeMonetaryAmount( 'fr-ca', 'CAD', 500000 ); // '$5\u00A0000\u00A0CAD'
```
