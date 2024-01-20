# ionic7-full-starter-app

The student project to build complete Mobile & PWA starter app template
[Demo application](https://ionic7-templete-app-public.web.app/)

# Documentation
Full [Documentation](https://stipot.github.io/ionic7-templete-app/).
## Minimum requirements
- [NodeJS 16.17](https://nodejs.org/en/blog/release/v16.17.0)
```
node -v
```

## Install dependencies

Run `npm install` to install the project dependencies.

## Install ionic

npm install -g cordova ionic

## Add npm as a variable

value: C:\Users\"username"\AppData\Roaming\npm
name: PATH

## Set policy in terminal

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

### To test the app in the browser

Run `ionic serve` to start a live-reload dev server

## Development Workflow

Run `ionic build` or `ionic build --prod` to build the project

### To test the app as a Native App

This project uses [Capacitor](https://capacitor.ionicframework.com/docs/) (spiritual successor to Cordova).

Before starting make sure to read the [Capacitor Required Dependencies](https://capacitor.ionicframework.com/docs/getting-started/dependencies).

The Capacitor workflow involves a few consistent tasks:

- [Develop and build your Web App](https://capacitor.ionicframework.com/docs/basics/workflow/#1-develop-and-build-your-web-app)
- [Copy your Web Assets](https://capacitor.ionicframework.com/docs/basics/workflow/#2-copy-your-web-assets)
- [Open your Native IDE](https://capacitor.ionicframework.com/docs/basics/workflow/#3-open-your-native-ide)
- [Periodic Maintenance](https://capacitor.ionicframework.com/docs/basics/workflow/#4-periodic-maintenance)

#### iOS Platform

This app has an ios folder which contains the iOS native app.
Read how to [build this app for iOS](https://capacitor.ionicframework.com/docs/basics/building-your-app#ios).

#### Android Platform

This app has an android folder which contains the Android native app.
Read how to [build this app for Android](https://capacitor.ionicframework.com/docs/basics/building-your-app#android).

### Want to use Cordova?

The PRO version of the template uses Capacitor instead of Cordova, however, if you are not yet ready to use it, in the following link we show you how to remove Capacitor and add Cordova to this project: https://ionic-4-full-starter-app-docs.ionicthemes.com/capacitor#steps-to-remove-capacitor-and-add-cordova

## Support

Drop us a line to contact@ionicthemes.com

## Acknowledgements

This template uses some icons inspired in [Flaticon](https://www.flaticon.com/). If you want to use the original icons in your app, please make sure you grab a new license that fit your use case when modifying this template. We currently use the `Free for commercial use WITH ATTRIBUTION` license in this template as a way to showcase and promote the awesome work and [designs by **catkuro** from Flaticon](https://www.flaticon.com/packs/home-decor).

### Committing code

To ensure code quality, we follow and enforce the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)
These guidelines define a Commit Message Format and certain rules that will help teams achieve consistency with version control and source code management practices.

#### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: (even more [samples](https://github.com/angular/angular/commits/master))

```
docs(changelog): update changelog to beta.5
```

```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

#### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

#### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **doc**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **ref**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

#### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages.

The following is the list of supported scopes:

- **walkthrough-page**
- **login-page**
- **preload-image-component**

There are currently a few exceptions:

- **packaging**: used for changes that change the npm package layout in all of our packages, e.g.
  public path changes, package.json changes done to all packages, d.ts file/format changes, changes
  to bundles, etc.
- **changelog**: used for updating the release notes in CHANGELOG.md
- none/empty string: useful for `style`, `test` and `refactor` changes that are done across all
  packages (e.g. `style: add missing semicolons`) and for docs changes that are not related to a
  specific package (e.g. `docs: fix typo in tutorial`).

#### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

#### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

## Troubleshooting

### See what dependencies and versions you have installed in your project

This is useful to track compilation ERRORS

- Run `npm ls` to list all installed packages
- To find the installed version of a specific package run `npm list package_name` (ex: `npm list @ionic/core`)
- To find out which packages need to be updated, you can use `npm outdated -g --depth=0`
- In particular, run `ng version` to output Angular CLI version and all Angular related installed packages and versions
## Windows Environment Variables error
- setting environment variables, if an error occurs in the parameters of the ionic serve command(Error command not found)
Solution:
Open the System, search for "Changes" select: "Change the environment variables of the current user".
In the window that opens, select the user environment variables table for %USER%, the Path variable Parameter "Change", "create" a new path
Path parameter Path :%AppData%\npm "It is recommended to check the operation of the path through the line of the file explorer "
Then click "ok" and !restart the computer! to save changes.

#### Todo-list

  ng generate component todo-list
  ng generate service todo-list

TODO:
- текстовое поля для ввода задачи как в weeek.ru
- отображение блоков с задачами (название+описание)
- данные хранить локально в (src/asserts/sample-data или создать папку в src/asserts/ в формате json)
- reorder items https://ionicframework.jp/docs/v6/api/reorder/