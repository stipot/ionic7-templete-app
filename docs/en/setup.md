# Set up the development environment
> Learn how to set up your local environment to develop Ionic apps and learn how to install Ionic Template App.
## Installing Ionic
Ionic apps are created and developed primarily through the Ionic  utility. The [Ionic CLI](https://ionicframework.com/docs/reference/glossary#cli) is the preferred method of installation, as it offers a wide range of dev tools and help options along the way. 

## Git
Although it's not required, the version control system Git is highly recommended. First, install the command-line utility from the [download page](https://git-scm.com/). For a GUI client, we recommend [Github Desktop](https://desktop.github.com/).
To verify the installation, open a new terminal window and run:
```
$ git --version
```

## NodeJS & npm
Almost all tooling for modern JavaScript projects is based in Node.js. The [download page](https://nodejs.org/en/download/current) has prebuilt installation packages for all platforms. We recommend selecting the LTS version to ensure best compatibility.
Node is bundled with npm, the package manager for JavaScript.
To verify the installation, open a new terminal window and run:
```
$ node --version
$ npm --version
```
## Install the Ionic CLI
Install the Ionic CLI globally with npm:
```
$ npm install -g ionic
```
## Install the app dependencies
After you have Ionic installed, you have to install all the dependencies required by the app. To do this just run the following command using a terminal inside your ionic app folder path.
```
$ npm install
```
## Code editor
The coding of the app will happen inside of a code editor. Personally we use [VS Code](https://code.visualstudio.com/), however, many people like [Atom](https://github.blog/2022-06-08-sunsetting-atom/). You are free to choose any code editor you like.
## Run the App
Now we have everything installed, we can test our Ionic App.
```
$ ionic serve
```
## Work with documents
For documentation, we use [Materal for MkDocs](https://github.com/squidfunk/mkdocs-material), built on top of [MkDocs](https://www.mkdocs.org/)
```
# Preparation. Installation in a virtual environment is recommended
pip install mkdocs-material
# View
mkdocs serve
# Update
mkdocs build
cd site
mkdocs gh-deploy --config-file ../mkdocs.yml --remote-branch docs
```
