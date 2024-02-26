import dynamic from "next/dynamic";

const Message = dynamic(() => import("../Message"),{ ssr: false });

export default ({messages,user})=>{
  return <>
  <div className="messagesList">
  {messages.map((message ,ind)=><Message key={ind} message={message} user={user}/>)}
  </div>
  </>
}