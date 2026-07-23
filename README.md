# @nera-static/theme-example

The minimal reference implementation of an **installable, updatable Nera theme**.
It exists to prove and document the theme contract described in the generator's
`ROADMAP-themes.md`; it is intentionally plain rather than pretty.

## What a theme is

A theme is an npm package that provides the base `views/` and `assets/` for a
Nera site. The site's own `views/` and `assets/` override the theme **per file**;
everything the site does not override keeps updating with `npm update`. This is
WordPress child-theme semantics.

## Package layout

The payload lives under a `theme/` wrapper folder, so it never collides with the
consuming site's own `views/`, and so the same layout works whether the theme is
installed from npm or developed in place:

```
theme/
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

A site can **override** a page type (drop `views/pages/home.pug` into the site —
only that type forks) or **add** its own (`views/pages/landing.pug` that itself
does `extends ../layouts/layout.pug`, reusing the theme's shell). Overriding
`layouts/layout.pug` reshells every page type at once.

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

- **Change a colour or spacing:** ship `assets/css/custom.css` re-declaring the
  tokens you want, and add it via an overridden `head-extra.pug`. Do **not**
  override `main.css` — you would stop receiving its fixes.
- **Change markup:** drop a file with the same path into your site's `views/`.
  Only that file stops updating; everything else still does.

## Requirements

Requires a Nera generator with theme support (`nera.generator` in
`package.json`). That capability is additive and not yet released; the version
range here is provisional.
