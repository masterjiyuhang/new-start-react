# 统一提交规范

## 装ESLint 
`pnpm create @eslint/config`

## 装husky

1. `pnpm i -D husky lint-staged`

husky: You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. Husky supports all Git hooks.
https://typicode.github.io/husky/#/

lint-staged: 用于实现每次提交只检查本次提交所修改的文件

2. 在 package.json 添加 scripts

```js
{
  "prepare": "husky install",
  "lint": "eslint src",
  "lint-staged": "lint-staged"
}
```

3. 执行 pnpm run prepare 来启动 husky
   执行完了之后，会在根目录下出现一个名为`.husky`的文件。

4. 创建一个前置 hook
   Create a hook
   To add a command to a hook or create a new one, use husky add <file> [cmd] (don't forget to run husky install before).

   npx husky add .husky/pre-commit "pnpm run lint-staged"
   执行完根目录会自动生成一个 .husky/pre-commit 脚本。

5. 创建 `.lintstagedrc` 配置文件

```js
{
  "src/**/*.{js,vue}": "npm run lint"
}
```

到了这里，代码提交前的 eslint 校验已经配置好了。当然，提前是你已经配置好 Eslint 了。
