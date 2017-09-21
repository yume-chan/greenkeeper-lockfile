const gitHelpers = require('../lib/git-helpers')

const env = process.env

console.log(JSON.stringify(env));

module.exports = {
  repoSlug: env.APPVEYOR_REPO_NAME,
  branchName: env.APPVEYOR_REPO_BRANCH,
  firstPush: gitHelpers.getNumberOfCommitsOnBranch(env.APPVEYOR_REPO_BRANCH) === 1,
  correctBuild: env.APPVEYOR_PULL_REQUEST_NUMBER === '',
  uploadBuild: env.APPVEYOR_JOB_NUMBER === '1'
}
