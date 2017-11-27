const {dialog} = require('electron').remote
var ncp = require('ncp').ncp
var fs = require('fs')
var app = new Vue({
  el: '#app',
  data: {
    welcome: true,
    chooseInput: false,
    sourceDir: null,
    chooseDestWindow: false,
    destDir: null,
    chooseBackupWindow: false,
    backupDir: null,
    finalLoader: false,
    runBTNText: 'Run!',
    runBTNLoading: false,
    BTNLoading: false
  },
  methods: {
    toInput: function () {
      this.welcome = false
      this.chooseInput = true
    },
    chooseSource: function () {
      this.BTNLoading = true
      this.sourceDir = dialog.showOpenDialog({properties: ['openDirectory']})
      this.BTNLoading = false
      if (this.sourceDir) {
        this.chooseInput = false
        this.chooseDestWindow = true
      }
    },
    chooseDest: function () {
      this.BTNLoading = true
      this.destDir = dialog.showOpenDialog({properties: ['openDirectory']})
      this.BTNLoading = false
      if (this.destDir) {
        this.chooseDestWindow = false
        this.chooseBackupWindow = true
      }
    },
    chooseBackup: function () {
      this.BTNLoading = true
      this.backupDir = dialog.showOpenDialog({properties: ['openDirectory']})
      this.BTNLoading = false
      if (this.backupDir) {
        this.chooseBackupWindow = false
        this.finalLoader = true
      }
    },
    run: function () {
      function copyFile (source, target, cb) {
        var cbCalled = false

        var rd = fs.createReadStream(source)
        rd.on('error', function (err) {
          done(err)
        })
        var wr = fs.createWriteStream(target)
        wr.on('error', function (err) {
          done(err)
        })
        wr.on('close', function (ex) {
          done()
        })
        rd.pipe(wr)

        function done (err) {
          if (!cbCalled) {
            window.alert(err)
            cbCalled = true
          }
        }
      }
      this.runBTNText = 'loading'
      this.runBTNLoading = true
      ncp(this.sourceDir[0], this.destDir[0], function (err) {
        if (err) {
          return console.error(err)
        }
        console.log('done!')
      })

      this.runBTNLoading = false
      this.runBTNText = 'Done!'
    }
  }

})
