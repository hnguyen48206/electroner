const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./') 
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'Electron-tutorial-app-win32-ia32/'),
    authors: 'HoangN',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'vcl.exe',
    setupExe: 'vcl.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
  })
}

// var electronInstaller = require('electron-winstaller');
// const path = require('path');
// const rootPath = path.join('./')
// const outPath = path.join(rootPath, 'release-builds')

// resultPromise = electronInstaller.createWindowsInstaller({
//   // appDirectory: '/tmp/build/my-app-64',
//   // outputDirectory: '/tmp/build/installer64',
//   // authors: 'VNPT Beer',
//   // exe: 'vcl.exe'
//   appDirectory: path.join(outPath, 'Electron-tutorial-app-win32-ia32/'),
//   authors: 'HoangN',
//   noMsi: true,
//   outputDirectory: path.join(outPath, 'windows-installer'),
//   exe: 'vcl.exe',
//   setupExe: 'vcl.exe',
//   setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
// });

// resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));