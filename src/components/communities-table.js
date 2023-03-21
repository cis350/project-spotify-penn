import React from 'react';
import {
    Avatar,
    Table,
    Group,
    Text,
    ScrollArea,
  } from '@mantine/core';

export function CommunitiesTable() {
    const data = fetch()
    
    const rows = data.map((item) => (
      <tr key={item.name}>
        <td>
          <Group spacing="sm">
            <Avatar radius="xl" />
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </td>
      </tr>
    ));
  
    return (
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Communities</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    );
  }

  export default CommunitiesTable;