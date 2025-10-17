import React, { useRef, useCallback } from 'react'

export default function HtmlPreviewModal({ url, title = 'Preview', onClose }) {
  const iframeRef = useRef(null)

  const injectLightMode = useCallback(() => {
    try {
      const iframe = iframeRef.current
      if (!iframe) return
      const doc = iframe.contentDocument || iframe.contentWindow?.document
      if (!doc) return

      // Ensure <head> exists
      const head = doc.head || doc.getElementsByTagName('head')[0]
      if (!head) return

      // Add/Update meta color-scheme
      let meta = doc.querySelector('meta[name="color-scheme"]')
      if (!meta) {
        meta = doc.createElement('meta')
        meta.setAttribute('name', 'color-scheme')
        head.appendChild(meta)
      }
      meta.setAttribute('content', 'light')

      // Inject or update style to force light backgrounds and disable dark preferences
      let style = doc.getElementById('__forced_light_mode_style__')
      if (!style) {
        style = doc.createElement('style')
        style.id = '__forced_light_mode_style__'
        head.appendChild(style)
      }
      style.textContent = `
        :root { color-scheme: light !important; }
        html, body { background: #ffffff !important; }
        @media (prefers-color-scheme: dark) {
          :root { color-scheme: light !important; }
          html, body { background: #ffffff !important; }
        }
        /* Common wiki dark classes override (no color changes to avoid breaking theming) */
        html[class*="dark"], body[class*="dark"],
        html[class*="night"], body[class*="night"],
        html[data-theme], body[data-theme] {
          background: #ffffff !important;
        }
      `
    } catch (e) {
      // If access is blocked or any error occurs, silently ignore
      // The modal still provides an "Open in new tab" fallback.
    }
  }, [])
  if (!url) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-6xl h-[80vh] bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold text-white">{title}</div>
            <div className="text-sm text-gray-400">HTML Preview</div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white px-3 py-1 rounded border border-gray-600 hover:border-gray-400"
              title="Open in new tab"
            >
              ↗ Open
            </a>
            <button onClick={onClose} className="text-gray-300 hover:text-white px-3 py-1 rounded">✕</button>
          </div>
        </div>

        <div className="flex-1 bg-white/5">
          <iframe
            title={title}
            src={url}
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
            ref={iframeRef}
            onLoad={injectLightMode}
          />
        </div>
        <div className="p-2 text-center text-xs text-gray-400 border-t border-gray-800">
          Light mode forced for preview
        </div>
      </div>
    </div>
  )
}
