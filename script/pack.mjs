import builder from 'electron-builder'
import isMac from 'licia/isMac.js'

cd('dist')

const pkg = await fs.readJson('package.json')

let publishChannel = '${productName}-latest'
if (isMac && process.arch !== 'arm64') {
  publishChannel = '${productName}-latest-${arch}'
}

const config = {
  appId: pkg.appId,
  directories: {
    output: `../release/${pkg.version}`,
  },
  files: ['main', 'preload', 'renderer', 'adb', 'server'],
  asarUnpack: ['adb/**/*', 'server/**/*'],
  artifactName: '${productName}-${version}-${os}-${arch}.${ext}',
  nsis: {
    allowToChangeInstallationDirectory: true,
    oneClick: false,
    installerSidebar: 'build/installerSidebar.bmp',
  },
  win: {
    target: [
      {
        target: 'nsis',
      },
    ],
  },
  mac: {
    electronLanguages: ['zh_CN', 'en'],
    target: [
      {
        target: 'dmg',
      },
    ],
  },
  publish: {
    provider: 'generic',
    url: 'https://aya-releases.josephzins.com/',  // Change this to your server
    channel: publishChannel,
  },
}

await builder.build({
  config,
})
