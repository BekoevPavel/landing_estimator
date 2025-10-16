/**
 * Тестовая функция для проверки переменных окружения
 * После деплоя вызовите: https://ваш-сайт.netlify.app/.netlify/functions/test-env
 * 
 * ВАЖНО: Удалите эту функцию после отладки!
 */

exports.handler = async () => {
  console.log("🧪 Testing environment variables...");
  
  const envCheck = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    
    // Проверка Stripe ключей
    stripe: {
      hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
      secretKeyPrefix: process.env.STRIPE_SECRET_KEY 
        ? process.env.STRIPE_SECRET_KEY.substring(0, 15) 
        : "❌ NOT_SET",
      secretKeyLength: process.env.STRIPE_SECRET_KEY 
        ? process.env.STRIPE_SECRET_KEY.length 
        : 0,
    },
    
    // Все переменные, связанные со Stripe
    stripeEnvKeys: Object.keys(process.env).filter(k => k.includes('STRIPE')),
    
    // Все переменные с префиксом VITE (они не должны быть видны в функциях)
    viteEnvKeys: Object.keys(process.env).filter(k => k.startsWith('VITE_')),
    
    // Общая информация
    totalEnvVars: Object.keys(process.env).length,
  };
  
  console.log("Environment check result:", JSON.stringify(envCheck, null, 2));
  
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(envCheck, null, 2),
  };
};

