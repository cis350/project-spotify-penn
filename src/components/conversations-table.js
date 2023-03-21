import React from 'react';

function ConversationRow(props){
  return(
      <tr>
          <td>{props.conversation.name}</td>
      </tr>
  )
}

function ConversationTable(props){
  const makeRows = () =>{
      const rows = [];
      props.conversation.forEach(element => {
            rows.push(<ConversationRow conversation={element} />); 
          }
      );
      return rows;
  }

  const rows = makeRows();
  return(<div>
      <table>
          <thead>
              <th>Name</th>
          </thead>
          <tbody>{rows}</tbody>
      </table>
  </div>);
}

export default ConversationTable;