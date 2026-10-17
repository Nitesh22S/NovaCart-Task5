# NovaCart — Task 5 Final Project and Optimization

A responsive, front-end e-commerce demo built with semantic HTML, CSS, and vanilla JavaScript. It is intentionally dependency-free: no framework, bundler, backend, database, or payment processing is required.

## Features
- Responsive desktop, tablet, and mobile layouts
- Product catalogue with search, category filtering, and sorting
- Add-to-bag, quantity adjustment, remove item, subtotal and item count
- Favourite toggle
- Newsletter form interaction (demo only; no email is sent or stored)
- Accessible labels, keyboard focus styles, Escape-to-close cart
- Lazy-loaded product images and high-priority hero image
- Reduced-motion preference support
- Responsive images and lightweight static assets

## Run locally on macOS
1. Extract `novacart-task5.zip`.
2. Open Terminal and enter the extracted folder:
   ```bash
   cd novacart-task5
   ```
3. Start a local server (Python 3 is commonly available):
   ```bash
   python3 -m http.server 8000
   ```
4. Open `http://localhost:8000` in your browser.

You can also use the VS Code Live Server extension. Do not open `index.html` as a `file://` URL for final testing.

## Cross-browser and responsive test plan
Test the same local or deployed URL in:
- Chrome (desktop and Android if available)
- Firefox
- Safari (macOS and iOS if available)
- One mobile browser

At each viewport, verify:
- Header/search does not overflow
- Hero text and image fit
- Product cards are readable and aligned
- Search, category filters and sorting work
- Cart opens/closes, quantities update, remove works, subtotal is correct
- Newsletter validation works
- Keyboard focus is visible and Escape closes the cart
- No horizontal scrolling or console errors

Suggested viewport widths: 375px, 390px, 768px, 1024px, 1440px.

## Performance optimizations included
- No third-party JavaScript libraries and no framework runtime
- One CSS file and one JavaScript file to reduce requests
- `defer` on the application script
- Product images use `loading="lazy"` and `decoding="async"`
- Hero image uses `fetchpriority="high"`
- Responsive CSS grid and compact code structure
- Remote Unsplash images are resized with URL parameters

Note: the Google Fonts stylesheet and Unsplash images require an internet connection. For a fully offline demo, download and locally serve the images and fonts. Image providers may change their URLs.

## Production and audit
This is a static site, so it does not need `npm install` or a build command. Deploy the folder to GitHub Pages, Netlify, or Vercel. After deployment:
1. Run Google PageSpeed Insights on the live URL.
2. Save the report/screenshot for the assignment.
3. Use browser DevTools Network tab with cache disabled to review request count and image sizes.
4. Fix any major issues reported and repeat the test.

Do not claim a score or browser pass until you have run the tests yourself.

## Limitations
This is a front-end demonstration. Cart state is held in memory and resets on refresh. Checkout does not process payment. Newsletter signup does not send or save addresses. A real commercial deployment would need a backend, persistence, privacy/security review, inventory handling and a payment provider.
