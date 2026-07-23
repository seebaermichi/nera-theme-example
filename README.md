# @nera-static/theme-example

The minimal reference implementation of an **installable, updatable Nera theme**.
It exists to prove and document the theme contract described in the generator's
`ROADMAP-themes.md`; it is intentionally plain rather than pretty.

## What a theme is

A theme is an npm package that provides the base `views/` and `assets/` for a
Nera site. The site's own `theme/views/` and `theme/assets/` override the theme
**per file**; everything the site does not override keeps updating with
`npm update`. This is WordPress child-theme semantics.

## Package layout

The payload sits directly at the package root — a theme package contains nothing
but the theme, so its root already *is* the theme root (no `theme/` wrapper). The
consuming site groups its *own* presentation under `<site>/theme/` and overrides
this package per file:

```
views/
    layouts/layout.pug        the base shell; owns <head>, header, footer,
                              scripts, and a `content` block
    pages/
        default.pug          page type: content in an <article>
        home.pug             page type: a hero from frontmatter, then content
    partials/
        head.pug              <head>; links /css/main.css, includes head-extra
        head-extra.pug        empty override seam (add your own <link>/<meta>)
        header.pug            site header (BEM: .site-header__*)
        footer.pug            site footer
        scripts.pug           <script type="module">; includes scripts-extra
        scripts-extra.pug     empty override seam
assets/
    css/main.css             token-driven base stylesheet
    js/main.js               ES-module entry point
config/theme.yaml            theme defaults (documented; consumption is WIP)
```

## Page types

A page picks a template through its frontmatter `layout:` — a path relative to
the views root. Each page template `extends` the base shell and fills its
`content` block, so the shared chrome lives in exactly one place:

```markdown
---
layout: pages/home.pug
title: Welcome
subtitle: A Nera site
---
Body content here.
```

| `layout:` value | renders |
|---|---|
| `pages/default.pug` | content wrapped in an `<article>` |
| `pages/home.pug` | a hero from `title`/`subtitle`, then the content |

A site can **override** a page type (drop `theme/views/pages/home.pug` into the
site — only that type forks) or **add** its own (`theme/views/pages/landing.pug`
that itself does `extends ../layouts/layout.pug`, reusing the theme's shell).
Overriding `theme/views/layouts/layout.pug` reshells every page type at once.

## Using it

In a Nera site:

```bash
npm install @nera-static/theme-example
```

```yaml
# config/app.yaml
theme: example        # → @nera-static/theme-example
```

To develop this theme against a real site without publishing, install it by
path — the npm equivalent of a Composer path repository:

```bash
npm install ../nera-theme-example      # writes a file: dependency, symlinks it
```

## Customising without losing updates

- **Change a colour or spacing:** ship `theme/assets/css/custom.css` re-declaring
  the tokens you want, and add it via an overridden `head-extra.pug`. Do **not**
  override `main.css` — you would stop receiving its fixes.
- **Change markup:** drop a file with the same path into your site's
  `theme/views/`. Only that file stops updating; everything else still does.

## Using it as a blueprint for your own theme

This package is deliberately minimal so it can be cloned as a starting point.
To build your own theme from it:

1. **Copy the repo** (clone, or degit to drop the git history):
   ```bash
   npx degit github:seebaermichi/nera-theme-example my-theme
   cd my-theme && git init
   ```
2. **Rename the package** in `package.json` — `@yourscope/theme-<name>`, reset
   `version` to `0.1.0`, update `description`, `repository`, and `author`.
3. **Keep the plumbing** that lets the generator find the package: `type`,
   `files: ["views", "assets", "config"]`, and the `exports` entry exposing
   `./package.json`.
4. **Edit the payload** at the package root — the layouts, page types, partials,
   `assets/`, and `config/theme.yaml` are all yours to change. Keep the
   override seams (`head-extra.pug`, `scripts-extra.pug`) if you want consumers
   to extend without forking.
5. **Set `nera.generator`** to the generator range your theme needs.
6. **Add a `LICENSE`** and start a `CHANGELOG.md`.

The layout, the page-type split under `views/pages/`, the token-driven CSS and
the side-effect-in-entry JS convention are all patterns worth keeping — they are
what make a theme updatable rather than fork-once.

## Requirements

Requires a Nera generator with theme support (`nera.generator` in
`package.json`). That capability is additive and **not yet released**, so this
package is **not yet published to npm** either — installing it today only does
something against a generator built from a branch that has theme support. The
version range here is provisional.
