import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/conf";

function PostCard({
  $id,
  title,
  featuredImage,
  category,
  creator = "John Doe",
}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-[300px] h-[300px]">
        <div className="w-full h-full bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl p-4 hover:scale-105 duration-300 ease-in-out hover:shadow-2xl shadow-slate-100 hover:bg-gradient-to-tl hover:from-neutral-600 hover:to-neutral-500">
          <div className="w-full justify-center mb-4 h-[150px] overflow-hidden">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-xl w-full h-full object-cover"
            />
          </div>
          <h2 className="text-sm font-bold text-start ml-2">{title}</h2>
          <div className="w-[60%]">
            <p className="text-start ml-2 mt-2 bg-neutral-800 text-white rounded-xl px-3">
              {category}
            </p>
          </div>
          <div>
            <p className="text-start ml-3 mt-2">Created by: {creator}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
