import { Link, useNavigate } from "react-router-dom"
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js"
import OAuth from "../components/OAuth.jsx"
export default function SignIn() {
  const [formData, setFormDate] = useState({})
  const { loading, error: errorMessage } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormDate({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"))
    }
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }

      if (res.ok) {
        localStorage.setItem("token", data.token)
        dispatch(signInSuccess(data.rest))
        navigate("/")
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-12">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white ">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-lg text-white">
              BaaGH
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is the demo blog project. You can sign in for free and can read
            the different blog post and learn...
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" onChange={handleChange} />
              <TextInput
                type="email"
                placeholder="example@test.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="*******"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont have an Account?</span>
            <Link to="/sign-up" className="text-blue-700">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
