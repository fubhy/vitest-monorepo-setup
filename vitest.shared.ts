import * as path from "node:path"
import type { UserConfig } from "vitest/config"

const alias = (pkg: string) => {
  const name = `@org/repo-${pkg}`
  const target = process.env.TEST_DIST !== undefined ? "dist/dist/esm" : "src"
  return ({
    [`${name}/test`]: path.join(__dirname, "packages", pkg, "test"),
    [`${name}`]: path.join(__dirname, "packages", pkg, target)
  })
}

// This is a workaround, see https://github.com/vitest-dev/vitest/issues/4744
const config: UserConfig = {
  esbuild: {
    target: "es2020"
  },
  test: {
    setupFiles: [],
    fakeTimers: {
      toFake: undefined
    },
    sequence: {
      concurrent: true
    },
    include: ["test/**/*.test.ts"],
    alias: {
      ...alias("schema"),
    }
  }
}

export default config
