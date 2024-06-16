import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArticleList = () => {
  return (
    <div>
      <div>
        <article>
          <Link href="#">
            <Image src="https://picsum.photos/200/300
" alt="" width={1280} height={300} />
          </Link>
        </article>
      </div>
    </div>
  );
};

export default ArticleList;
