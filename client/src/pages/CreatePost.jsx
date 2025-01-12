import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import axios from "axios"
import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export default function CreatePost() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [imageUploadError, setImageUploadError] = useState(null)
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false)

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image first.")
        return
      }
      setLoading(true) // Set loading to true when uploading starts
      setImageUploadError(null) // Reset previous error

      // Create a FormData object to hold the file and send it to Cloudinary
      const formData = new FormData()
      formData.append("file", file) // 'file' is the selected image
      formData.append("upload_preset", "mern-blog") // Your Cloudinary upload preset
      formData.append("folder", "mern") // Optional: specify the folder in Cloudinary

      // Send a POST request to Cloudinary's API for image upload
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dziazpcgd/image/upload`, // Replace with your cloud name
        formData
      )

      // Get the image URL from the response and set it in the state
      setImageUrl(response.data.secure_url) // Save the uploaded image URL
      setImageUploadSuccess(true) // Set upload success state
      setLoading(false) // Set loading to false after the upload finishes
    } catch (error) {
      setImageUploadError("Error uploading image. Please try again.") // Set error message
      setImageUploadSuccess(false) // Reset success state
      setLoading(false) // Set loading to false if an error occurs
    }
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen ">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.Js</option>
            <option value="nodejs"> Node.Js</option>
            <option value="nextjs">Next.Js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={loading} // Disable button while uploading
          >
            {loading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>

        {/* Display error message */}
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}

        {/* Display success message */}
        {imageUploadSuccess && !imageUploadError && (
          <Alert color="success">Image uploaded successfully!</Alert>
        )}

        {/* Display uploaded image */}
        {imageUrl && (
          <div className="mt-4">
            <h2 className="font-semibold">Uploaded Image:</h2>
            <img src={imageUrl} alt="Uploaded" className="max-w-full mt-2" />
          </div>
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  )
}
