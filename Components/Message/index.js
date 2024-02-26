export default ({message,user})=>{
  return <>
  <div className={user.id!=message.sender?"messageBox":"my_messageBox"}><p className=" ">{message.message}</p>{message.name}</div>
  </>
}