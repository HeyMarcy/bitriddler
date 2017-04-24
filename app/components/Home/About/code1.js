export default `
export default class LineAnimation extends React.Component {
  static propTypes = {
    waitFor: React.PropTypes.number,
    thickness: React.PropTypes.number,
    color: React.PropTypes.string,
    animations: React.PropTypes.arrayOf(React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number,
      angle: React.PropTypes.number,
      distance: React.PropTypes.number,
      opacity: React.PropTypes.number,
    })),
    initial: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number,
      angle: React.PropTypes.number,
      distance: React.PropTypes.number,
      opacity: React.PropTypes.number,
    }),
    repeatAt: React.PropTypes.number,
    repeatInterval: React.PropTypes.number,
    stopAnimation: React.PropTypes.number,
  };

  static defaultProps = {
    waitFor: 1000,
  };

  componentWillMount() {
    this.setState({
      animationIndex: 0,
      wait: true,
    });

    setTimeout(() => {
      this.setState({ wait: false });
    }, this.props.waitFor)
  }

  renderLine = ({ x, y, angle, distance, opacity }) => (
    <Line
      distance={distance}
      angle={toRadians(angle)}
      from={{ x, y }}
      color={this.props.color}
      thickness={this.props.thickness}
      opacity={opacity}
    />
  );

  runNextAnimation = () => {
    const {
      animationIndex,
    } = this.state;

    const {
      repeatAt,
      stopAnimation,
    } = this.props;

    if(stopAnimation) {
    }

    else if(animationIndex < this.props.animations.length - 1) {
      this.setState({
        animationIndex: animationIndex + 1,
      });
    }

    else if(repeatAt) {
      this.setState({
        inRepeatMode: true,
        animationIndex: repeatAt,
      });
    }
  }

`;
