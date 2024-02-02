# chat-cli

## About

This is a demo of using React [Ink](https://github.com/vadimdemedes/ink) to make a real time chat app in command line using [Supabase](https://supabase.com). Check out the [blog post here](https://www.nico.fyi/blog/react-ink-cli-chat-supabase).

## Quick start

- Create a project in Supabase
- Take note of the project URL and the public anon key
- Open terminal then run `npx @nicnocquee/chat-cli --room myroom --nickname yournickname --supabaseUrl the-url-of-the-supabase-project --supabaseKey the-public-anon-key-of-the-project`
- Open another tab in the terninal then run the same command above but with different nickname

## Install

```bash
$ npm install --global @nicnocquee/chat-cli
```

## CLI

```
Usage
	  $ chat-cli

	Options
		--room  room id, anyone who has the room id can join
		--nickname your nickname, can be emoji
		--supabaseUrl URL of your supabase project
		--supabaseKey The public anon key of the supabase project

	Examples
	  $ chat-cli --room=room1 --nickname=john --supabaseUrl="https://supabase" --supabaseKey="xxx"
```

## Note

I made a book, [Pull Request Best Practices](https://pr.nico.fyi). Check it out!
