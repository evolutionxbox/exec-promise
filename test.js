console.clear()

const { exec } = require('child_process')
const log = require('npmlog')

const sleep = delay => new Promise(fn => setTimeout(fn, delay))

const execp = cmd => new Promise((s,f) => exec(cmd, (e, o, _) => e ? f(e) : s(o)))

// exec('git status test.js', (a, b, c) => {
//   log.notice('',b,c)
// 
//   exec('git status --short --branch .gitignore', (a, b, c) => {
//     log.notice('',b,c)
//   })
// })

// sleep(200)
//   .then(_ => {
//     log.notice('200')
//     sleep(300)
//       .then(_ => {
//         log.notice('300')
//       })
//   })

execp('git add test.js')
  .then(_ => {
    log.notice('add', _)
    execp('git commit -m "test $(date +%F-%H%M%S)"')
      .then(_ => {
        log.notice('commit', _)
        execp('git status')
          .then(_ => {
            log.notice('status', _)
          })
      })
  })
