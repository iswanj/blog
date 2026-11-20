"use client";

import { useEffect, useId, useState } from "react";

interface MermaidProps {
  chart: string;
}

let mermaidInitialized = false;

export function Mermaid({ chart }: MermaidProps) {
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      try {
        const mermaid = (await import("mermaid")).default;

        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: "base",
            securityLevel: "strict",
            themeVariables: {
              darkMode: true,
              background: "#1d2027",
              primaryColor: "#282c35",
              primaryTextColor: "#ffffff",
              primaryBorderColor: "#bc8a01",
              lineColor: "#bc8a01",
              secondaryColor: "#1d2027",
              tertiaryColor: "#323743",
              noteBkgColor: "#282c35",
              noteTextColor: "#ffffff",
              noteBorderColor: "#bc8a01",
              fontFamily: "var(--font-montserrat), sans-serif",
            },
          });
          mermaidInitialized = true;
        }

        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${reactId}`,
          chart.trim()
        );

        if (!cancelled) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to render Mermaid chart"
          );
        }
      }
    }

    renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    if (!isFullScreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullScreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen]);

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-red-400/40 bg-[#1d2027] p-4 font-mono text-sm text-red-300">
        Mermaid diagram error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="group relative my-6 rounded-lg bg-[#1d2027] p-4 border border-white/5 transition-colors hover:border-white/10">
        {/* Fullscreen Trigger Button */}
        {svg && (
          <button
            type="button"
            onClick={() => setIsFullScreen(true)}
            className="absolute top-3 right-3 flex items-center gap-1.5 rounded bg-black/40 px-2.5 py-1 text-xs font-sans text-white/70 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white"
            title="View Fullscreen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
            <span>Enlarge</span>
          </button>
        )}

        <div
          className="flex justify-center overflow-x-auto py-2 [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:min-w-[280px]"
          aria-label="Mermaid diagram"
        >
          {svg ? (
            <div
              className="w-full flex justify-center [&_svg]:w-full [&_svg]:max-w-[580px]"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <span className="font-mono text-xs text-white/50 py-4">
              Loading diagram...
            </span>
          )}
        </div>
      </div>

      {/* Fullscreen Modal / Lightbox */}
      {isFullScreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8 backdrop-blur-md"
          onClick={() => setIsFullScreen(false)}
        >
          <div
            className="relative flex flex-col max-h-[92vh] max-w-[96vw] w-full items-center justify-center rounded-xl border border-white/10 bg-[#1d2027] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Controls Header */}
            <div className="absolute top-4 right-4 flex items-center gap-3">
              <span className="hidden sm:inline-block font-sans text-xs text-white/40">
                Press ESC or click outside to exit
              </span>
              <button
                type="button"
                onClick={() => setIsFullScreen(false)}
                className="flex items-center justify-center rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                title="Close Fullscreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Expanded Chart View */}
            <div
              className="flex max-h-[82vh] w-full items-center justify-center overflow-auto p-4 [&_svg]:h-auto [&_svg]:max-h-[78vh] [&_svg]:w-full [&_svg]:max-w-5xl"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        </div>
      )}
    </>
  );
}
