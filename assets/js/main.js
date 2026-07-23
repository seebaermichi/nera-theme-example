// theme-example — entry point.
//
// This is the only file with a side effect (it runs on load). Any real
// behaviour should live in importable, side-effect-free modules alongside it,
// so a site can override just this ten-line entry and compose the theme's
// modules itself without forking them (ROADMAP-themes.md §2c).

console.info('[theme-example] loaded')
