const formidable = require('formidable')
const UploadedFile = require('../uploaded-file')

// The parseBody function is just a wrapper around formidable, which is an
// excelent library for parsing form data, including multipart with files.
module.exports = function parseRequestBody(conn) {
  let form = new formidable.IncomingForm()
  return new Promise((resolve, reject) => {
    form.parse(conn.req, (err, fields, files) => {
      if(err) {
        return reject(err)
      }

      let uploadedFiles = {}
      Object.keys(files).forEach(fileField => {
        uploadedFiles[fileField] = new UploadedFile(files[fileField])
      })

      conn.addParams(uploadedFiles)
      conn.addParams(fields)
      resolve(conn)
    })
  })
}
