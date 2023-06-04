# Follow these steps to contribute

1.  Go to preferred folder in your computer and paste the following command after forking our repository (Only one of it if you don't have ssh setup then go with HTTP command)

```
git clone https://github.com/<YOUR-USERNAME>/Bon-Hack-tit.git
```

2.  Navigate to the project folder

```
cd Bon-Hack-tit/
```

3.  Install dependencies

```bash
npm i
```

4.  Now do ahead and create a new branch and move to the branch

```bash
git checkout -b fix-issue-<ISSUE-NUMBER>
```

> **Note**: Replace `<ISSUE-NUMBER>` with the issue number you are working on

5.  Run in local

```bash
npm start
```

> Add new features or fix bugs according to your issue number

6.  After done you can now push this changes, for doing that follow the following command chain

- `git status -s` (Shows the changed files)
- `git add --all` (Will add all the files to staging area)
- `git commit -m "feat/docs/fix: <EXPLAIN-YOUR_CHANGES>"`

  > **Note**: Replace `<EXPLAIN-YOUR_CHANGES>` with the changes you have made. Also, follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) for writing commit messages

- `git remote add upstream https://github.com/coder12git/Bon-Hack-tit.git`
- `git push origin fix-issue-<ISSUE-NUMBER>`

7.  After this go to your forked GitHub repository and go to `Pull Request` section. Now you might be able to see a pop up saying **Pull Request**. Click on the popup and you will be redirected to pull request page

8.  Now fill in the form template of the pull request and give the necessary description.

9.  Click on **Submit**

10. Hurray! You just made your first contribution to this project 🎉

11. Wait for your pull request to be reviewed and merged.

## Useful Links

- [GitHub Forking Guide](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
- [GitHub Pull Requests Guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [GitHub Issues Guide](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
