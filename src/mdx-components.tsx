import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import {
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { LazyMermaid } from "@/components/LazyMermaid";

function extractPlainText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractPlainText).join("");
  }
  if (isValidElement(node)) {
    const element = node as ReactElement<{ children?: React.ReactNode }>;
    return extractPlainText(element.props.children);
  }
  return "";
}

function extractMermaidChart(children: React.ReactNode): string | null {
  if (!isValidElement(children)) return null;
  const element = children as ReactElement<{
    className?: string;
    "data-language"?: string;
    children?: React.ReactNode;
  }>;
  const className = element.props.className ?? "";
  const dataLang = element.props["data-language"] ?? "";
  if (!className.includes("language-mermaid") && dataLang !== "mermaid") {
    return null;
  }

  return extractPlainText(element.props.children);
}

const components: MDXComponents = {
  Mermaid: LazyMermaid,
  h1: ({ children, ...props }) => (
    <h1
      className="font-sans text-3xl sm:text-4xl font-black tracking-tight text-accent leading-tight mb-3"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="font-sans text-2xl font-bold tracking-tight text-white mt-10 mb-4"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="font-sans text-xl font-bold tracking-tight text-white mt-8 mb-3"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-base leading-7 text-white/90 mb-5" {...props}>
      {children}
    </p>
  ),
  a: ({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const className =
      "text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover";

    if (isInternal) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ children, ...props }) => (
    <ul
      className="list-disc pl-6 mb-5 space-y-2 text-base leading-7 text-white/90"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="list-decimal pl-6 mb-5 space-y-2 text-base leading-7 text-white/90"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-1" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-accent pl-4 my-6 italic text-white/80"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-[0.9em] text-white"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => {
    const mermaidChart = extractMermaidChart(children);
    if (mermaidChart !== null) {
      return <LazyMermaid chart={mermaidChart} />;
    }

    return <CodeBlock {...props}>{children}</CodeBlock>;
  },
  hr: (props) => <hr className="my-8 border-white/15" {...props} />,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-white" {...props}>
      {children}
    </strong>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
