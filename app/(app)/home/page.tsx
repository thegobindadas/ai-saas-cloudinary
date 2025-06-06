import React from "react";
import Link from "next/link";


function Home() {
  return (
    <div>
      Home
      <Link href={"/social-share"}>Social Share</Link>
    </div>
  )
}



export default Home