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
    subtitle: 'Front End Developer',
    dateFrom: 'Oct 2015',
    dateTo: 'Present',
    story: `
Started by [Rangle](https://rangle.io/) at Jul 2015, The app was built with AngularJS, Typescript, RxJS, Flux and SASS.

At 15 Oct 2015 I got onboard and started the hand-over process. My first pull request was made at Nov 1, 2015. Since then I have been the main Front End developer responsible for delivering features, fixing bugs and managing the application stability.

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
      'Writing unit tests with Karma and Jasmine.',
      'Provide assistance to the Back End developers in troubleshooting and coding.',
      // 'Maintain consistency in design and layout with SASS theming.',
      // 'Perform website maintenance and enhancements.',
      // 'Optimize website performance using latest technology.',
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
    subtitle: 'Full Stack Developer',
    dateFrom: 'Sept 2014',
    dateTo: 'May 2017',
    story: `
Goodsense is an ecommerce platform where merchants upload their products to be sold on our different marketplaces (niche marketing). It's targeting Japan and China.

I started working on this project as a Full Stack developer at Sept. 2014. Once I built a prototype, The product owner requested to expand the team. I started building a team, an office and learning agile scrum workflow. My plan was to open a startup and be funded by this project.

Unfortunately it didnt work out as hoped. But Goodsense survived and since Mar. 2017 I've been working there as a part-time Front End developer.
    `,
    visitLink: 'http://dev-goodsense-marketplace.herokuapp.com/product/comme-des-garcons-series-3-incense-eau-de-toilette-zagorsk',
    logo: goodsenseLogo,
    cover: goodsenseCover,
    primaryColor: colors.white,
    fontColor: colors.whiteInverse,
    roles: [
      // 'Participated in agile software development',
      // 'Estimated effort for architecture, design, and development tasks',
      'Designed and implemented data storage solutions with MongoDB',
      'Building RESTful APIs with NodeJS and Express',
      'Writing re-usable components with React and styled-components.',
      'Managing data flow with Redux and Redux-saga',
      'Writing End to End tests with Selenium (WebdriverIO).',
      // 'Creating interactive animations using ReactMotion.',
      // 'Built reusable Back End code and libraries for future use',
      // 'Prototyped and created code reviews',
    ],
    tools: [
      tools.react,
      tools.redux,
      tools.reduxSaga,
      tools.nodejs,
      tools.mongodb,
      tools.typescript,
    ],
    years: 2,
  },
  {
    title: 'Fortesolutions',
    subtitle: 'Front End Developer',
    dateFrom: 'Feb 2017',
    dateTo: 'May 2017',
    story: `
I started contributing to this project early at the project planning stage. I contributed in taking decisions in the Front End technologies, Back End tools and database design.

At Feb 26 2017, I scaffolded the Front End application with React, Redux and Redux-saga, setup eslint, circleci and unit tests.

For the next 3 months I worked as a part-time Front End developer mainly to convert PSDs to React components and create catchy animations.

My second role was to work with the Back End developer to write the APIs needed to end up with fully editable and customizable application.
`,
    visitLink: 'https://dev-fortesolutions.herokuapp.com/',
    cover: forteCover,
    logo: forteLogo,
    primaryColor: colors.red,
    fontColor: colors.redInverse,
    roles: [
      'Writing re-usable components with React and styled-components.',
      'Managing data flow with Redux and Redux-saga.',
      // 'Creating interactive spring animations.',
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
    subtitle: 'Full Stack Developer',
    dateFrom: 'Nov 2016',
    dateTo: 'Apr 2017',
    story: '',
    visitLink: 'https://tastetastic.pimentagroup.de/',
    privateLink: true,
    cover: tastetasticCover,
    logo: tastetasticLogo,
    primaryColor: colors.blue,
    fontColor: colors.blueInverse,
    roles: [
      'Designed and implemented data storage solutions with MongoDB',
      'Building GraphQL APIs with NodeJS',
      'Writing components with React and MaterialUI.',
      'Managing data flow with Relay and Flux.',
      // 'Interpreted and executed designs correctly as requested by clients.',
      // 'Scaffolding an easy-to-operate web application with MaterialUI.',
      // 'Built reusable code and libraries for future use',
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
    subtitle: 'Full Stack Developer',
    dateFrom: 'Mar 2016',
    dateTo: 'Aug 2016',
    story: `
I started working on this project as a Full Stack web developer, I contributed in scaffolding the Front and Back End, I was working along two other Full Stack developers and a project manager.

For 2 months I worked as a full-time Full Stack developer on this project mainly to convert PSDs to React components, Manage data flow and build the APIs to make different parts of the application editable as requested by the client.

One of the big challenges in this project was supporting multiple languages, not only for static data but for data in the database as well. Also to provide an interface to edit these data in multiple languages.
    `,
    visitLink: 'http://cytix.co.jp',
    cover: cytixCover,
    logo: cytixLogo,
    primaryColor: colors.green,
    fontColor: colors.greenInverse,
    roles: [
      'Designed and implemented data storage solutions with MongoDB',
      'Building RESTful APIs with NodeJS and Express',
      'Writing components with React and PostCSS',
      'Managing data flow with Redux and Redux-thunk',
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
