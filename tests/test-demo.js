import test from 'ava'
import {Application} from 'spectron'
import path from 'path'

const electron = path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
const args = path.join(__dirname, '..', 'src', 'index.js')

test.beforeEach(async t => {
  t.context.app = new Application({
    path: electron,
    args: [args]
  })

  await t.context.app.start()
})

test.afterEach.always(async t => {
  await t.context.app.stop()
})

test(async t => {
  const app = t.context.app
  await app.client.waitUntilWindowLoaded()

  const win = app.browserWindow
  t.is(await app.client.getWindowCount(), 2)
  t.false(await win.isMinimized())
  t.false(await win.isDevToolsOpened())
  t.true(await win.isVisible())
  t.true(await win.isFocused())

  const {width, height} = await win.getBounds()
  t.true(width > 0)
  t.true(height > 0)
})
