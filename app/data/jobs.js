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
    subtitle: 'Front-end / UI Developer',
    story: `
Started by [Rangle](https://rangle.io/) at Jul 2015, The app was built with AngularJS, Typescript, RxJS, Flux and SASS.

At 15 Oct 2015 I got onboard and started the hand-over process. My first pull request was made at Nov 1, 2015. Since then I have been the main front-end developer responsible for delivering features, fixing bugs and managing the application stability.

At the time of writing this, I made 199 pull requests that included 60+ new features, bug fixes, performance optimization, code enhancements and unit tests.
    `,
    logo: blackcrowsLogo,
    cover: blackcrowsCover,
    primaryColor: colors.black,
    fontColor: colors.blackInverse,
    roles: [
      'Writing components with AngularJS, SASS and Typescript',
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
    subtitle: 'Front-end / UI Developer',
    story: `
Goodsense started as an ecommerce platform where merchants upload their products and using niche marketing strategy we would group each type of products in a marketplace application, our main focus was to target Japan and China.

I started working on this project as a full-stack developer at Sept. 2014. Once we got a small prototype going the product owner requested to expand our team. This is when my life got exciting, I managed to build a team of five of the best developers I knew, built an office, learned agile scrum team management, my plan was to open a startup and be funded by this project.

Unfortunately it didnt work out as I hoped. But the good news is, Goodsense survived and since Mar. 2017 I've been working there as a part-time front-end developer.
    `,
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
    subtitle: 'Front-end / UI Developer',
    story: `
I started contributing to this project early at the project planning stage where I suggested frameworks and tools to build the front-end application and admin dashboard, I then contributed in decisions for the database design and back-end tools.

At Feb 26 2017 I pushed my first commit in scaffolding the front-end applications with React, Redux and Redux-saga then a few more commits at the same day to setup eslint, circleci and unit tests.

For the next 3 months I worked as a part-time front-end developer on this project mainly to convert PSDs to beautiful React components while adding the touch of catchy animations.

My second role was to work with the back-end developer to define APIs needed to end up with fully editable and customizable web application.
All the code written follows React best practices, passes ci tests and easy to extend and add more features.
`,
    cover: forteCover,
    logo: forteLogo,
    primaryColor: colors.red,
    fontColor: colors.redInverse,
    roles: [
      'Writing re-usable components with React.',
      'Managing data flow with Redux and Redux-saga',
      'Creating interactive animations with spring animation.',
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
    story: `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    `,
    cover: tastetasticCover,
    logo: tastetasticLogo,
    primaryColor: colors.blue,
    fontColor: colors.blueInverse,
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
      tools.nodejs,
      tools.graphql,
      tools.mongodb,
    ],
    years: 0.5,
  },
  {
    title: 'Cytix',
    subtitle: 'Full-stack Developer',
    story: `
I started working on this project as a full-stack web developer, I contributed in scaffolding the front-end and back-end, I was working along two other full-stack developers and a scrum master.

We decided to go with React, Redux, ReduxThunk, NodeJS and MongoDB.

For the next 2 months I worked as a full-time full-stack developer on this project mainly to convert PSDs to React components, Manage data flow and build the APIs to make different parts of the application editable by the client.

One of the big challenges in this project was supporting two languages, not only for static data but for data saved in the database as well. Also to provide an interface to edit data in two languages.

Another big challenge was supporting SEO. I learned a lot from this experience.
    `,
    cover: cytixCover,
    logo: cytixLogo,
    primaryColor: colors.green,
    fontColor: colors.greenInverse,
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
];
