# Fulll hiring process submission

## ALGO

```sh
# Install dependencies
npm i

# Run tests
npm run test
```

## BACKEND

```sh
# Install dependencies
npm i

# Run tests
npm run test

# Build dist & fleet executable
npm run build

# Use the fleet executable
./fleet

# Note that to use ./fleet localize-vehicule with negative values, the "-" character need to be escaped
# Example :
./fleet localize-vehicle <fleetId> <vehiculeId> 123 /-12 456
```

### Repositories

- Two kinds of repositories are implemented :
  - MemoryRepositories : they use the app memory
  - SQLiteRepositories : they use SQLite and a DB file
- You can easily switch between those kind of repositories while instantiating the RepositoriesContainer : either in the Before step (tests) or in the index.ts entrty file (app).

### Step 3

- To improve code quality we could :

  1. Enforce coding style using ESlint -> Ensure consistency and readability.
  2. Enforce commit style using commitlint -> Ensure consistency and readability.
  3. Improve test coverage (create_user.feature for example).

- A CI/CD pipeline could be setup using GitHubActions :

  1. Checkout to the repository in an Ubuntu container (Build job)
  2. Setup the node.js env in this container (Build job)
  3. Run tests (Build job)
  4. Run build (Build job)
  5. Deploy build artifacts to a VPS or any other platform (Deploy job)
