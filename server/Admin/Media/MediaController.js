import mediaModal from "./MediaModal.js"
import Randomstring from "randomstring"
import fs from "fs"



class MediaController {
  async Getmedia(req, res) {
    try {
      // console.log(req.files)
      // return
      const file = req.files.file
      let { mimetype, size } = file
      let name = file.name

      let extension = name?.split(".")
      extension = extension[extension.length - 1]

      name = Randomstring.generate({
        length: 12,
        charset: "alphabetic"
      }).toLowerCase()

      name = name + "." + extension
      file.name = name
      mimetype = mimetype.split("/")[0]
      // console.log(mimetype)

      if (mimetype !== "image" && mimetype !== "video") {
        mimetype = "application"
      }

      const folderName = `./uploads/${mimetype}`

      try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName)
        }
      } catch (error) {
        console.log(error)
      }

      let path = `./uploads/${mimetype}/${name}`

      const result = await file.mv(path)
      path = path.substring(1, path.length)


      let Media = await mediaModal.create({ name, mimetype, size, path, extension })
      Media = Media._doc
      console.log(Media)
      let url = `http://localhost:5000${path}`
      Media.url = url

      res.json({ message: "Sucees", media: Media })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: "Internal server error" })
    }
  }


  async ShowMedia(req, res) {
    try {

      const result = await mediaModal.aggregate([
        {
          $match: {
            $or: [
              { mimetype: "image" },
              { mimetype: "video" }
            ]
          }
        },
        {
          $addFields: {
            url: {
              $concat: ["http://localhost:5000", "$path"]
            }
          }
        }
      ]);

      if (result) {
        return res.status(200).send({ message: "Sucess", result })
      }

      return res.status(400).send({ message: "Somthing went wrong" })

    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: "Internal Server Error" })
    }
  }
}

const mediaController = new MediaController()
export default mediaController