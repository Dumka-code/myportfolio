const fs = require('fs');
const path = require('path');

// Read the blog data from blogData.json
const blogDataPath = path.join(__dirname, 'blogData.json');
const blogData = require(blogDataPath);

// Function to generate the XML content for a single URL
const createUrlEntry = (blog) => `
  <url>
    <loc>https://dumkabipnelo.website/blog/${blog.slug}</loc>
    <lastmod>${blog.date || new Date().toISOString()}</lastmod>
    <changefreq>${blog.changeFrequency || 'weekly'}</changefreq>
    <priority>${blog.priority || '0.5'}</priority>
  </url>
`;

// Function to generate the entire sitemap XML
const generateSitemap = (blogs) => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const xmlUrlsetStart = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" \n\t xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \n\t xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 \n\t http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';
  const xmlUrlsetEnd = '</urlset>';

  // Include the main website URL with its own lastmod value
  const mainUrlEntry = `<url>
    <loc>https://dumkabipnelo.website/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  const urlEntries = blogs.map((blog) => createUrlEntry(blog));

  return `${xmlHeader}\n${xmlUrlsetStart}\n${mainUrlEntry}\n${urlEntries.join('\n')}\n${xmlUrlsetEnd}`;
};

// Save the generated sitemap to a file
const saveSitemapToFile = (sitemapContent, filePath) => {
  fs.writeFileSync(filePath, sitemapContent, 'utf8');
  console.log(`Sitemap saved to ${filePath}`);
};

// Generate the sitemap and save it to a file
const sitemapContent = generateSitemap(blogData);
const sitemapFilePath = '../public/sitemap.xml';
saveSitemapToFile(sitemapContent, sitemapFilePath);
