/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState, useRef, useEffect } from 'react';
import {
  Button, Textarea, Avatar, Badge, Title, Paper, Container, Center, Stack,
} from '@mantine/core';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messageContainerRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    const newMessage = { text: inputValue, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the message container after a new message is added
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Title
        align="center"
        size={60}
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Chat with friends!
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            maxHeight: '300px',
            minHeight: '300px',
            overflow: 'auto',
          }}
          ref={messageContainerRef}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '8px',
              }}
            >
              {message.sender !== 'user' && (
              <Avatar style={{ marginRight: '8px' }}>R</Avatar>
              )}
              <Badge color={message.sender === 'user' ? 'gray' : 'teal'}>
                {message.text}
              </Badge>
              {message.sender === 'user' && (
              <Avatar style={{ marginLeft: '8px' }}>U</Avatar>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Textarea
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            style={{ flex: '1', marginRight: '8px' }}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </Paper>

    </>
  );
}

export default Chat;
