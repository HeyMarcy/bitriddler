export default `
<Expandable
  headers={[
    ({ isOpened }) => (
      <ItemHeader>
        <ItemTitle>Tab1</ItemTitle>
        <ItemIcon>{isOpened ? '-' : '+'}</ItemIcon>
      </ItemHeader>
    ),
    ({ isOpened }) => (
      <ItemHeader>
        <ItemTitle>Tab2</ItemTitle>
        <ItemIcon>{isOpened ? '-' : '+'}</ItemIcon>
      </ItemHeader>
    ),
    ({ isOpened }) => (
      <ItemHeader>
        <ItemTitle>Tab3</ItemTitle>
        <ItemIcon>{isOpened ? '-' : '+'}</ItemIcon>
      </ItemHeader>
    ),
  ]}
  enableMultiOpen={enableMultiOpen}
>
  <Item>
    <h2>Simply any react component</h2>
    <p>
      <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
    <ul>
      <li>
        Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
      </li>
      <li>
        1914 translation by H. Rackham
      </li>
      <li>
        The standard Lorem Ipsum passage, used since the 1500s
      </li>
      <li>
        Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
      </li>
    </ul>
  </Item>
  <Item>
    <Highlight className={"dust"}>
      {code}
    </Highlight>
  </Item>
  <Item>
    <h3>
      Totally customizable
    </h3>
  </Item>
  <Item>
    <h3>
      Tested on multiple devices
    </h3>
  </Item>
  <Item>
    <h3>
      Uses React motion
    </h3>
  </Item>
</Expandable>
`;
