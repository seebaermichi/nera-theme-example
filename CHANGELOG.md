# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-10-08

Documentation only — no template, asset or config changed.

### Fixed

-   `README.md` Requirements still said theme support was unreleased and this
    package unpublished. It now states the real floor, `@nera-static/core`
    4.6.0+, which any site on `@nera-static/nera` already has.
-   `README.md` now warns that a site scaffolded with `nera new` ships its own
    `theme/views/layouts/layout.pug` and `theme/views/pages/default.pug`,
    which override this theme's files per file, so the theme's shell stays
    hidden until those copies are removed.

## [0.1.0] - 2026-07-24

First published release. Requires a Nera generator with theme support
(`nera.generator`), available since generator 4.6.0.

### Added

-   Base shell `layouts/layout.pug` with a `content` block, and page-type
    templates `pages/default.pug` and `pages/home.pug` that extend it.
-   Partials `head`, `header`, `footer`, `scripts`, plus empty `head-extra` and
    `scripts-extra` override seams.
-   Token-driven `assets/css/main.css` and an ES-module `assets/js/main.js`
    entry following the side-effect-in-entry convention.
-   `config/theme.yaml` documenting the intended theme-defaults shape.
-   Template-compile validation (`npm run validate`) run in CI before publish.

### Changed

-   Payload moved from the inner `theme/` wrapper to the package root
    (`views/`, `assets/`, `config/`) to match the revised theme folder layout
    (generator `ROADMAP-themes.md` §1b, 2026-07-23); `files` is now
    `["views", "assets", "config"]`. Pre-release only — nothing was ever
    published under the old layout.
