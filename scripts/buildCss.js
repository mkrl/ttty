const { exec } = require('child_process')
const { writeFileSync } = require('fs')

const INPUT_FILE = './src/ttty.css'
const OUTPUT_FILE = './src/helpers/style.generated.ts'

const NOTICE =
  `/*
  THIS FILE WAS AUTOMATICALLY GENERATED
  Do not modify it directly. To make style changes please go to ${INPUT_FILE}
*/`

const getFile = style =>
  `${NOTICE}
const TERMINAL_STYLE =
  '${style}'

export default TERMINAL_STYLE
`

// Minifies one single css file and compiles it into a style.generated.ts module
exec(`./node_modules/.bin/esbuild ${INPUT_FILE} --minify`, (error, stdout, stderr) => {
  if (error) {
    console.log(`ERR: ${error.message}`)
    return
  }
  if (stderr) {
    console.log(`ERR: ${stderr}`)
    return
  }
  writeFileSync(OUTPUT_FILE, getFile(stdout.trim()))
})
