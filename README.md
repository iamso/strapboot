# strapboot
An interactive project template.

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

### Gulp
You can start the main tasks with the following commands:

| Task | Description |
| ---- | ----------  |
| `npm start` | Runs the `dev` task. This also includes the `watch` task. |
| `npm run dist` | Runs the `dist` task. |

Check the gulpfile for further information.

## Caveat

Support for IE and early Edge versions (before Chromium) has been dropped. Use at your own risk.

## License

[MIT License](LICENSE)
