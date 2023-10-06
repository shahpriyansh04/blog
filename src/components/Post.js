import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

export default function Post({ attributes, id }) {
  return (
    <Link href={`/blog/${id}`}>
      <div className="">
        <img
          src={
            "http://localhost:1337/uploads/photo_1544006659_f0b21884ce1d_f38674ce0a.jpeg"
          }
          className=" object-cover rounded-t-lg shadow-md"
        />
        <Card className="p-0 -mt-4 cursor-pointer rounded-t-none  ">
          <CardHeader></CardHeader>
          <CardContent>
            <CardTitle>{attributes.Title}</CardTitle>
            <CardDescription className="ml-1 mt-2">
              {attributes.Description}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
