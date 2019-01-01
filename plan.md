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


VERSION NEXT
 Version Tooling
  [√] eslint not working
  [ ] npm scripts
    [√] nodemon
    [ ] jest watch

VERSION FUTURE
 - review: https://feathers-plus.github.io/v1/feathers-hooks-common/guide.html

 Version User Management
  - Users and join/leave rooms (or should this just be channels?)
  - Associate to current user hook
  - User get restrict to owner
    - test create user and CRUD from API; only get should work
    - find should work for all until we add isAdmin concept

 Version Auth Tool
 - Move from Google+ to bitbucket

 Version Admin
 - isAdmin for given users
    - allow owner/admin edits to names ect...
 - Use when and disallow to prevent edits to room/issues names

 Version Tests
  - create jest tests

 Version logging
  - keep some kind of log
  - Use app hooks for logging

 Version Chanels
  - use channel to restrict services by room
  - publish to channels not everyone

 Version Rounds
 - multiple rounds of bidding
 - end/stop or close room concept
    - bidding stats (REST only)
  - custom errors on invalid bid values
  - custom error on bid before round is set
  - issue filed bid round / bid filed round

 Version messaging
  - support room messages
  - support direct messages

 Version Tooling
  - pagination in admin html
  - admin delete/archive room and related data
  - admin tables > search, sort, pagination
  - issue import / multi create issues in room

 Version Productionize
  - review logging
  - publish to git
  - switch to mongodb ???
  - max NEDB file size ???
  - host on heroku or aws
  - review configs
  - review env variables





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
