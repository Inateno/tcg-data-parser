import { getVersionInfo } from './version';

export const homePage = `
<!DOCTYPE html>
<html>
  <head>
    <title>tRPC API Boilerplate</title>
  </head>
  <body>
    <img src="https://raw.githubusercontent.com/mkosir/trpc-fe-boilerplate-vite/main/misc/heisenberg.png" />
    <h3>tRPC API Boilerplate</h3>
    <div style="color:gray; font-style: italic; font-size: 15px; display: none;">${getVersionInfo()}</div>
    <br />
    <div style="color:black; font-style: italic; font-size: 18px;">
    Router:
      <ul>
        User
        <li><a title="Query - /trpc/card.list" href="/trpc/card.list">List all</a></li>
        <li><a title='Query - /trpc/card.keyword?batch=1&input={"0":{"json":"Grimlock king"}}' href='/trpc/card.keyword?batch=1&input={"0":{"json":"Grimlock king"}}'>Search by keyword "Grimlock king"</a></li>
        <li><a title='Query - /trpc/card.search??batch=1&input={"0":{"json":"A Killer Among Us"}}' href='/trpc/card.search?batch=1&input={"0":{"json":"A Killer Among Us"}}'>Search the Specific card name "A Killer Among Us"</a></li>
      </ul>
    </div>
  </body>
</html>
`;
