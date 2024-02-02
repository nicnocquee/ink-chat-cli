#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './app.js';
import { nanoid } from 'nanoid';

const cli = meow(
  `
	Usage
	  $ chat-cli

	Options
		--room  room id, anyone who has the room id can join
		--nickname your nickname, can be emoji
		--supabaseUrl URL of your supabase project
		--supabaseKey The public anon key of the supabase project

	Examples
	  $ chat-cli --room=room1 --nickname=john --supabaseUrl="https://supabase" --supabaseKey="xxx"
`,
  {
    importMeta: import.meta,
    flags: {
      room: {
        type: 'string',
        default: `room-${nanoid()}`,
      },
      nickname: {
        type: 'string',
        default: `user-${nanoid()}`,
        alias: 'name',
      },
      supabaseUrl: {
        type: 'string',
        alias: 'supaurl',
        isRequired: true,
      },
      supabaseKey: {
        type: 'string',
        alias: 'supakey',
        isRequired: true,
      },
    },
  }
);

render(
  <App
    room={cli.flags.room}
    nickname={cli.flags.nickname}
    supabaseKey={cli.flags.supabaseKey}
    supabaseUrl={cli.flags.supabaseUrl}
  />
);
