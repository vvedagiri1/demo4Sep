/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-banner. Base: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-04
 *
 * Structure (from library-description.txt): 1 column, 3 rows.
 * Row 1: block name.
 * Row 2: background image (optional).
 * Row 3: title (heading), subheading, and CTA (optional).
 */
export default function parse(element, { document }) {
  // Background image.
  const bgImage = element.querySelector('img.cover-image, img.utility-overlay, img[class*="cover"], img');

  // Text content.
  const heading = element.querySelector('h1, h2, h3, [class*="heading"]:not([class*="sub"])');
  const subheading = element.querySelector('p.subheading, p, [class*="subheading"]');
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button, a[class*="button"]'));

  // Empty-block guard.
  if (!bgImage && !heading && !subheading && ctaLinks.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image (single-column cell).
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 3: text content, all in one cell (hero is 1-column).
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
