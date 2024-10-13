import '../styles/posts.scss';

interface PostData {
  title: string;
  img: string;
  des: string;
  add?: string; // Optional property
}


const Posts: React.FC = () => {
  const dataa: PostData = {
    title: "Spheron Aptos Hackathon",
    des: "A web3 hackathon",
    img: "https://imgs.search.brave.com/kh01yGTMp9dU_0KFtijz2xtFH801uw9puKeI0q9aGEw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE2/NjA4NTczMy9waG90/by9idXNpbmVzcy1w/cm9mZXNzaW9uYWxz/LWF0LWxhdW5jaC1l/dmVudC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9ZWVZcnNM/a1dCSFNRSnNyazVM/WWpBVGxWaThRaWZB/OUhaM21tZWFEdnhz/Zz0",
    add: "something", // Optional field can be empty
  };

  return (
    <div className="posts-container">
      <Post data={dataa} />
      <Post data={dataa} />
      <Post data={dataa} />
      <Post data={dataa} />
    </div>
  );
};

interface PostProps {
  data: PostData;
}

const Post: React.FC<PostProps> = ({ data }) => {
  return (
    <div className="post">
      <img src={data.img} alt={data.title} />
      <div className="details">
        <h2>{data.title}</h2>
        <p>{data.des}</p> 
        <div className="bookNow">Book Now</div>
      </div>
    </div>
  );
};

export default Posts;
