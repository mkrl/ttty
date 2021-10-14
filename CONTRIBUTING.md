# Contributing to ttty

First off, thanks for taking your time to contribute!

### Reporting Bugs

A good bug report shouldn't leave others needing to chase you up for more information. 
We use GitHub issues to track bugs and errors. If you run into an issue with the project or have a question, please follow the checklist provided in the issue template.

[Report a bug](https://github.com/mkrl/ttty/issues/new?assignees=&labels=bug&template=bug_report.md&title=).

### Suggesting Enhancements

Have something on your mind? Got a core feature you think might be cool to have implemented?

[Suggest an idea](https://github.com/mkrl/ttty/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=).


### Code contributions

Code contributions are the core of any project! If you're working on a feature or fixing a bug, be sure to have that reflected in your PR.

Please open an issue for an idea you have before jumping into the code, just so we'll have a chance to discuss it first.

Contributing your first bit of code is simple:

1. [Fork](https://github.com/mkrl/ttty/fork) the repository
2. Spin up a development instance with `npm i && npm start`
3. Make your changes following the style guides (see below)
4. Have your commit title following the convention (see below)
5. Push changes to your fork
6. Open a pull request against `master` branch

#### Styleguides

We use [standard js](https://standardjs.com/) (with minor tweaks) as our style set.

Before making a commit, you can make sure your code follows the rules it by running `npm run lint`.

The general idea for this project is to have as little code as possible, so please try to keep the bytes low.

#### Commit Messages

We use [semantic commit messages](https://www.conventionalcommits.org/en/v1.0.0/) to automatically create a changelog and publish a new package version.

The format is the following: `type(optional scope): changes made`

Here's a very short example crash course:

```
chore(docs): fix documentation typo // will not trigger a new release
fix: update default terminal settings // will trigger a patch release, minor change like fixing a bug
feat: add sound // more major change, added something new
```

### Improving The Documentation

A good docs are as good if not better than the code itself.

We currently host our pretty minimalistic documentation right in the README file with plans to have it embeded on the website later.

