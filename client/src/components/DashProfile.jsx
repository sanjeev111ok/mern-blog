import { Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

import axios from "axios"
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const filePickerRef = useRef()
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }
  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])
  console.log([imageFile])
  const uploadImage = async () => {
    const formData = new FormData()
    formData.append("file", imageFile)
    formData.append("upload_preset", "mern-blog")
    formData.append("folder", "mern")
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dziazpcgd/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent
            const percent = Math.floor((loaded * 100) / total)
            setUploadProgress(percent)
          },
        }
      )
      console.log("image uploaded", response.data)
    } catch (error) {
      console.log("Error uploading image", error)
    }
  }
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-5">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden  "
          onClick={() => filePickerRef.current.click()}
        >
          {uploadProgress > 0 && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <CircularProgressbar
                value={uploadProgress}
                text={`${uploadProgress}%`}
              />
            </div>
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]${
              uploadProgress && uploadProgress < 100 && "filter blur-sm"
            }`}
          />
        </div>{" "}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="Password" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>

      <div className="text-red-500 flex justify-between mt-6">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer ">Sign Out</span>
      </div>
    </div>
  )
}
