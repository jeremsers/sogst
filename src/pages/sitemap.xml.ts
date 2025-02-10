import { getCollection } from 'astro:content';

export async function GET({ site }) {
    if (!site) {
        throw new Error('Site URL is not configured. Please set it in your astro.config.mjs file.');
    }

    const interventions = await getCollection('intervention');
    const siteUrl = site.toString().replace(/\/$/, ''); // Enlève le slash final s'il existe
    
    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${siteUrl}/</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>
            ${interventions.map((intervention) => `
                <url>
                    <loc>${siteUrl}/${intervention.slug}/</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.7</priority>
                </url>
            `).join('')}
        </urlset>`,
        {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600'
            }
        }
    );
} 