# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Not yet published. This package requires a Nera generator with theme support
(`nera.generator` in `package.json`), which is additive and not yet released;
the release of `0.1.0` is deliberately held until it is.

### Added

-   Base shell `layouts/layout.pug` with a `content` block, and page-type
    templates `pages/default.pug` and `pages/home.pug` that extend it.
-   Partials `head`, `header`, `footer`, `scripts`, plus empty `head-extra` and
    `scripts-extra` override seams.
-   Token-driven `assets/css/main.css` and an ES-module `assets/js/main.js`
    entry following the side-effect-in-entry convention.
-   `config/theme.yaml` documenting the intended theme-defaults shape.
-   Template-compile validation (`npm run validate`) run in CI before publish.
