# How to contribute!

## If you want to just contribute a guide, add text - it is much easier - [read here](docs/setup-dev.md)

You only have to do below if you want to add new functionality with Javascript!

## Set up deb

I recommened using VSCode and these extensions https://marketplace.visualstudio.com/items?itemName=jawandarajbir.react-vscode-extension-pack

1. Download Node https://nodejs.org/en/
  - run `node -v` to make sure it installed
2. Download yarn: `npm install -g yarn`
3. Clone this directory - `git clone https://github.com/PittCSWiki/pittcswiki.github.io.git`
4. `yarn install`
5. Ask a CS Officer for the `.env` file (Stored in `PittCSC Folder > Wiki > DATA > .env`). This file has private environment variables that are
used with the site. For example
Google Sheets API key (used for course testimonial data) and Algolia search (Aloglia the API used to make searching fast)
  - Save this file in the root of the directory

Congrats! Now, whenever you are ready to start editing the code, make sure you have the latest code by doing `git pull`. Then,
you can do:

```
yarn start
```

This might take 10ish minutes the first time you do this, but then it will be faster. Eventually, you can open up localhost:8000 in your web browser!

It is likely you will run into caching issues when developing! This is when you make a change, but you can't see it show up. Open up the developer tools, click the Network tab, and then click disable cache (follow [here](https://stackoverflow.com/questions/5690269/disabling-chrome-cache-for-website-development) fro instructions). You can try hard reloading. Also going in the developer tools, then going to Application -> Clear storage, clear site data will help!

`src/pages` is the folder where all of the website routes live. For example, `localhost:8000/courses` corresponds to 
the page defined in `src/page/courses.js`. 

Markdown files are converted to HTML pages with the `src/components/templates/guides-template` file.  Read more about guides

If you are curious about how this project works and want to become a serious contributer - [read and follow these tutorials](https://www.gatsbyjs.org/tutorial/) 

Thanks for contributing!
