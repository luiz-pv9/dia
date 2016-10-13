const path = require('path')

class UploadedFile {
  static extractExtensionFromFile(filename) {
    return path.extname(filename)
  }

  static extractNameFromFile(filename) {
    return filename.replace(UploadedFile.extractExtensionFromFile(filename), '')
  }

  constructor(formidableFile) {
    this.size = formidableFile.size
    this.path = formidableFile.path
    this.name = UploadedFile.extractNameFromFile(formidableFile.name)
    this.extension = UploadedFile.extractExtensionFromFile(formidableFile.name)
  }
}

module.exports = UploadedFile