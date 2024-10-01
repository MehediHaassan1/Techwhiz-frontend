"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

export default function Author() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(25000);

    const handleFollow = () => {
        if (isFollowing) {
            setFollowerCount((prevCount) => prevCount - 1);
        } else {
            setFollowerCount((prevCount) => prevCount + 1);
        }
        setIsFollowing(!isFollowing);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex items-start space-x-4 mb-6">
                <Avatar
                    src="/placeholder.svg?height=40&width=40"
                    alt="Author"
                    fallback
                />
                <div className="flex-grow">
                    <h1 className="text-2xl font-bold flex items-center">
                        Written by Melody Koh <span className="ml-2">😉</span>
                    </h1>
                    <p className="text-muted-foreground">
                        {followerCount.toLocaleString()} Followers · Writer for
                        Prototypr
                    </p>
                    <p className="mt-2">
                        Senior product designer{" "}
                        <Star className="inline-block w-4 h-4 text-yellow-400" />{" "}
                        I write provocative things because I am a provocative
                        person I
                    </p>
                    <p>
                        Follow on LinkedIn:{" "}
                        <Link
                            href="https://shorturl.at/fwyQ0"
                            className="text-blue-500 hover:underline"
                        >
                            https://shorturl.at/fwyQ0
                        </Link>
                    </p>
                </div>
                <div className="flex flex-col space-y-2">
                    <Button
                        onClick={handleFollow}
                        variant={isFollowing ? "light" : "flat"}
                        className="rounded"
                    >
                        {isFollowing ? "Following" : "Follow"}
                    </Button>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-4">
                More from Melody Koh 😉 and Prototypr
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <h1 className="text-lg">
                            I design and develop experiences that make people's
                            lives simple.
                        </h1>
                    </CardHeader>
                    <CardBody>
                        <img
                            src="/placeholder.svg?height=200&width=400"
                            alt="Laptop showing design"
                            className="w-full h-40 object-cover rounded-md"
                        />
                        <div className="flex items-center mt-2">
                            <Avatar
                                src="/placeholder.svg?height=40&width=40"
                                alt="Author"
                                fallback
                            />
                            <p className="text-sm">
                                Melody Koh 😉 in Prototypr
                            </p>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>
                        <h1 className="text-lg">
                            Exploring new design tools and techniques
                        </h1>
                    </CardHeader>
                    <CardBody>
                        <img
                            src="/placeholder.svg?height=200&width=400"
                            alt="Hands typing on laptop"
                            className="w-full h-40 object-cover rounded-md"
                        />
                        <div className="flex items-center mt-2">
                            <Avatar
                                src="/placeholder.svg?height=40&width=40"
                                alt="Author"
                                fallback
                            />
                            <p className="text-sm">
                                Melody Koh 😉 in Prototypr
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
