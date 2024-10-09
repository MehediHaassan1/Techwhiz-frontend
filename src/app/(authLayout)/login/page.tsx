import Link from "next/link";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import LoginForm from "./_component/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-black/90">
        <Card className="w-full max-w-md bg-transparent">
          <CardHeader className="flex justify-center">
            <h1 className="text-2xl font-bold">Login</h1>
          </CardHeader>
          <CardBody>
            <LoginForm />
            <div className="mt-4 flex items-center justify-between">
              <p>
                Don&apos;t have an account?
                <Link
                  className="text-blue-500 hover:underline ml-2"
                  href="/register"
                >
                  Register here
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
