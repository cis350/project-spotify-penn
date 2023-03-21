function FriendRow(props){
  return(
      <tr>
          <td>{props.friend.avatar}</td>
          <td>{props.friend.name}</td>
      </tr>
  )
}

function FriendsTable(props){
/** this function create a row for each student
* in the list of student
*/
  const makeRows = () =>{
      const rows = [];
      props.friend.forEach(element => {
            rows.push(<FriendRow friend={element} />); // the row of student
          }
      );
      return rows;
  }

  const rows = makeRows();
  return(<div>
      <table>
          <thead>
              <th>Avatar</th>
              <th>Name</th>
          </thead>
          <tbody>{rows}</tbody>
      </table>
  </div>);
}

export default FriendsTable;