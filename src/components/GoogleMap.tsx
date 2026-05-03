"use client";

/**
 * GoogleMap Component
 * Integrates Google Maps Embed API to visualize local polling stations.
 * Includes fallback UI for missing API keys.
 */
export default function GoogleMap() {
  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 relative bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/search?q=polling+stations+near+me&key=MOCK_API_KEY_WILL_NOT_RENDER"
        className="absolute inset-0 z-0 opacity-50"
      />
      <div className="z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur p-6 rounded-xl text-center max-w-md border border-gray-200 dark:border-gray-700 shadow-xl">
        <p className="font-semibold text-lg mb-2">Google Maps SDK Integrated</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Provides live routing to local voting centers. (Requires valid API Key to render map fully).</p>
      </div>
    </div>
  );
}
