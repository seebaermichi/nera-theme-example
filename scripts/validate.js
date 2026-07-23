// Pre-publish validation: compile every Pug template under views/.
//
// A theme is mostly declarative (Pug/CSS/YAML), so there is little to unit-test
// in the usual sense — but compiling the templates is a real gate: Pug resolves
// every include/extends at compile time, so a renamed or missing partial, or a
// syntax error, fails here rather than in a consumer's build. This is dev-only
// and never shipped (the npm tarball is `files: ["views", "assets", "config"]`).

import { readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import pug from 'pug'

const VIEWS = fileURLToPath(new URL('../views/', import.meta.url))

function walk(dir) {
    return readdirSync(dir).flatMap((name) => {
        const p = join(dir, name)
        return statSync(p).isDirectory() ? walk(p) : [p]
    })
}

const templates = walk(VIEWS).filter((f) => extname(f) === '.pug')
let failed = 0

for (const file of templates) {
    const rel = file.slice(VIEWS.length)
    try {
        pug.compileFile(file)
        console.log(`  ✓ ${rel}`)
    } catch (err) {
        failed++
        console.error(`  ✗ ${rel}: ${err.message}`)
    }
}

if (failed > 0) {
    console.error(`\n${failed} template(s) failed to compile`)
    process.exit(1)
}

console.log(`\n${templates.length} template(s) compiled cleanly`)
