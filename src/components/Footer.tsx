import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";

const Footer = () => {
  return (
    <div>
      <footer className="bg-muted mt-16 py-10">
        <div className="container mx-auto px-4">
          {/* Top Section */}
          <div className="grid md:grid-cols-4 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              <p>123 Main St, Anytown, USA</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Email: contact@blogsite.com</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:underline" href="/about-us">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/contact-us">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/privacy-policy">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Blog Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Blog Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:underline" href="/submit-post">
                    Submit a Guest Post
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/advertise">
                    Advertise with Us
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/sponsored-posts">
                    Sponsored Posts
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/write-for-us">
                    Write for Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Subscribe to our Newsletter
              </h3>
              <p className="mb-4">
                Get the latest blog updates straight to your inbox.
              </p>
              <form className="flex">
                <Input
                  aria-label="Email"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button className="rounded-xl" type="submit">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 flex justify-center items-center flex-col text-center">
            <p>
              &copy; {new Date().getFullYear()} TechWhiz All rights reserved.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="https://facebook.com" target="_blank">
                <Image
                  alt="Facebook"
                  className="w-6 h-6"
                  height="100"
                  src="/icons/facebook.svg"
                  width="100"
                />
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <Image
                  alt="Twitter"
                  className="w-6 h-6"
                  height="100"
                  src="/icons/twitter.svg"
                  width="100"
                />
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <Image
                  alt="LinkedIn"
                  className="w-6 h-6"
                  height="100"
                  src="/icons/linkedin.svg"
                  width="100"
                />
              </Link>
              <Link href="https://instagram.com" target="_blank">
                <Image
                  alt="LinkedIn"
                  className="w-6 h-6"
                  height="100"
                  src="/icons/linkedin.svg"
                  width="100"
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
