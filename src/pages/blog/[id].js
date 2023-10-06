import Markdown from "react-markdown";
import moment from "moment";
import gfm from "remark-gfm";
import remarkGfm from "remark-gfm";

export default function Page({ data }) {
  const markdown = `${data.content}`;
  console.log(markdown);
  console.log(data);

  return (
    <div className=" py-4  items-center flex flex-col justify-center">
      <div className="w-3/5">
        <div className="   p-0">
          <img
            src={
              "http://localhost:1337/uploads/photo_1544006659_f0b21884ce1d_f38674ce0a.jpeg"
            }
            className=" object-fit w-full h-[550px] sca le-75 rounded-t-lg shadow-md"
          />
        </div>
        <div className="text-left mt-6">
          <div className="flex justify-between items-end ">
            <p className="text-5xl ">{data.Title}</p>
            <div>
              <p>
                by <span className="font-semibold">{data.author}</span>
              </p>
              <p className="text-gray-500">
                {moment(data.publishedAt).format("Do MMMM, YYYY")}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Markdown children={markdown} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, req, response }) {
  console.log(params.id);
  const res = await fetch(`http://127.0.0.1:1337/api/blogs/${params.id}`);
  const data = await res.json();
  return {
    props: { data: data.data.attributes },
  };
  return {
    props: {},
  };
}
