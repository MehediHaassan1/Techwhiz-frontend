import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen   py-8">
        <Card className="w-full max-w-xl bg-transparent">
          <CardHeader className="flex justify-center">
            <h1 className="text-2xl font-bold">Register</h1>
          </CardHeader>
          <CardBody>
            <div className="text-sm text-gray-500">
              <sup className="text-red-500">*</sup> fields are required
            </div>
            <RegisterForm />
            <div className="mt-4 flex items-center justify-between">
              <p>
                Already have an account?
                <Link
                  className="text-blue-500 hover:underline ml-2"
                  href="/login"
                >
                  Login here
                </Link>
              </p>
              <p>
                <Link
                  className="text-green-500 hover:underline ml-2"
                  href="/news-feed"
                >
                  News Feed
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
