import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import axios from "axios"
import { useEffect, useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

export default function UpdatePost() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  })
  const [publishError, setPublishError] = useState(null)
  const [publishSuccess, setPublishSuccess] = useState(false)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false)

  const navigate = useNavigate()
  const { postId } = useParams()
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`)
        const data = await res.json()
        if (!res.ok) {
          setPublishError(data.message)
          return
        }
        if (res.ok) {
          setPublishError(null)
          setFormData({
            title: data.posts[0].title || "",
            category: data.posts[0].category || "",
            content: data.posts[0].content || "",
            image: data.posts[0].image || "",
          })
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchPost()
  }, [postId])

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image first.")
        return
      }
      setLoading(true)
      setImageUploadError(null)

      const uploadData = new FormData()
      uploadData.append("file", file)
      uploadData.append("upload_preset", "mern-blog")
      uploadData.append("folder", "mern")

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dziazpcgd/image/upload`,
        uploadData
      )

      setImageUrl(response.data.secure_url)
      setFormData((prevData) => ({
        ...prevData,
        image: response.data.secure_url,
      }))
      setImageUploadSuccess(true)
      setLoading(false)
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Error uploading image. Please try again."
      setImageUploadError(errorMessage)
      setImageUploadSuccess(false)
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value
    setFormData((prevData) => ({
      ...prevData,
      category: selectedCategory,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      )

      const data = await res.json()

      if (res.ok) {
        setPublishSuccess(true)
        navigate(`/post/${data.slug}`)
      } else {
        setPublishError(
          data.message || "Error creating post. Please try again."
        )
      }
    } catch (error) {
      setPublishError(
        error?.message || "Error creating post. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            name="title"
            className="flex-1"
            onChange={handleInputChange}
            value={formData.title || ""}
          />
          <Select
            name="category"
            value={formData.category || ""}
            onChange={handleCategoryChange}
          >
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.Js</option>
            <option value="nodejs">Node.Js</option>
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
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>

        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {imageUploadSuccess && !imageUploadError && (
          <Alert color="success">Image uploaded successfully!</Alert>
        )}

        {formData.image && (
          <div className="mt-4">
            <h2 className="font-semibold">Uploaded Image:</h2>
            <img
              src={formData.image}
              alt="Uploaded"
              className="max-w-full mt-2"
            />
          </div>
        )}

        <ReactQuill
          theme="snow"
          value={formData.content || ""}
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) =>
            setFormData((prevData) => ({
              ...prevData,
              content: value,
            }))
          }
        />
        {publishError && <Alert color="failure">{publishError}</Alert>}
        {publishSuccess && !publishError && (
          <Alert color="success">Post published successfully!</Alert>
        )}
        <Button type="submit" gradientDuoTone="purpleToPink" disabled={loading}>
          {loading ? "Submitting..." : "Update Post"}
        </Button>
      </form>
    </div>
  )
}
