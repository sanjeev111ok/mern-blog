import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import { BsFacebook, BsInstagram, BsTiktok, BsWhatsapp } from "react-icons/bs"

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500 mb-5">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-3">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white "
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-lg text-white">
                BaaGH
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-6 sm:grid-cols-3 sm:gap-6">
            <div>
              {" "}
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Js Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Baagh Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              {" "}
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/sanjeev111ok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/sanjeev-shrestha-7378a9280/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              {" "}
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms and Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Baagh's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6  mt-4 sm:justify-center">
            <Footer.Icon
              href="https://www.facebook.com/sanjeev.acharjushrestha"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://www.instagram.com/sanjeev.acharjushrestha/"
              icon={BsInstagram}
            />
            <Footer.Icon href="https://web.whatsapp.com/" icon={BsWhatsapp} />
            <Footer.Icon
              href="https://www.tiktok.com/@sanjeevstha60?lang=en"
              icon={BsTiktok}
            />
          </div>
        </div>
      </div>
    </Footer>
  )
}
