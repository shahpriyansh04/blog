import axios from 'axios';
export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:8080/posts');
  const data = await res.json();

  const paths = data.map((post) => {
    return {
      params: { id: post.id.toString() }
    };
  });
  return { paths: paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await axios.get('http://localhost:8080/', {
    params: { id: id }
  });
};

const Post = () => {
  return <h1>Hello World</h1>;
};

export default Post;
