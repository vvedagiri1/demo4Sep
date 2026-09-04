/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters site-wide cleanup.
 * Removes non-authorable site chrome. All selectors verified against
 * migration-work/cleaned.html for the "home" template.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // No cookie banners, modals, or overlays present in captured DOM.
    // Remove the skip-link before parsing (non-authorable a11y helper).
    // Found in cleaned.html: <a href="#main-content" class="skip-link">Skip to main content</a>
    WebImporter.DOMUtils.remove(element, ['a.skip-link']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable global chrome, verified in cleaned.html:
    //   <div class="navbar"> ... </div>      (top nav shell + mega menu)
    //   <footer class="footer inverse-footer"> ... </footer>
    //   <div class="breadcrumbs"> ... </div>  (in-content navigation, non-authorable)
    WebImporter.DOMUtils.remove(element, [
      'div.navbar',
      'footer.footer',
      '.breadcrumbs',
    ]);
  }
}
