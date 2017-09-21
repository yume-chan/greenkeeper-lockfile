const exec = require('child_process').execSync

const _ = require('lodash')

const env = process.env

// AppVeyor runs on Windows machines.
// Use `bash` to invoke the command.
function getNumberOfCommitsOnBranch(branch) {
  const refArgument = `$(git for-each-ref '--format=%(refname)' refs/ | grep /${branch} | head -1)`
  const notArgument = `$(git for-each-ref '--format=%(refname)' refs/ | grep -v /${branch})`
  const gitCommand = `git log ${refArgument} --oneline --not ${notArgument} | wc -l`
  const result = exec(
    `C:/cygwin/bin/bash -lc "cd $APPVEYOR_BUILD_FOLDER && ${gitCommand}"`
  ).toString()
  console.log(result);
  return _.toNumber(result)
}

module.exports = {
  repoSlug: env.APPVEYOR_REPO_NAME,
  branchName: env.APPVEYOR_REPO_BRANCH,
  firstPush: getNumberOfCommitsOnBranch(env.APPVEYOR_REPO_BRANCH) === 1,
  correctBuild: env.APPVEYOR_PULL_REQUEST_NUMBER === '',
  uploadBuild: env.APPVEYOR_JOB_NUMBER === '1'
}
