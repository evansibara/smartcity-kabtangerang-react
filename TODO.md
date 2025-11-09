# Project Reorganization Tasks

- [x] Create subdirectories in src/components/: layout/, common/, ui/
- [x] Create subdirectories in src/pages/: explore-dimensions/
- [x] Create subdirectories in src/styles/: base/, components/, pages/, dimensions/
- [x] Create subdirectories in src/assets/: images/, icons/, fonts/
- [x] Move components to subfolders: Header.jsx, Footer.jsx, Layout.jsx to layout/; PageLoader.jsx, ScrollToTop.jsx, NotFound.jsx to common/; (create ui/ if needed)
- [x] Move pages: SmartBranding.jsx etc. to explore-dimensions/
- [x] Move CSS files to appropriate subfolders: index.css, layout.css, variables.css to base/; header.css, footer.css, page_loader.css, notfound.css to components/; home_page.css etc. to pages/; smart_branding.css etc. to dimensions/
- [x] Rename "explore dimensions" folder to "explore-dimensions"
- [x] Move public/images/ to src/assets/images/
- [x] Create src/router/AppRouter.jsx and move routing logic from App.jsx
- [x] Create src/utils/helpers.js
- [x] Update import statements in all affected files
- [x] Update App.jsx to import and use AppRouter
- [x] Test the project to ensure everything works
