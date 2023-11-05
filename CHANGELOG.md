# 统一提交规范

## 装 ESLint

`pnpm create @eslint/config`

### 添加 eslint

`https://mp.weixin.qq.com/s?__biz=MzI0NTc2NTEyNA==&mid=2247485900&idx=1&sn=15fa05cecdf018ceb75714329ac05826&chksm=e948cca7de3f45b1475724fab0765ed487a2f0b2efc7c99451cf2b3912ebfc5318df973c4841&token=77937750&lang=zh_CN&scene=21#wechat_redirect`

## 装 husky

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

## 使用 commitlint 校验 commit 信息格式

在提交 commit 时，能够检验 commit 信息，如果不对就不允许提交。
这样能防止开发人员提交一些杂乱、无法理解或不统一的信息。

这种情况下需要用到 commit-msg 钩子，我们先创建一个没有内容的 commit-msg。
npx husky add .husky/commit-msg ""

在 commit-msg 脚本中，我们可以通过 $1 拿到提交信息。
$1 指向的是 .git/COMMIT_EDITMSG 文件，该文件保存着最后一次提交的 commit 信息。

可以拿到 commit 信息，那我们就可以在上面做一些校验工作，比如看是否符合 feat: xxx 的格式。
这里有个问题，就是我们需要自己去声明一些规范，并且要自己去实现代码。

那，我们去找轮子，轮子找到了，它就是 `commitlint`。
commitlint 是一个命令行工具，能够做 commit 的校验，并提供了官方的校验规则，此外也支持你自己配置规则。

先安装 `commitlint`。

`yarn add -D @commitlint/cli @commitlint/config-conventional` 或
`pnpm add -D @commitlint/cli @commitlint/config-conventional`

然后创建 `commitlint.config.js` 配置文件，并添加内容，使用 `@commitlint/config-conventional` 规则

@commitlint/config-conventional 是一个经典的 commit 规范，我们需要用类似 feat: add util.js 或 fix: fix wrong text 这样的格式，具体文档见：

https://www.conventionalcommits.org/en/v1.0.0/
https://www.conventionalcommits.org/zh-hans/v1.0.0/

我们在 commit-msg 钩子上加上：
`npx --no -- commitlint --edit $1`

npx --no ：表示只使用本地项目 node_modules 下的脚本，不允许找不到的时候尝试去下载。
下载耗费时间，所以要取消，你要确保已经把命令行工具下载好。

commitlint --edit <文件名>：执行 commitlint 命令行工具，并使用 --edit 选项，从一个文件里提取 commit 内容来进行校验。
校验规则由前面说的 commitlint.config.js 配置文件来指定。

## add mobx

安装对应的依赖
`pnpm i mobx mobx-react-lite`
`pnpm i mobx mobx-react`

### mobx 支持装饰器

1. 安装依赖
   pnpm i -D @babel/plugin-proposal-decorators vite-plugin-babel

2. 配置 vite.config.ts

```typescript
import babel from "vite-plugin-babel";

return {
	plugins: [
    ...,
    babel({
			babelConfig: {
				babelrc: false,
				configFile: false,
				plugins: [["@babel/plugin-proposal-decorators", { loose: true, version: "2022-03" }]]
			}
		}),
  ]
};
```

3. 修改 tsconfig

```json
{
	"target": "ESNext",
	"useDefineForClassFields": true,
	"experimentalDecorators": true, // 启用装饰器支持。
	"emitDecoratorMetadata": true // 启用装饰器的元数据支持。
}
```

4. 修改 vs code 配置项

在设置中搜索 experimentalDecorators 确保开启了这个配置项。 // 启用装饰器支持。

5. 其他版本的安装依赖 可以忽略这步

`pnpm i -D react-app-rewired customize-cra @babel/core @babel/plugin-proposal-decorators @





## 状态管理
全局状态管理 区别和使用方式该捡一捡了babel/plugin-proposal-class-properties @babel/preset-env`
