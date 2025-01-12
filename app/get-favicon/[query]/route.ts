// Cache for 30 days
export const dynamicParams = true;
export const dynamic = "force-static";

import { JSDOM } from "jsdom";

// Gets first URL from "I'm Feeling Lucky" then uses that URL to get favicon
export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  const query = (await params).query;
  console.log(`Generating image for ${query}`);

  const imFeelingLuckyRes = await fetch(
    `https://duckduckgo.com/?t=h_&q=${encodeURIComponent("! " + query)}`,
    { redirect: "manual" }
  );
  const redirectPageHTML = await imFeelingLuckyRes.text();
  const dom = new JSDOM(redirectPageHTML);
  const meta = dom.window.document.querySelector("meta[http-equiv='refresh']")!;
  const content = meta.getAttribute("content")!;
  const urlPart = content.split("url=")[1];
  const queryParams = new URLSearchParams(urlPart.split("?")[1]);
  const url = queryParams.get("uddg");

  const imageRes = await fetch(
    `https://www.google.com/s2/favicons?domain=${url}&sz=4096`
  );

  return new Response(imageRes.body, {
    status: imageRes.status,
    headers: imageRes.headers,
  });
}