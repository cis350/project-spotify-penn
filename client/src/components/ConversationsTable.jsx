import {
  Table, Group, Text, ScrollArea, Center, Button,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getConversations from '../api/getConversations';

export function ConversationsTable() {
  const [rows, setRows] = useState(null);

  const navigate = useNavigate();
  const goToChat = () => {
    navigate('/chat');
  };

  useEffect(() => {
    getConversations()
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
      .catch(() => (
        setRows(
          <tr>
            <td>
              <Group spacing="sm" position="center">
                <Button onClick={goToChat}>
                  Start a new Conversation
                </Button>
              </Group>
            </td>
          </tr>,
        )
      ));
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
