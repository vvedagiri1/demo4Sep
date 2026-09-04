/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-gallery. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-04
 *
 * Structure (from library-description.txt): 2 columns, multiple rows.
 * Row 1: block name. Each subsequent row = one card:
 *   [ image cell (mandatory), text-content cell ].
 * This gallery variant contains image-only cards, so the text cell is empty
 * but kept to preserve the fixed 2-column structure.
 */
export default function parse(element, { document }) {
  // Each gallery card is a wrapper div holding a single image.
  const items = element.querySelectorAll(
    ':scope > .utility-aspect-1x1, :scope > div:has(> img), :scope > .card'
  );

  const cells = [];

  items.forEach((item) => {
    const image = item.querySelector('img') || (item.matches('img') ? item : null);
    if (image) {
      cells.push([image, '']);
    }
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
