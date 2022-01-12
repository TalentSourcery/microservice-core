<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [MICROSERVICE CORE](#microservice-core)
  - [1. OVERVIEW](#1-overview)
  - [2. REQUISITES](#2-requisites)
  - [3. SETUP](#3-setup)
  - [4. STARTUP](#4-startup)
  - [5. ENVIRONMENTS](#5-environments)
  - [6. DEPENDENCY MANAGEMENT](#6-dependency-management)
  - [7. DATABASE](#7-database)
  - [8. CODE STYLE](#8-code-style)
  - [9. QUALITY ASSURANCE](#9-quality-assurance)
  - [10. LOGS](#10-logs)
  - [11. EXECUTION FLOW](#11-execution-flow)
  - [12. CONTINUOUS INTEGRATION](#12-continuous-integration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# MICROSERVICE CORE

## 1. OVERVIEW

Reusable microservice core.

## 2. REQUISITES

- **Operating System - OS: Ubuntu 20.04 LTS.**
- Node.js v17.x
- Yarn v3.x
- Docker v20.x
- Docker Compose v1.29.x
- Insomnia

Beware, the following instructions may not work in a different OS.

## 3. SETUP

From the root directory:

```bash
./scripts/install.sh
```

The script won't work if you move to `/scripts` and execute it from there.

## 4. STARTUP

```bash
./scripts/start.sh
```

## 5. ENVIRONMENTS

There are 4 environments:

- `dev`
- `test`
- `stage`
- `prod`

The files for `dev` and `test` are in the repo, ask the team for `stage` and `prod` if needed.

## 6. DEPENDENCY MANAGEMENT

The dependency manager is Yarn v3.

## 7. DATABASE

The database is MongoDB, non-relational.
MongoDB is run inside a Docker container.
To get inside the Docker container which runs MongoDB:

```
docker exec -it db bash
```

To get a JavaScript REPL terminal inside MongoDB:

```
mongo
```

To add a user manually to MongoDB:

```
db
use talent-sourcery-db
db.users.insertOne({ email: 'email@domain.com', password: 'password' })
db.users.find({}).pretty()
```

## 8. CODE STYLE

The code style extends AirBNB with some custom rules.
ESLint is used to lint the codebase.
To lint the code:

```bash
yarn lint
```

It is recommended you install the ESLint extension in VSCode, which will show errors and warnings as you write the code.

## 9. QUALITY ASSURANCE

Quality is guaranteed via Behavior Driven Development - BDD.
Jest is employed for tests.
To test, run:

```bash
yarn test
```

## 10. LOGS

The core has a simple logging system, which writes info to `src/logs/info.log` and errors to `src/logs/error.log`.

## 11. EXECUTION FLOW

index > middleware > router > controller > service

## 12. CONTINUOUS INTEGRATION

GitHub actions automatically run tests for Pull Requests - PRs, and code pushes. View the Actions tab in GitHub.
