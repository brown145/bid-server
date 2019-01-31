-- v0.0.0 --------------------------------------------------

VERSION DONE
 [√] Functionalize hooks
   - look at common or authorization hooks to replace custom
   - make hooks single action; not complex
 [√] Associate to current user hook
 [√] Use hooks.disable() to prevent deleting: https://feathers-plus.github.io/v1/feathers-hooks-common/#disallow
    - restrict CRUD actions (ex no delete)
 [x] Use result & dispatch to format output (may require formatting nested props?)
    - remove the formatId
 [√] Use populate to lookup related info
 [x] getByDot seems good for getting profile props from google

 Version Tooling
  [√] eslint not working
  [ ] npm scripts
    [√] nodemon
    [x] jest watch

 Version Review
  [√] review: https://feathers-plus.github.io/v1/feathers-hooks-common/guide.html

 Version User Management
  [√] Associate to current user hook
  [√] User GET restrict to owner
    [ ] test create user and CRUD from API; only get should work
    [ ] find should work for all until we add isAdmin concept

Simplificaiton
  [√] remove messages service (DM not needed)
  [√] remove rooms service (assume only being used by one team)

Auth Tool
 [√] Hardcode approved user whitelist
 [√] Hardcode admin user whitelist
 [√] Display userType in response

Tests - very basic
  - see: https://blog.feathersjs.com/testing-feathers-applications-eaf1a323d2d9
  [√] hooks
  [√] services
  [√] utilities

VERSION NEXT
logging
  [√] keep some kind of log
  [√] Use app hooks for logging

VERSION FUTURE
Dockerize
  - setup Docker
  - enable local Docker use
  - DB setup with Docker

Git
 - publish as private repo

Productionize
  - review configs
  - review env variables
  - set version number

Host
  - host on heroku or aws



-- v1.0.0 --------------------------------------------------

Tests - 85% coverage
  - see: https://blog.feathersjs.com/testing-feathers-applications-eaf1a323d2d9
  [ ] hooks
  [ ] services
  [ ] utilities

DB
 - pro/con NEDB -> can docker and aws?
 - switch to mongodb ???
 - max NEDB file size ???

Versioning API
 - ex: /api/v1/bids/

Admin
 - isAdmin for given users
    - allow owner/admin edits to names ect...
 - Use when and disallow to prevent edits to room/issues names

 - https://github.com/feathersjs-ecosystem/feathers-authentication-hooks#restricttoowner

-- v1.1.0 --------------------------------------------------

FE Client
 - something simple

-- v1.2.0 --------------------------------------------------


Rooms
  - create rooms service
  - use channel to restrict services by room
  - publish to channels not everyone
  - Users can join/leave rooms (or should this just be channels?)
   -> channels are only useful for realtime events; so i think we still want rooms
   -> https://stackoverflow.com/a/6333146

Validation
 - validate (joi or yup)
 - https://feathers-plus.github.io/v1/feathers-hooks-common/guide.html#Example

fastjoin
 - fastjoin instead of populate?
 - https://feathers-plus.github.io/v1/feathers-hooks-common/guide.html#fastJoin


-- v1.3.0 --------------------------------------------------

 Tooling
  - pagination in admin html
  - admin delete/archive room and related data
  - admin tables > search, sort, pagination
  - issue import / multi create issues in room
  - helath check endpoint

Rounds
- multiple rounds of bidding
- end/stop or close room concept
   - bidding stats (REST only)
 - custom errors on invalid bid values
 - custom error on bid before round is set
 - issue filed bid round / bid filed round

-- vX.X.X --------------------------------------------------

messaging
 - support room messages
 - support direct messages

 -- vX.X.X --------------------------------------------------

graphql
 - @feathers-plus/graphql





USER
 * id
 * displayName

ROOM
 * id: object_id
 * name: string
 * ownerId: object_id
 * memberIds: array or user ids

ISSUE
 * id: object_id
 * roomId: room id
 * name: string

BID
 * id: object_id
 * issueId: issue id
 * userId: user id
 * value: number
