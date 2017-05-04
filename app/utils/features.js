import {
  isXSScreen,
  isSMScreen,
  isMDScreen,
  isLGScreen,
  isXLScreen,
} from 'utils/screen';

/// Jobs page features
export const jobsPageFetaures = {
  shouldStack: () => isSMScreen() || isXSScreen() || isMDScreen(),
  showSectionPagination: () => isLGScreen() || isXLScreen(),
  showEntranceAnimation: () => isLGScreen() || isXLScreen(),
  animateSections: () => isLGScreen() || isXLScreen(),
};

export const homePageFeatures = {
  showEntranceAnimation: () => !isXSScreen(),
};
