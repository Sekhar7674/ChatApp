export default ({ contacts, setResver, resever }) => {
  return <>
    <div className='contacts'>
      <h3>Contacts</h3>
      {contacts.map(user => <div className={resever?.mobile == user.mobile ? 'activeCont' : 'contact'} onClick={() => setResver(user)} key={user.mobile}>{user.name}</div>)}
    </div>
  </>
}