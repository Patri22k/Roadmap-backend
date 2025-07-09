# Roadmap Backend Monorepo

This is the backend monorepo for the Roadmap projects. Here are listed
links of the project descriptions:

- [Expense Tracker](https://roadmap.sh/projects/expense-tracker)
- [GitHub User Activity](https://roadmap.sh/projects/github-user-activity)
- [Personal Blog](https://roadmap.sh/projects/personal-blog)
- [Task Tracker](https://roadmap.sh/projects/task-tracker)
- [Blogging Platform API](https://roadmap.sh/projects/blogging-platform-api)
- [Weather API](https://roadmap.sh/projects/weather-api-wrapper-service)

## Project Naming Convention

Each project in this monorepo follows the naming format:
```
<project_name>=<original_branch_name>
```

This means that folders are named after the project they represent,
followed by the name of the original branch from which they were
imported, joined by an equals sign (`=`). This format helps preserve
the context of where the code came from while organizing all projects
in a unified structure.

### Example

- `weather-api=zortik`
  - This folder contains the *Weather API* project, originally
  developed in a branch named `zortik`.

## Project Importing

All projects were imported from their original repositories using
`git subtree`, which preserves commit history. Here's the command
pattern used:
```git
git remote add <project_name> URL_OF_THE_OLD_REPO
git fetch <project_name>
git subtree add --prefix=<project_name>=<original_branch_name> <project_name> master
```

### Example

```git
git remote add weather-api https://github.com/Patri22k/weather-api.git
git fetch weather-api
git subtree add --prefix=weather-api weather-api master
```

This imported the `master` branch of the original `weather-api`
repository into the folder `weather-api`.