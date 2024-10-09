import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";

const Footer = () => {
  return (
    <div>
      <footer className="bg-muted mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Contact Information
              </h3>
              <p>123 Main St, Anytown, USA</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Email: contact@example.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:underline" href="/">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/">
                    Services
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/">
                    Team
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:underline" href="/">
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/">
                    Mobile App Dev
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/">
                    Cloud Services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="mb-2">
                Stay updated with our latest news and offers.
              </p>
              <form className="flex">
                <Input
                  className="rounded-r-none"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button className="" type="submit">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 flex justify-center items-center">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
