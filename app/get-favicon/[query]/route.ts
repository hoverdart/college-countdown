// Cache for 30 days
export const dynamicParams = true;
export const dynamic = "force-static";

import { JSDOM } from "jsdom";

// Uses Google Programmable Image Search to get a high-resolution image for the college
export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  const query = (await params).query;
  console.log(`Generating image for ${query}`);

  // Define API key and CX
  const apiKey = "AIzaSyDj8hiv4DNPBN-3NxceSYDQAOHWm6Jde4M";
  const cx = "e026303e00fa0488e";

  // Fetch high-resolution image using Google Custom Search JSON API
  let imageRes;
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${cx}&searchType=image&key=${apiKey}&num=1`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const imageUrl = data.items[0].link;
      imageRes = await fetch(imageUrl);
    } else {
      throw new Error("No image found");
    }
  } catch (error) {
    // Fallback to fetching favicon if no image found
    console.log(error);
    const imFeelingLuckyRes = await fetch(
      `https://duckduckgo.com/?t=h_&q=${encodeURIComponent("! " + query)}`,
      { redirect: "manual" }
    );
    const redirectPageHTML = await imFeelingLuckyRes.text();
    const dom = new JSDOM(redirectPageHTML);
    const meta = dom.window.document.querySelector("meta[http-equiv='refresh']");
    if (meta) {
      const content = meta.getAttribute("content");
      if (content) {
        const urlPart = content.split("url=")[1];
        const queryParams = new URLSearchParams(urlPart.split("?")[1]);
        const url = queryParams.get("uddg");

        if (url) {
          imageRes = await fetch(
            `https://www.google.com/s2/favicons?domain=${url}&sz=256`
          );
        } else {
          return new Response("No image found", { status: 404 });
        }
      } else {
        return new Response("No image found", { status: 404 });
      }
    } else {
      return new Response("No image found", { status: 404 });
    }
  }
  return new Response(imageRes.body, {
    status: imageRes.status,
    headers: {
      'Content-Type': imageRes.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=2592000', // Cache for 30 days
    },
  });
}