import { StyleSheet } from 'utils/styled-components';
import { renderToString } from 'react-dom/server';
import uniq from 'lodash/uniq';

export const getAllClassNames = (html) => uniq(html.match(/class="(.*?)"/g).map(className => className.replace(`class="`, '').replace(`"`, '')));

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
  const css = componentRules.concat(globalRules).map(rule => rule.cssText).join('');

  return {
    html,
    css,
  };
}
