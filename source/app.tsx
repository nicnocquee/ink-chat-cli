import React, { useEffect, useState } from 'react';
import { Box, Static, Text, useInput } from 'ink';
import { nanoid } from 'nanoid';

import { createClient } from '@supabase/supabase-js';

type Props = {
  room: string;
  nickname: string;
  supabaseUrl: string;
  supabaseKey: string;
};

type Message = { user: string; content: string; id: string };

export default function App({
  room,
  nickname,
  supabaseKey,
  supabaseUrl,
}: Props) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const channel = supabase.channel(room);

  const [userInput, setUserInput] = useState('');
  const [messageToSend, setMessageToSend] = useState('');
  const [isSending, setIsSending] = useState(false);

  useInput((input, key) => {
    if (key.return) {
      setMessageToSend(userInput);
      setUserInput('');
    } else if (key.backspace || key.delete) {
      setUserInput((curr) => curr.slice(0, -1));
    } else {
      setUserInput((curr) => curr + input);
    }
  });

  useEffect(() => {
    if (!isSending && messageToSend.trim().length > 0) {
      if (messageToSend.trim() === '\\quit') {
        process.exit();
      }
      setIsSending(true);
      channel
        .send({
          type: 'broadcast',
          event: 'test-my-messages',
          payload: {
            user: nickname,
            content: messageToSend,
            id: nanoid(),
          },
        })
        .then(() => {
          setMessageToSend('');
          setIsSending(false);
        });
    }
  }, [messageToSend, isSending, channel]);

  const [messages, setMessages] = useState<Array<Message>>([
    {
      user: 'Room',
      content: room,
      id: `the-room`,
    },
  ]);
  useEffect(() => {
    const subscription = channel
      .on('broadcast', { event: 'test-my-messages' }, ({ payload }) => {
        setMessages((curr) => {
          const newMessages = Array.from(
            new Set([...curr, payload as Message])
          );
          return newMessages;
        });
      })
      .subscribe();

    return () => {
      subscription.unsubscribe().then(() => {});
    };
  }, []);
  return (
    <Box>
      <Static items={messages}>
        {(m) => {
          if (m.id === 'the-room') {
            return (
              <Box key={m.id}>
                <Text color="magenta" bold>
                  Room:
                </Text>
                <Text>: {m.content}</Text>
              </Box>
            );
          }
          return (
            <Box key={m.id}>
              <Text color="green">{m.user === nickname ? 'You' : m.user}</Text>
              <Text>: {m.content}</Text>
            </Box>
          );
        }}
      </Static>
      <Text>{userInput}</Text>
    </Box>
  );
}
