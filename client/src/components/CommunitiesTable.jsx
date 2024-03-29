import {
  Table, Group, Text, ScrollArea, Center, Button, Stack,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserCommunities from '../api/getUserCommunities';

export function CommunitiesTable() {
  const [rows, setRows] = useState(null);
  const navigate = useNavigate();
  const userId = window.sessionStorage.getItem('sessionId');

  useEffect(() => {
    getUserCommunities(userId)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          throw new Error('empty data');
        }
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
      .catch(() => setRows(
        <tr>
          <td />
        </tr>,
      ));
  }, []);

  return (
    <Center>
      <Stack>
        <ScrollArea>
          <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
            <thead>
              <tr>
                <th><Text fz={50}>Communities</Text></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
        <Button onClick={(() => navigate('/communities'))}>Add New Community</Button>
      </Stack>
    </Center>
  );
}

export default CommunitiesTable;
