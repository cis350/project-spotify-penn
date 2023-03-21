import {
  Table, Group, Text, ScrollArea, Center,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';

export function ConversationsTable() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/conversations')
      .then((res) => res.json())
      .then((data) => {
        setRows(
          data.map((item) => (
            <tr key={item.name}>
              <td>
                <Group spacing="sm">
                  <Text fz="lg" fw={500}>
                    {item.name}
                  </Text>
                </Group>
              </td>
            </tr>
          )),
        );
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  }, []);

  return (
    <Center>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th><Text fz={50}>Conversations</Text></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Center>
  );
}

export default ConversationsTable;
