## HTML email generator with Gulp and Nunjucks
This is a simple Yeoman generator for HTML emails.

It allows for creating a simple scaffold, useful for a more modular workflow.

### How to install
#### Prerequisites
1. [npm](https://www.npmjs.com/get-npm)
2. [Yeoman](http://yeoman.io/learning/)

#### Generator
1. Clone this repository and `cd` into it, then run `npm install`
2. Run `npm link` to use the generator locally

#### Creating a new presentation
1. Create a new folder for your email outside of the generator directory 
  and `cd` into it 
2. Run `yo email-gulp` and answer a few questions - the files will be generated
3. Run `npm install` (or `yarn install`) 
4. Run `gulp` - - if you haven't installed `gulp` before and don't want to 
  install it globally, run `npm link gulp`
5. Go to `localhost:8000`

### How to use
When you run `gulp`, the email files will be generated in the `build` directory. 
Every time you add or edit a partial, it will update the files, so just reload in 
the browser. When you're happy with your email, use the `index.html` file in the
`build` folder for your template to test it - remember to upload all your files
for testing.

####  Add a new partial 
Create a new `.nunjucks` file to the `src/templates/partials` directory. 
Remeber to include it in your `index.nunjucks`.

#### Add new CSS styles
You can edit `src/sass/inline.scss` and `src/sass/embedded.scss` directly. If you want 
to add a new file, you can add a partial file `src/sass/_<name>.scss` (mind the underscore) 
and include it in the appropriate file.

### Notes
This is a work in progress.

### To-do
1. Rework Gulp to update the asset paths
2. Add a generator for a nunjucks partial
3. Add a generator for a new style partial
4. Write more about testing templates
