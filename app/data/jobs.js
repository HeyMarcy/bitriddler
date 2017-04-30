import blackcrows from 'assets/timeline/blackcrows.png';
import tools from './tools';
import {
  black,
  red900,
  grey700,
  green700,
  indigo900,
  purple900,
  orange900,
} from 'material-ui/styles/colors';

export default [
  {
    title: 'Fortesolutions',
    subtitle: 'Front-end / UI Developer',
    story: `
      I started working as the main front-end developer at Decemeber 2015, This project started by rangle.io 6 months eariler.
      They used Flux architecture and RxJS which was a new concept to me back then, I spent about a month learning everything I can
      and even made a tutorial on React, Flux and RxJS. I delivered more than 20 features since then for this project, refactored some code,
      worked on optimizing performance. Also worked with back-end developers on managing Redis and APIs. Every featured I delivered was unit
      tested and passed all ci tests.
    `,
    cover: 'http://somerbysit.co.uk/wp-content/uploads/2015/11/website_apple_devices.png',
    primaryColor: red900,
    roles: [
      'Writing components with AngularJS, SASS and Typescript',
      'Managing data flow with Flux and RxJS.',
      'Maintain consistency in design and layout with SASS theming.',
      'Writing unit tests with Karma and Jasmine.',
      'Perform website maintenance and enhancements.',
      'Provide assistance to the back-end developers in troubleshooting and coding.',
      'Optimize website performance using latest technology.',
    ],
    tools: [
      tools.flux,
      tools.angularjs,
      tools.sass,
      tools.rxjs,
      tools.typescript,
    ],
    years: 2,
  },
  {
    title: 'Blackcrows',
    subtitle: 'Front-end / UI Developer',
    story: `
      I started working as the main front-end developer at Decemeber 2015, This project started by rangle.io 6 months eariler.
      They used Flux architecture and RxJS which was a new concept to me back then, I spent about a month learning everything I can
      and even made a tutorial on React, Flux and RxJS. I delivered more than 20 features since then for this project, refactored some code,
      worked on optimizing performance. Also worked with back-end developers on managing Redis and APIs. Every featured I delivered was unit
      tested and passed all ci tests.
    `,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Logo_Black_Crows.jpg',
    cover: 'http://somerbysit.co.uk/wp-content/uploads/2015/11/website_apple_devices.png',
    primaryColor: black,
    roles: [
      'Writing components with AngularJS, SASS and Typescript',
      'Managing data flow with Flux and RxJS.',
      'Maintain consistency in design and layout with SASS theming.',
      'Writing unit tests with Karma and Jasmine.',
      'Perform website maintenance and enhancements.',
      'Provide assistance to the back-end developers in troubleshooting and coding.',
      'Optimize website performance using latest technology.',
    ],
    tools: [
      tools.flux,
      tools.angularjs,
      tools.sass,
      tools.rxjs,
      tools.typescript,
    ],
    years: 2,
  },
  {
    title: 'PimentaGroup',
    subtitle: 'Full-stack Developer',
    story: `
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    `,
    cover: 'https://pimentagroup.de/images/city_picture.png',
    primaryColor: red900,
    roles: [
      'Writing components with React and MaterialUI',
      'Managing data flow with Relay and Flux',
      'Working with MaterialUI while customizing it to quickly scaffold an easy-to-operate and eye-catching web application.',
      'Interpreted and executed designs correctly as requested by clients.',
      'Building GraphQL APIs with NodeJS',
      'Working with MongoDB',
    ],
    tools: [
      tools.react,
      tools.relay,
      tools.graphql,
      tools.nodejs,
      tools.mongodb,
    ],
    years: 0.5,
  },
  {
    title: 'Goodsense',
    subtitle: 'Front-end / UI Developer',
    story: `
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    `,
    cover: blackcrows,
    primaryColor: grey700,
    roles: [
      'Writing re-usable components with React and styled-components.',
      'Managing data flow with Redux and Redux-saga',
      'Writing End to End tests with Selenium (WebdriverIO).',
      'Creating interactive animations using ReactMotion.',
      'Maintain consistency in design and layout.',
      'Recommended technical solutions and architecture to clients.',
    ],
    tools: [
      tools.react,
      tools.redux,
      tools.reduxSaga,
    ],
    years: 2,
  },
  {
    title: 'CyTIX',
    subtitle: 'Full-stack Developer',
    story: `
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    `,
    cover: blackcrows,
    primaryColor: green700,
    roles: [
      'Writing components with React and PostCSS',
      'Managing data flow with Redux and Redux-thunk',
      'Writing unit tests with Mocha.',
      'Converted PSDs to re-usable react components.',
      'Building RESTful APIs with NodeJS and Express',
      'Working with MongoDB',
    ],
    tools: [
      tools.react,
      tools.redux,
      tools.reduxThunk,
      tools.nodejs,
      tools.mongodb,
    ],
    years: 0.5,
  },
  {
    title: 'NewGrounds',
    subtitle: 'Game Developer',
    story: `
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    `,
    cover: blackcrows,
    primaryColor: orange900,
    roles: [
      // @todo
      'Building RESTful APIs with PHP and Laravel',
      'Converting web themes to blade templates',
    ],
    tools: [
      tools.react,
    ],
    years: 3,
  },
];
