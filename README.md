# strapboot
An interactive, customizable project template.

## Install
You can install it via NPM:

```bash
npm install -g strapboot
```

## Usage
For a new project, create a new, empty directory.
Then run the following commands and answer the questions:

```bash
cd /path/to/project/directory
strapboot
```

After that run `npm install` to install all dependencies.

### Gulp / Grunt
During the setup, you can choose if you want Gulp or Grunt as taskrunner. Whatever you choose, you can start the main tasks with the following commands:

| Task | Description |
| ---- | ----------  |
| `npm start` | Runs the `dist` task and starts `watch`. |
| `npm run dev` | This is a stripped down version of the `dist` task and also includes the `watch` task. |
| `npm run dist` | Runs only the `dist` task without `watch`. |

Check the gulpfile / grunt configs for further information.


