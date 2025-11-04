/**
 * Debug panel для отображения информации о PostHog Feature Flags
 * Показывает текущий вариант A/B теста и цены
 */

import { useState, useEffect } from 'react';
import { posthog } from '../analytics/posthog.config';
import { getPricingVariant, getPricingPlans } from '../config/pricing.ab-test';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X, RefreshCw, Check, AlertCircle } from 'lucide-react';

export default function PostHogDebugPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [flagValue, setFlagValue] = useState<any>(null);
  const [variant, setVariant] = useState<'A' | 'B'>('A');
  const [isPostHogLoaded, setIsPostHogLoaded] = useState(false);
  const [allFlags, setAllFlags] = useState<Record<string, any>>({});

  const loadFlagData = () => {
    // Проверяем, загружен ли PostHog
    const loaded = posthog && posthog.__loaded;
    setIsPostHogLoaded(loaded);

    if (loaded) {
      // Получаем конкретный флаг
      const flag = posthog.getFeatureFlag('pricing_test');
      setFlagValue(flag);

      // Получаем все флаги
      try {
        const flags = posthog.getFeatureFlagPayloads?.() || {};
        setAllFlags(flags);
      } catch (e) {
        setAllFlags({});
      }

      // Получаем вариант
      const currentVariant = getPricingVariant();
      setVariant(currentVariant);
    }
  };

  useEffect(() => {
    // Загружаем данные сразу
    loadFlagData();

    // Подписываемся на событие загрузки флагов
    posthog.onFeatureFlags(() => {
      console.log('🎌 PostHog Feature Flags Loaded!');
      loadFlagData();
    });
  }, []);

  if (!isOpen) return null;

  const plans = getPricingPlans();

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        left: '20px',
        zIndex: 9999,
        maxWidth: '400px',
      }}
    >
      <Card className="bg-black/90 backdrop-blur-xl border-2 border-yellow-400 text-white p-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isPostHogLoaded ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            <h3 className="font-bold text-lg">🧪 PostHog Debug</h3>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={loadFlagData}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* PostHog Status */}
        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            {isPostHogLoaded ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-400">PostHog Loaded</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-red-400">PostHog Not Loaded</span>
              </>
            )}
          </div>
          {!isPostHogLoaded && (
            <p className="text-xs text-gray-400">
              Check console for errors or wait a moment...
            </p>
          )}
        </div>

        {/* Feature Flag Info */}
        <div className="space-y-3">
          <div className="p-3 bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Feature Flag Key:</div>
            <div className="font-mono text-sm text-yellow-300">pricing_test</div>
          </div>

          <div className="p-3 bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Raw Flag Value:</div>
            <div className="font-mono text-sm text-purple-300">
              {flagValue === null ? 'null' : flagValue === undefined ? 'undefined' : String(flagValue)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Type: {typeof flagValue}
            </div>
          </div>

          <div className="p-3 bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Computed Variant:</div>
            <div className="flex items-center gap-2">
              <div className={`text-2xl font-bold ${variant === 'B' ? 'text-orange-400' : 'text-blue-400'}`}>
                Variant {variant}
              </div>
              {variant === 'B' && (
                <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">
                  India Pricing
                </span>
              )}
            </div>
          </div>

          {/* Current Prices */}
          <div className="p-3 bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Prices Being Shown:</div>
            <div className="space-y-1">
              {plans.map((plan) => (
                <div key={plan.id} className="flex justify-between text-sm">
                  <span className="text-gray-300 capitalize">{plan.id}:</span>
                  <span className="font-bold text-green-400">${plan.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All Flags */}
          {Object.keys(allFlags).length > 0 && (
            <div className="p-3 bg-gray-800 rounded-lg">
              <div className="text-xs text-gray-400 mb-2">All Feature Flags:</div>
              <div className="space-y-1 max-h-32 overflow-auto">
                {Object.entries(allFlags).map(([key, value]) => (
                  <div key={key} className="text-xs">
                    <span className="text-gray-400">{key}:</span>{' '}
                    <span className="text-purple-300 font-mono">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
            <div className="text-xs text-blue-200 space-y-1">
              <p>📝 <strong>Expected values:</strong></p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>For Variant A: <code className="bg-black/30 px-1 rounded">undefined</code> or <code className="bg-black/30 px-1 rounded">control</code></li>
                <li>For Variant B: <code className="bg-black/30 px-1 rounded">variant-india</code> or <code className="bg-black/30 px-1 rounded">variant_india</code></li>
              </ul>
              <p className="mt-2">🔧 <strong>If you see null:</strong></p>
              <p className="ml-2">Flag not set in PostHog dashboard yet!</p>
            </div>
          </div>
        </div>

        {/* Console Output */}
        <div className="mt-4 text-xs text-gray-400 text-center">
          Check browser console for detailed logs
        </div>
      </Card>
    </div>
  );
}
