export default `
  renderTimeline = ({ jobs, activeJobIndex, timelineWidth, connectorWidths }) => {
    return (
      <Measure
        onMeasure={({ width }) => this.setState({ timelineWidth: width })}
        whitelist={['width']}
      >
        <TimelineWrapper
          translateX={this.calculateTranslateX({
            jobs,
            activeJobIndex,
            timelineWidth,
            connectorWidths,
          })}
        >
          {flatten(jobs.map((job, index) => ([
            <TimelinePointWrapper key={\`point$\{index}\`}>
              <TimelinePointDetails
                onClick={() => this.changeActiveJob(index)}
                previousConnectorWidth={index > 1 ? connectorWidths[index - 1] : 0}
              >
                <MiniJob job={job} />
              </TimelinePointDetails>
              <TimelinePoint
                onClick={() => this.changeActiveJob(index)}
              />
            </TimelinePointWrapper>,
            <TimelineConnector
              key={\`connector$\{index}\`}
              width={index === jobs.length - 1 ? 2000 : connectorWidths[index]}
            />,
          ])))}
        </TimelineWrapper>
      </Measure>
    );
  }
`;
