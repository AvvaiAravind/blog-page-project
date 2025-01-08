import { ReactElement } from "react";
import { PostType } from "./App";
import Post from "./Post";

type FeedProps = {
  posts: PostType[];
};

const Feed = ({ posts }: FeedProps): ReactElement => {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feed;
