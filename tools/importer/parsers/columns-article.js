/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-article. Base: columns.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-04
 *
 * Structure (from library-description.txt): flexible columns; column count is
 * driven by the natural grouping in the source. The source has 2 direct child
 * divs (image, then text content), so this is a single 2-column row.
 * Row 1: block name. Row 2: [ image column, text-content column ].
 */
export default function parse(element, { document }) {
  // Direct children of the grid define the columns.
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  const cells = [];

  if (columns.length > 0) {
    // One content row: each direct child becomes a column cell.
    cells.push(columns);
  }

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
