# Pricing Configuration Cleanup - Summary

## ✅ What Was Done

### Problem
- Had TWO sources of pricing data causing confusion:
  - `pricing.config.ts` - Old base prices ($49/$149/$499)
  - `pricing.ab-test.ts` - A/B test prices (Variant A: $22/$65/$150, Variant B: $18/$49/$120)
- Google Sheets was receiving WRONG prices (base prices instead of A/B test prices)
- No way to track which A/B variant customers chose

### Solution
**SINGLE SOURCE OF TRUTH**: `src/config/pricing.ab-test.ts`

## 📝 Changes Made

### 1. Enhanced `pricing.ab-test.ts`
- Added all missing fields from old config (icon, displayPrice, period, description, gradient, etc.)
- Added `getPlanById()` helper function
- Added `PRICING_PLANS` export for backward compatibility
- Added clear warning comment: "⚠️ ЕДИНСТВЕННЫЙ ИСТОЧНИК ПРАВДЫ ДЛЯ ЦЕН!"

### 2. Updated All Imports
- ✅ `PricingSection.tsx` - imports from `pricing.ab-test.ts`
- ✅ `CheckoutForm.tsx` - imports `PricingPlan` type from `pricing.ab-test.ts`
- ✅ `PricingCard.tsx` - imports `PricingPlan` type from `pricing.ab-test.ts`

### 3. Simplified PricingSection Logic
**Before:**
```typescript
{PRICING_PLANS.map((plan) => {
  const abPlan = abTestPlans.find(p => p.id === plan.id);
  const priceOverride = abPlan ? {...} : {};
  return <PricingCard plan={{ ...plan, ...translatedPlan, ...priceOverride }} />
})}
```

**After:**
```typescript
{abTestPlans.map((plan) => {
  return <PricingCard plan={{ ...plan, ...translatedPlan }} />
})}
```
No more price overrides! A/B test plans already have correct prices.

### 4. Fixed Google Sheets Integration
Now sends:
- **Correct A/B test price** (not base price)
- **A/B variant** (A or B) for tracking

**Google Sheet Columns:**
```
| Email | Timestamp | Amount | Plan Type | A/B Variant |
|-------|-----------|--------|-----------|-------------|
| ...   | ...       | 49     | Professional | B        |
| ...   | ...       | 65     | Professional | A        |
```

### 5. Deleted Old File
- ❌ Deleted `src/config/pricing.config.ts` completely

### 6. Updated Documentation
- ✅ Updated `PRICING_AB_TESTS.md` with technical implementation details
- ✅ Added warning about single source of truth
- ✅ Documented Google Sheets tracking with A/B variant

## 🎯 Benefits

1. **No More Confusion** - One file, one source of truth
2. **Correct Prices** - Google Sheets gets actual A/B test prices
3. **Better Analytics** - Can track which variant converts better
4. **Cleaner Code** - Simplified PricingSection logic
5. **Easier Maintenance** - Change prices in one place only

## 📊 A/B Test Data Now Includes

Your Google Sheet now captures:
- Which pricing variant customer saw (A or B)
- Actual price they paid ($18/$22 for Starter, $49/$65 for Professional, etc.)
- This allows you to analyze:
  - **Conversion rate** by variant
  - **Revenue** by variant
  - **Plan preference** by variant

## 🚀 How To Use

### To Change Prices:
1. Go to `src/config/pricing.ab-test.ts`
2. Update `VARIANT_A` or `VARIANT_B` arrays
3. That's it! No other files to update.

### To Add New Variant:
1. Add `VARIANT_C` in `pricing.ab-test.ts`
2. Update `getPricingVariant()` to return 'C' based on PostHog flag
3. Update `getPricingPlans()` to include VARIANT_C

### To View Results:
Check your Google Sheet to see which variant performs better!

## ⚠️ Important Notes

- **Do NOT recreate** `pricing.config.ts`
- **Always use** `getPricingPlans()` to get current pricing
- **Never hardcode** prices anywhere else
- **All pricing logic** lives in `pricing.ab-test.ts`

---

**Completed:** 2025-11-04
**Next Time:** If you see duplicate pricing files, remember this cleanup!
