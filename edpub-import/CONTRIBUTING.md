# How to contribute

## Testing

Add tests to the CI/CD deployment.

## Submitting changes

### Git workflow

Create a new issue in GitHub. Then, follow [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)

### Commit messages

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

    $ git commit -m "A brief summary of the commit
    >
    > A paragraph describing what changed and its impact."

### Merge Requests

Please make a new GitHub Pull Request with a clear list of what you've done (read more [about pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)). Assign merge requests to someone else for a code review. Don't approve your own requests. We are actively trying to include tests; please cover the code you touch. Follow our coding standards (below). Make all of your commits atomic (one feature per commit).

## Coding standards

General coding standards are:

1. document as you go
2. make your code readable
3. think about security from the start
4. use a standard style guide (such as [PEP 8](https://www.python.org/dev/peps/pep-0008/))
5. use a linter (such as [pylint](https://www.pylint.org/))

An IDE, such as [VS Code](https://code.visualstudio.com/), helps to create and maintain beautiful code.
