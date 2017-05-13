import forteCover from 'assets/timeline/forte.png';
import blackcrowsCover from 'assets/timeline/with_shadow.jpg';
import goodsenseCover from 'assets/timeline/goodsense.jpg';
import tastetasticCover from 'assets/timeline/test2.jpg';
import cytixCover from 'assets/timeline/cytix.jpg';

import forteLogo from 'assets/timeline/forte_logo.jpg';
import blackcrowsLogo from 'assets/timeline/blackcrows_logo.jpg';
import goodsenseLogo from 'assets/timeline/goodsense_logo.jpg';
import tastetasticLogo from 'assets/timeline/pimenta_logo.jpg';
import cytixLogo from 'assets/timeline/cytix_logo.jpg';

import tools from './tools';
import colors from 'theme/colors';

export default [
  {
    title: 'Blackcrows',
    subtitle: 'Front-End / UI Developer',
    dateFrom: 'Jun 2014',
    dateTo: 'Present',
    summary: 'Worked as a Front-End Developer, writing components with AngularJS, SASS and Typescript. Managing data flow with Flux and RXJS, Writing unit tests with Karma and Jasmine. Provide assistance to the back-end developers in troubleshootng and coding.',
    story: `
Started by [Rangle](https://rangle.io/) at Jul 2015, The app was built with AngularJS, Typescript, RxJS, Flux and SASS.

At 15 Oct 2015 I got onboard and started the hand-over process. My first pull request was made at Nov 1, 2015. Since then I have been the main front-end developer responsible for delivering features, fixing bugs and managing the application stability.

At the time of writing this, I made 199 pull requests that included 60+ new features, bug fixes, performance optimization, code enhancements and unit tests.
    `,
    visitLink: 'https://www.black-crows.com/',
    logo: blackcrowsLogo,
    cover: blackcrowsCover,
    primaryColor: colors.black,
    fontColor: colors.blackInverse,
    roles: [
      'Writing components with AngularJS, SASS and Typescript.',
      'Managing data flow with Flux and RxJS.',
      // 'Maintain consistency in design and layout with SASS theming.',
      'Writing unit tests with Karma and Jasmine.',
      // 'Perform website maintenance and enhancements.',
      // 'Provide assistance to the back-end developers in troubleshooting and coding.',
      'Optimize website performance using latest technology.',
    ],
    tools: [
      tools.angularjs,
      tools.typescript,
      tools.flux,
      tools.rxjs,
      tools.sass,
    ],
    years: 2,
  },
  {
    title: 'Goodsense',
    subtitle: 'Front-End / UI Developer',
    dateFrom: 'Jun 2014',
    dateTo: 'Present',
    summary: 'Worked as a Front-End Developer, writing components with AngularJS, SASS and Typescript. Managing data flow with Flux and RXJS, Writing unit tests with Karma and Jasmine. Provide assistance to the back-end developers in troubleshootng and coding.',
    story: `
Goodsense is an ecommerce platform where merchants upload their products and using niche marketing strategy we would group each type of products in a marketplace application. It's targeting Japan and China.

I started working on this project as a full-stack developer at Sept. 2014. Once we got a small prototype going the product owner requested to expand our team. Things got exciting, I managed to build a team, built an office, got deep in agile scrum workflow, the plan was to open a startup and be funded by this project.

But unfortunately it didnt work out as I hoped. The good news is Goodsense survived and since Mar. 2017 I've been working there as a part-time front-end developer.
    `,
    visitLink: 'http://dev-goodsense-marketplace.herokuapp.com/product/comme-des-garcons-series-3-incense-eau-de-toilette-zagorsk',
    logo: goodsenseLogo,
    cover: goodsenseCover,
    primaryColor: colors.white,
    fontColor: colors.whiteInverse,
    roles: [
      'Writing re-usable components with React and styled-components.',
      'Managing data flow with Redux and Redux-saga',
      'Writing End to End tests with Selenium (WebdriverIO).',
      'Creating interactive animations using ReactMotion.',
      // 'Maintain consistency in design and layout.',
      // 'Recommended technical solutions and architecture to client.',
    ],
    tools: [
      tools.react,
      tools.redux,
      tools.reduxSaga,
    ],
    years: 2,
  },
  {
    title: 'Fortesolutions',
    subtitle: 'Front-End / UI Developer',
    dateFrom: 'Jun 2014',
    dateTo: 'Present',
    summary: 'Worked as a Front-End Developer, writing components with AngularJS, SASS and Typescript. Managing data flow with Flux and RXJS, Writing unit tests with Karma and Jasmine. Provide assistance to the back-end developers in troubleshootng and coding.',
    story: `
I started contributing to this project early at the project planning stage. I contributed in taking decisions in the front-end technologies, back-end tools and database design.

At Feb 26 2017, I scaffolded the front-end application with React, Redux and Redux-saga, setup eslint, circleci and unit tests.

For the next 3 months I worked as a part-time front-end developer mainly to convert PSDs to React components and create catchy animations.

My second role was to work with the back-end developer to write the APIs needed to end up with fully editable and customizable application.
`,
    visitLink: 'https://dev-fortesolutions.herokuapp.com/',
    cover: forteCover,
    logo: forteLogo,
    primaryColor: colors.red,
    fontColor: colors.redInverse,
    roles: [
      'Writing re-usable components with React and styled-components.',
      'Managing data flow with Redux and Redux-saga.',
      'Creating interactive spring animations.',
      'Maintain consistency in design and layout.',
    ],
    tools: [
      tools.react,
      tools.redux,
      tools.reduxSaga,
    ],
    years: 2,
  },
  {
    title: 'TasteTastic',
    subtitle: 'Full-stack Developer',
    dateFrom: 'Jun 2014',
    dateTo: 'Present',
    summary: 'Worked as a Front-End Developer, writing components with AngularJS, SASS and Typescript. Managing data flow with Flux and RXJS, Writing unit tests with Karma and Jasmine. Provide assistance to the back-end developers in troubleshootng and coding.',
    story: '',
    visitLink: 'https://tastetastic.pimentagroup.de/',
    privateLink: true,
    cover: tastetasticCover,
    logo: tastetasticLogo,
    primaryColor: colors.blue,
    fontColor: colors.blueInverse,
    roles: [
      'Writing components with React and MaterialUI.',
      'Managing data flow with Relay and Flux.',
      'Working with MaterialUI while customizing it to quickly scaffold an easy-to-operate and eye-catching web application.',
      'Building GraphQL APIs with NodeJS',
      'Working with MongoDB',
      // 'Interpreted and executed designs correctly as requested by clients.',
    ],
    tools: [
      tools.react,
      tools.relay,
      tools.nodejs,
      tools.graphql,
      tools.mongodb,
    ],
    years: 0.5,
  },
  {
    title: 'Cytix',
    subtitle: 'Full-stack Developer',
    dateFrom: 'Jun 2014',
    dateTo: 'Present',
    summary: 'Worked as a Front-End Developer, writing components with AngularJS, SASS and Typescript. Managing data flow with Flux and RXJS, Writing unit tests with Karma and Jasmine. Provide assistance to the back-end developers in troubleshootng and coding.',
    story: `
I started working on this project as a full-stack web developer, I contributed in scaffolding the front-end and back-end, I was working along two other full-stack developers and a scrum master.

For 2 months I worked as a full-time full-stack developer on this project mainly to convert PSDs to React components, Manage data flow and build the APIs to make different parts of the application editable as requested by the client.

One of the big challenges in this project was supporting multiple languages, not only for static data but for data saved in the database as well. Also to provide an interface to edit data in multiple languages.
    `,
    visitLink: 'http://cytix.co.jp',
    cover: cytixCover,
    logo: cytixLogo,
    primaryColor: colors.green,
    fontColor: colors.greenInverse,
    roles: [
      'Writing components with React and PostCSS',
      'Managing data flow with Redux and Redux-thunk',
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
];
