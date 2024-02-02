const fs = require('fs');
const path = require('path');

// Read the blog data from blogData.json
const blogDataPath = path.join(__dirname, 'blogData.json');
const blogData = require(blogDataPath);

// Function to generate the XML content for a single URL
const createUrlEntry = (url, lastModified, changeFrequency, priority) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified || new Date().toISOString()}</lastmod>
    <changefreq>${changeFrequency || 'monthly'}</changefreq>
    <priority>${priority || '0.5'}</priority>
  </url>
`;

// Function to generate the entire sitemap XML
const generateSitemap = (urls) => {
  const currentDate = new Date().toISOString();
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const xmlUrlsetStart = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const xmlUrlsetEnd = '</urlset>';

  const urlEntries = urls.map((url) => createUrlEntry(url, currentDate));

  return `${xmlHeader}\n${xmlUrlsetStart}\n${urlEntries.join('\n')}\n${xmlUrlsetEnd}`;
};

// Save the generated sitemap to a file
const saveSitemapToFile = (sitemapContent, filePath) => {
  fs.writeFileSync(filePath, sitemapContent, 'utf8');
  console.log(`Sitemap saved to ${filePath}`);
};

// Generate blog URLs dynamically
const blogUrls = blogData.map((blog) => `http://192.168.28.124:5173/blog/${blog.slug}`);

// Combine blog URLs with other static URLs
const allUrls = [
  'http://192.168.28.124:5173/',
  // ... other static URLs
  ...blogUrls,
];

// Generate the sitemap and save it to a file
const sitemapContent = generateSitemap(allUrls);
const sitemapFilePath = 'sitemap.xml';
saveSitemapToFile(sitemapContent, sitemapFilePath);
