export default `export default ({ stacks, ...props }) => (
  <Wrapper {...props}>
    {stacks.map(({ title, tools, scorePercentage }, index) => (
      <SkillWrapper key={index}>
        <SkillToolsWrapper>
          {tools.map(({ logo }, index) => (
            <SkillTool key={index} src={logo} />
          ))}
        </SkillToolsWrapper>
        <SkillRatingWrapper>
          <StarRating
            starCount={10}
            value={scorePercentage / 10}
          />
        </SkillRatingWrapper>
      </SkillWrapper>
    ))}
  </Wrapper>
);
`;
