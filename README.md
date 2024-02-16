
## Getting Started



First, install libraries:

Please make sure you have Node.js V18 or above installed

```bash

npm install

```



Second, run the server:



```bash

npm run dev

```

The server will listen on port 3000, please visit [localhost:3000](http://localhost:3000/command) to access the input page.



In this page you can:

You can type <b>/</b> to see available commands;

Use <b>@</b> to mention someone

Press `Enter` to send the message



## Introduce



The libraries used in this project include **Tailwind css**, **flowbite** and **Next.js**



Because the input box needs to contain HTML elements, input or textarea is not used. Instead, I use **contentEditable** **DIV** as the input container. This can dynamically replace plain text content with HTML elements during the input process.

If you need to add additional commands, you can set more available commands by editing the `src\lib\commands.ts` file. Of course, the specific way to load the list of available commands is different in real projects.

### Main components
`src\components\CommandInputArea.tsx`
This file is mainly responsible for completing text input, rarat control and text parsing.
`src\components\CommandSelector.tsx`
This file can find and display possible commands and instructions by passing in the sub-string of the command line.
`src\components\InputHistoryPanel.tsx`
This component is used to display the entered text content
`CommandInputArea` and `InputHistoryPanel` share the input text content through `src\contexts\InputsHistoryContext.ts`.

### Main challenges

 1. When using contentEditable div, when the value of innerHTML changes, the cursor control is more complicated. We need to calculate the cursor position before processing the text, and then restore the cursor position after the content is modified. and at this point the innerHTML context is different from the  previous context.

 2. There are no detailed requirements for specific page styles. I have to rely on my imagination to design the UI interactions. In the end I adopted an interaction method similar to Slack.

### What can be improved

1. When the list of available commands appears, it will be more convenient if you can use the keyboard to select the command line you want to enter.
2. After clicking the command with the mouse, we can move the cursor to the previous position of the input.
3. When trying to mention a user, we can pop up a list of possible users to choose from.
4. Add the test libaraies, like `Jest` and `Cypress`