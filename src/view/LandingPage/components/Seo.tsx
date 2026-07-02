import { useEffect } from "react";

export type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string; // article, website
  twitterCard?: "summary" | "summary_large_image";
  structuredData?: Record<string, any> | Record<string, any>[];
  siteBase?: string; // e.g. https://o-ai.co.uk
  noindex?: boolean;
  nofollow?: boolean;
};

function setOrUpdateMeta({
  name,
  property,
  content,
}: {
  name?: string;
  property?: string;
  content: string;
}) {
  if (!content) return;
  let selector = name ? `meta[name='${name}']` : `meta[property='${property}']`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    if (name) el.setAttribute("name", name);
    if (property) el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setOrUpdateLink(rel: string, href: string) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setOrUpdateJsonLd(id: string, data: any) {
  if (!data) return;
  let el = document.head.querySelector(`script#${id}`) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.text = JSON.stringify(data);
}

export default function Seo({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  twitterCard = "summary_large_image",
  structuredData,
  siteBase,
  noindex,
  nofollow,
}: SeoProps) {
  useEffect(() => {
    const origin = siteBase || (typeof window !== "undefined" ? window.location.origin : "");
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const resolvedUrl = url
      ? url.startsWith("http")
        ? url
        : origin
        ? `${origin}${url.startsWith("/") ? url : `/${url}`}`
        : url
      : origin
      ? `${origin}${path}`
      : "";
    const resolvedImage = image
      ? image.startsWith("http")
        ? image
        : origin
        ? `${origin}${image.startsWith("/") ? image : `/${image}`}`
        : image
      : "";

    if (title) document.title = title;

    // Basic
    if (description)
      setOrUpdateMeta({ name: "description", content: description });
    if (keywords?.length)
      setOrUpdateMeta({ name: "keywords", content: keywords.join(", ") });
    if (noindex || nofollow) {
      const robots = `${noindex ? "noindex" : "index"}, ${nofollow ? "nofollow" : "follow"}`;
      setOrUpdateMeta({ name: "robots", content: robots });
      setOrUpdateMeta({ name: "googlebot", content: robots });
    }

    // Canonical
    if (resolvedUrl) setOrUpdateLink("canonical", resolvedUrl);

    // Open Graph
    if (title) setOrUpdateMeta({ property: "og:title", content: title });
    if (description)
      setOrUpdateMeta({ property: "og:description", content: description });
    if (resolvedUrl) setOrUpdateMeta({ property: "og:url", content: resolvedUrl });
    setOrUpdateMeta({ property: "og:type", content: type });
    if (resolvedImage) setOrUpdateMeta({ property: "og:image", content: resolvedImage });

    // Twitter
    setOrUpdateMeta({ name: "twitter:card", content: twitterCard });
    if (title) setOrUpdateMeta({ name: "twitter:title", content: title });
    if (description)
      setOrUpdateMeta({ name: "twitter:description", content: description });
    if (resolvedImage) setOrUpdateMeta({ name: "twitter:image", content: resolvedImage });

    // JSON-LD
    if (structuredData) {
      if (Array.isArray(structuredData)) {
        setOrUpdateJsonLd(
          "__jsonld_multi__",
          structuredData.map((d) => ({ "@context": "https://schema.org", ...d })),
        );
      } else {
        setOrUpdateJsonLd("__jsonld__", {
          "@context": "https://schema.org",
          ...structuredData,
        });
      }
    }
  }, [title, description, keywords?.join(","), image, url, type, twitterCard, siteBase, noindex, nofollow, JSON.stringify(structuredData)]);

  return null;
}
