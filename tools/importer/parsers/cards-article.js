/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-04
 *
 * Structure (from library-description.txt): 2 columns, multiple rows.
 * Row 1: block name. Each subsequent row = one card:
 *   [ image cell (mandatory), text-content cell (title/description/CTA) ].
 */
export default function parse(element, { document }) {
  // Each card in source is an <a class="article-card card-link">.
  const cards = element.querySelectorAll(
    ':scope > a.article-card, :scope > .article-card, :scope > a.card-link, :scope > .card'
  );

  const cells = [];

  cards.forEach((card) => {
    // Image cell.
    const image = card.querySelector('img');

    // Text content cell: meta, then the heading linked to the article URL.
    const contentCell = [];
    const meta = card.querySelector('.article-card-meta, [class*="meta"]');
    if (meta) contentCell.push(meta);
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"], [class*="title"]');

    // Preserve the article link (the whole card is an anchor) by wrapping the
    // heading text in it — avoids duplicating the title as separate text.
    const href = card.getAttribute('href');
    if (heading) {
      if (href) {
        const link = document.createElement('a');
        link.href = href;
        link.append(...heading.childNodes);
        heading.append(link);
      }
      contentCell.push(heading);
    } else if (href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = (card.textContent || '').trim();
      contentCell.push(link);
    }

    cells.push([image || '', contentCell]);
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
