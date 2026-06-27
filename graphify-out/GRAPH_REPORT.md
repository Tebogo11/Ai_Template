# Graph Report - .  (2026-06-27)

## Corpus Check
- 157 files · ~274,612 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 695 nodes · 1020 edges · 66 communities (42 shown, 24 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Convex Outfit Backend|Convex Outfit Backend]]
- [[_COMMUNITY_App Entry and UI Hooks|App Entry and UI Hooks]]
- [[_COMMUNITY_Layout and Theme System|Layout and Theme System]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Page Views and Auth|Page Views and Auth]]
- [[_COMMUNITY_Virtual Try-On Pipeline|Virtual Try-On Pipeline]]
- [[_COMMUNITY_Generator Form Components|Generator Form Components]]
- [[_COMMUNITY_Dev Tooling Config|Dev Tooling Config]]
- [[_COMMUNITY_Image Preview Components|Image Preview Components]]
- [[_COMMUNITY_File Upload Components|File Upload Components]]
- [[_COMMUNITY_App TypeScript Config|App TypeScript Config]]
- [[_COMMUNITY_Component Library Aliases|Component Library Aliases]]
- [[_COMMUNITY_Onboarding Guide|Onboarding Guide]]
- [[_COMMUNITY_Node TypeScript Config|Node TypeScript Config]]
- [[_COMMUNITY_Convex TypeScript Config|Convex TypeScript Config]]
- [[_COMMUNITY_Auth and Backend Architecture|Auth and Backend Architecture]]
- [[_COMMUNITY_Landing Page Hero Images|Landing Page Hero Images]]
- [[_COMMUNITY_Error Boundary|Error Boundary]]
- [[_COMMUNITY_Toggle Section UI|Toggle Section UI]]
- [[_COMMUNITY_Path Alias Config|Path Alias Config]]
- [[_COMMUNITY_Convex Data Schema|Convex Data Schema]]
- [[_COMMUNITY_Convex Server Contexts|Convex Server Contexts]]
- [[_COMMUNITY_Add Model Form Light|Add Model Form Light]]
- [[_COMMUNITY_Add Outfit Form Light|Add Outfit Form Light]]
- [[_COMMUNITY_Add Model Form Dark|Add Model Form Dark]]
- [[_COMMUNITY_UI Primitives|UI Primitives]]
- [[_COMMUNITY_Primary Logo Design|Primary Logo Design]]
- [[_COMMUNITY_iOS App Icon|iOS App Icon]]
- [[_COMMUNITY_Browser Favicon|Browser Favicon]]
- [[_COMMUNITY_Contact Page Assets|Contact Page Assets]]
- [[_COMMUNITY_Header Component|Header Component]]
- [[_COMMUNITY_White Logo Variant|White Logo Variant]]
- [[_COMMUNITY_PWA Manifest Icons|PWA Manifest Icons]]
- [[_COMMUNITY_Convex Integration|Convex Integration]]
- [[_COMMUNITY_Loading Component|Loading Component]]
- [[_COMMUNITY_Spinner Icons|Spinner Icons]]
- [[_COMMUNITY_Scroll To Top|Scroll To Top]]
- [[_COMMUNITY_Vercel Deployment|Vercel Deployment]]
- [[_COMMUNITY_Clerk Auth Config|Clerk Auth Config]]
- [[_COMMUNITY_Generator Types|Generator Types]]
- [[_COMMUNITY_Add Outfit Feature|Add Outfit Feature]]
- [[_COMMUNITY_AI Brand Logo|AI Brand Logo]]
- [[_COMMUNITY_Auth Video Fallback|Auth Video Fallback]]
- [[_COMMUNITY_Brand Identity|Brand Identity]]
- [[_COMMUNITY_Dark Light Favicon|Dark Light Favicon]]
- [[_COMMUNITY_Dark Theme Variant|Dark Theme Variant]]
- [[_COMMUNITY_Fashion App Assets|Fashion App Assets]]
- [[_COMMUNITY_Dark Add Outfit Form|Dark Add Outfit Form]]
- [[_COMMUNITY_Convex Server Action|Convex Server Action]]
- [[_COMMUNITY_Convex HTTP Action|Convex HTTP Action]]
- [[_COMMUNITY_Convex Internal Query|Convex Internal Query]]
- [[_COMMUNITY_Loading Icon|Loading Icon]]
- [[_COMMUNITY_License|License]]
- [[_COMMUNITY_Logo Assets|Logo Assets]]
- [[_COMMUNITY_Favicon SVG|Favicon SVG]]
- [[_COMMUNITY_PWA Icon 512|PWA Icon 512]]
- [[_COMMUNITY_Outfit Categories|Outfit Categories]]
- [[_COMMUNITY_PWA Manifest|PWA Manifest]]

## God Nodes (most connected - your core abstractions)
1. `useAppSetting` - 33 edges
2. `useGeneratorSetting` - 33 edges
3. `compilerOptions` - 20 edges
4. `compilerOptions` - 17 edges
5. `api` - 15 edges
6. `compilerOptions` - 13 edges
7. `useSubmitForm()` - 10 edges
8. `Seo()` - 10 edges
9. `scripts` - 9 edges
10. `mutation` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Convex Coding Guidelines` --semantically_similar_to--> `Convex Functions Directory README`  [INFERRED] [semantically similar]
  .github/convex.instructions.md → convex/README.md
- `saveImagesToStorage()` --calls--> `getImageUrl`  [INFERRED]
  src/view/Dashboard/view/GeneratorForm/hooks/utils.ts → convex/storage.ts
- `Robots.txt Crawl Configuration` --references--> `Outfit AI - AI-Powered Fashion App`  [INFERRED]
  public/robots.txt → index.html
- `Outfit AI - AI-Powered Fashion App` --conceptually_related_to--> `React + Vite Frontend`  [INFERRED]
  index.html → README.md
- `convertUrlToStorageId()` --calls--> `generateUploadUrl`  [INFERRED]
  src/view/Dashboard/view/GeneratorForm/hooks/utils.ts → convex/storage.ts

## Import Cycles
- 1-file cycle: `src/view/Dashboard/view/PreviewImage/PreviewImage.tsx -> src/view/Dashboard/view/PreviewImage/PreviewImage.tsx`

## Hyperedges (group relationships)
- **Outfit AI Full-Stack Architecture** — outfit_ai_app, convex_backend_concept, react_vite_frontend, clerk_auth_concept [INFERRED 0.95]
- **Convex Backend Development Patterns** — convex_function_registration, convex_validator_system, convex_schema_definition [EXTRACTED 1.00]
- **Convex Public vs Internal Access Control** — convex_function_registration, convex_public_private_visibility, convex_http_endpoint_pattern [INFERRED 0.85]
- **Virtual Try-On Generation Pipeline** —  [INFERRED 0.95]

## Communities (66 total, 24 thin omitted)

### Community 0 - "Convex Outfit Backend"
Cohesion: 0.05
Nodes (42): generateDataType, getOutfitById, getOutfitsByWardrobeId, getImageUrl, getImageUrlFunc, getListImageUrl, dataURItoBlob(), extractContentFromUnknown() (+34 more)

### Community 1 - "App Entry and UI Hooks"
Cohesion: 0.07
Nodes (38): LoadingProps, api, useHandleGeneratorForm(), Placeholder, useRotatingPlaceholder(), useSetFormValues(), useSetOutfit(), useSubmitForm() (+30 more)

### Community 2 - "Layout and Theme System"
Cohesion: 0.08
Nodes (28): CustomClerkProvider(), Footer(), Flex(), FlexProps, DarkModeSwitch(), DarkModeSwitchProps, Dashboard(), Routes() (+20 more)

### Community 3 - "Package Dependencies"
Cohesion: 0.05
Nodes (43): dependencies, class-variance-authority, @clerk/clerk-react, clsx, convex, daisyui, dayjs, embla-carousel-react (+35 more)

### Community 4 - "Page Views and Auth"
Cohesion: 0.09
Nodes (21): About(), AuthPage(), SignUpPage(), BlogCard(), BlogList(), posts, BlogIndex(), BlogPostPage() (+13 more)

### Community 5 - "Virtual Try-On Pipeline"
Cohesion: 0.08
Nodes (42): AI Fashion Photography, AI-Generated Outfit Preview Panel (Right Side), AI Generation Sparkle Button (Bottom Left), AI Sparkle Action Button, Casual Outfit - White T-Shirt and Blue Jeans, No, Create CTA Button (Amber/Gold Color), Credit System - Available Credits Display and Manage Button, Credit System Header (Available Credits Display) (+34 more)

### Community 6 - "Generator Form Components"
Cohesion: 0.09
Nodes (26): DrawerClosedPreview(), DrawerTriggerProps, GeneratorFormProps, ChevronIcon, DrawerClosedFormPreview, DrawerTriggerContainerProps, FormContainerProps, MobileViewLabel (+18 more)

### Community 7 - "Dev Tooling Config"
Cohesion: 0.06
Nodes (35): devDependencies, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, npm-run-all (+27 more)

### Community 8 - "Image Preview Components"
Cohesion: 0.09
Nodes (27): actionIconsVariant, ActionSection(), ActionSectionProps, Actions, Body, Button, Card, ConfirmDeleteModalProps (+19 more)

### Community 9 - "File Upload Components"
Cohesion: 0.13
Nodes (22): isConvexStorageId(), generateUploadUrl, FileInputBox(), imageAnimationVariant, ImageUploadProps, isValidImageSource(), Container, HiddenInput (+14 more)

### Community 10 - "App TypeScript Config"
Cohesion: 0.08
Nodes (25): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleDetection, moduleResolution (+17 more)

### Community 11 - "Component Library Aliases"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 12 - "Onboarding Guide"
Cohesion: 0.14
Nodes (16): previewSteps, GuideSlide(), GuideSlideProps, Step, StepNumber, StepsList, StepText, Container (+8 more)

### Community 13 - "Node TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 14 - "Convex TypeScript Config"
Cohesion: 0.12
Nodes (15): compilerOptions, allowJs, allowSyntheticDefaultImports, forceConsistentCasingInFileNames, isolatedModules, jsx, lib, module (+7 more)

### Community 15 - "Auth and Backend Architecture"
Cohesion: 0.19
Nodes (15): Clerk Authentication Service, Convex Backend (Database + Server Logic), Convex Cron Job Scheduling, Convex Function Registration Pattern, Convex HTTP Endpoint Pattern via httpRouter, Public vs Internal Convex Function Visibility, Convex Functions Directory README, Convex Schema Definition Pattern (+7 more)

### Community 16 - "Landing Page Hero Images"
Cohesion: 0.22
Nodes (13): Editorial Fashion Mood, Street Style Fashion, Landing Page Hero Image 1, Black Leather Duffle Bag Accessory, Landing Page Hero Image 2, Confident Purposeful Urban Mood, Camel Overcoat Black Trousers White Sneakers Outfit, Stone Building Urban Street Setting (+5 more)

### Community 17 - "Error Boundary"
Cohesion: 0.25
Nodes (3): ErrorBoundary, ErrorBoundaryState, parseClerkDashboardUrl()

### Community 18 - "Toggle Section UI"
Cohesion: 0.43
Nodes (6): IsNewOutput(), ButtonGroup, Container, Label, LabelSubtext, ToggleButton

### Community 19 - "Path Alias Config"
Cohesion: 0.25
Nodes (7): compilerOptions, baseUrl, paths, files, /, @/view/*, references

### Community 20 - "Convex Data Schema"
Cohesion: 0.33
Nodes (4): DataModel, Doc, Id, TableNames

### Community 21 - "Convex Server Contexts"
Cohesion: 0.33
Nodes (5): ActionCtx, DatabaseReader, DatabaseWriter, MutationCtx, QueryCtx

### Community 22 - "Add Model Form Light"
Cohesion: 0.50
Nodes (5): Add Model Feature, Form UI Assets, Light Add Model Form Icon, Light Theme, Fashion Model Silhouette Placeholder

### Community 23 - "Add Outfit Form Light"
Cohesion: 0.60
Nodes (5): Add Outfit Form, Fashion Clothing Categories, Light Add Outfit Form Illustration, Light Theme UI Variant, Outfit Item Icon Set

### Community 24 - "Add Model Form Dark"
Cohesion: 0.60
Nodes (5): Add Model Form Feature, Dark Theme Asset Variant, Female Figure Silhouette, Male Figure Silhouette, Dark Add Model Placeholder Icon

### Community 25 - "UI Primitives"
Cohesion: 0.70
Nodes (3): cn(), Button(), buttonVariants

### Community 26 - "Primary Logo Design"
Cohesion: 0.50
Nodes (5): Brand Name: AI, Small Accent Circle Element, Large Circular Ring Element, Primary Logo, Minimalist Monochromatic Style

### Community 27 - "iOS App Icon"
Cohesion: 0.67
Nodes (4): AI Brand Identity, Brand Ring Logo Mark, iOS Home Screen Icon, Apple Touch Icon – Brand Logo

### Community 28 - "Browser Favicon"
Cohesion: 0.83
Nodes (4): AI Brand Identity, Circular Ring Logo Mark, Browser Tab Icon (Favicon), Favicon 96x96

### Community 29 - "Contact Page Assets"
Cohesion: 0.67
Nodes (4): Mannequin Outfit Display, Landing Page Contact Section, Contact Fashion Photo, Minimalist Studio Aesthetic

### Community 31 - "White Logo Variant"
Cohesion: 1.00
Nodes (4): Logo White Variant, White Monochrome Color Scheme, Circular Ring Donut Mark, AI Wordmark

### Community 32 - "PWA Manifest Icons"
Cohesion: 1.00
Nodes (3): AITemplate Brand Identity, PWA Manifest Icon 192x192, PWA Manifest Icon Set

### Community 33 - "Convex Integration"
Cohesion: 1.00
Nodes (3): AI Template Project, Convex Backend-as-a-Service Platform, Convex SVG Logo

### Community 35 - "Spinner Icons"
Cohesion: 1.00
Nodes (3): SVG Stroke-Dashoffset Animation, Brand Color #EA9132 (Amber/Orange), Infinite Spinner Icon

## Knowledge Gaps
- **272 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+267 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAppSetting` connect `Layout and Theme System` to `File Upload Components`, `Page Views and Auth`, `App Entry and UI Hooks`, `Generator Form Components`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `api` connect `App Entry and UI Hooks` to `Image Preview Components`, `File Upload Components`, `Layout and Theme System`, `Convex Outfit Backend`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `useGeneratorSetting` connect `App Entry and UI Hooks` to `Image Preview Components`, `Layout and Theme System`, `Toggle Section UI`, `Generator Form Components`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `useAppSetting` (e.g. with `Header()` and `Header()`) actually correct?**
  _`useAppSetting` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `useGeneratorSetting` (e.g. with `PreviewImage()` and `PreviewImageDisplay()`) actually correct?**
  _`useGeneratorSetting` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _272 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Convex Outfit Backend` be split into smaller, more focused modules?**
  _Cohesion score 0.051203277009728626 - nodes in this community are weakly interconnected._