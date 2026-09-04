/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-04
 *
 * Structure (from library-description.txt): 2 columns, multiple rows.
 * Row 1: block name. Each subsequent row = one accordion item:
 *   [ title cell (mandatory), content cell (mandatory) ].
 */
export default function parse(element, { document }) {
  // Each accordion item in source is a <details class="faq-item">.
  // Fallbacks handle variations where items are not <details>.
  const items = element.querySelectorAll(
    ':scope > details.faq-item, :scope > details, :scope > .faq-item, :scope > .accordion-item'
  );

  const cells = [];

  items.forEach((item) => {
    // Title: the <summary> / question label. Prefer inner text container.
    const summary = item.querySelector('summary, .faq-question, [class*="question"], [class*="title"]');
    // Content: the answer / body of the item.
    const answer = item.querySelector('.faq-answer, [class*="answer"], [class*="content"], [class*="body"]');

    // Title cell content: unwrap the summary to its inner content if present.
    let titleCell = '';
    if (summary) {
      const inner = summary.querySelector('span');
      titleCell = inner || summary;
    }

    // Content cell: use the answer container; fall back to remaining nodes.
    let contentCell = '';
    if (answer) {
      contentCell = answer;
    }

    // Only add a row if we found at least a title.
    if (titleCell || contentCell) {
      cells.push([titleCell, contentCell]);
    }
  });

  // Empty-block guard: no items found, unwrap.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
