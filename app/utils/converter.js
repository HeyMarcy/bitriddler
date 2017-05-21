import { StyleSheet } from 'utils/styled-components';
import { renderToString } from 'react-dom/server';
import { replaceAll } from 'utils/helpers';
import parse from 'styled-components/lib/vendor/postcss-safe-parser/parse'
import postcssNested from 'styled-components/lib/vendor/postcss-nested';
import autoprefix from 'styled-components/lib/utils/autoprefix';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';

export const getAllClassNames = (html) => uniq(
  flatten(html.match(/class="(.*?)"/g).map(className => className.replace(`class="`, '').replace(`"`, '').split(" ")))
);

/**
 * This method will not output the following conditions
 * - Media queries
 * - CSS for id
 * @param  {Object} component React component
 * @return {Object}           Returns html and css for that react component.
 */
export default (component) => {
  const html = renderToString(component);
  const classNames = getAllClassNames(html);

  const isClass = rule => rule.selectorText && rule.selectorText.indexOf('.') > -1;
  const isId = rule => rule.selectorText && rule.selectorText.indexOf('#') > -1;
  const isMedia = rule => rule.type === 4;
  const isGlobal = rule => !isClass(rule) && !isId(rule) && !isMedia(rule);
  const getRuleClassName = rule => rule.selectorText.replace('.', '');
  const isComponentRule = rule => isClass(rule) && classNames.indexOf(getRuleClassName(rule)) > -1;

  const componentRules = StyleSheet.rules().filter(isComponentRule);
  const globalRules = StyleSheet.rules().filter(isGlobal);
  const pureCSS = globalRules.concat(componentRules).map(rule => rule.cssText).join('');


  // Autoprefix and nested rules
  const root = parse(pureCSS);
  postcssNested(root)
  autoprefix(root)

  return {
    html,
    css: root.toResult().css,
  };
}
