/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';
import classNames from 'classnames';
import LZString from 'lz-string';
import { Icon, Tooltip } from 'antd';
import stackblitzSdk from '@stackblitz/sdk';
import EditButton from './EditButton';
import ErrorBoundary from './ErrorBoundary';
import BrowserFrame from '../BrowserFrame';

function compress(string) {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

class Demo extends React.Component {
  state = {
    codeExpand: false,
    copied: false,
    copyTooltipVisible: false,
  };

  componentDidMount() {
    const { meta, location } = this.props;
    if (meta.id === location.hash.slice(1)) {
      this.anchor.click();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { codeExpand, copied, copyTooltipVisible } = this.state;
    const { expand } = this.props;
    return (
      (codeExpand || expand) !== (nextState.codeExpand || nextProps.expand) ||
      copied !== nextState.copied ||
      copyTooltipVisible !== nextState.copyTooltipVisible
    );
  }

  getSourceCode() {
    const { highlightedCode } = this.props;
    if (typeof document !== 'undefined') {
      const div = document.createElement('div');
      div.innerHTML = highlightedCode[1].highlighted;
      return div.textContent;
    }
    return '';
  }

  handleCodeExpand = demo => {
    const { codeExpand } = this.state;
    this.setState({ codeExpand: !codeExpand });
    this.track({
      type: 'expand',
      demo,
    });
  };

  saveAnchor = anchor => {
    this.anchor = anchor;
  };

  handleCodeCopied = demo => {
    this.setState({ copied: true });
    this.track({
      type: 'copy',
      demo,
    });
  };

  onCopyTooltipVisibleChange = visible => {
    if (visible) {
      this.setState({
        copyTooltipVisible: visible,
        copied: false,
      });
      return;
    }
    this.setState({
      copyTooltipVisible: visible,
    });
  };

  // eslint-disable-next-line
  track({ type, demo }) {
    if (!window.gtag) {
      return;
    }
    window.gtag('event', 'demo', {
      event_category: type,
      event_label: demo,
    });
  }

  render() {
    const {
      meta,
      src,
      content,
      preview,
      highlightedCode,
      style,
      highlightedStyle,
      expand,
      utils,
      intl: { locale },
    } = this.props;
    const { copied, copyTooltipVisible } = this.state;
    if (!this.liveDemo) {
      this.liveDemo = meta.iframe ? (
        <BrowserFrame>
          <iframe src={src} height={meta.iframe} title="demo" />
        </BrowserFrame>
      ) : (
        preview(React, ReactDOM)
      );
    }
    const codeExpand = this.state.codeExpand || expand;
    const codeBoxClass = classNames('code-box', {
      expand: codeExpand,
      'code-box-debug': meta.debug,
    });
    const localizedTitle = meta.title[locale] || meta.title;
    const localizeIntro = content[locale] || content;
    const introChildren = utils.toReactComponent(['div'].concat(localizeIntro));

    const highlightClass = classNames({
      'highlight-wrapper': true,
      'highlight-wrapper-expand': codeExpand,
    });

    const prefillStyle = `@import 'antd/dist/antd.css';\n\n${style || ''}`.replace(
      new RegExp(`#${meta.id}\\s*`, 'g'),
      '',
    );
    const html = `<div id="container" style="padding: 24px"></div>
<script>
  var mountNode = document.getElementById('container');
</script>`;

    const sourceCode = this.getSourceCode();

    const codepenPrefillConfig = {
      title: `${localizedTitle} - Ant Design Demo`,
      html,
      js: sourceCode
        .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'antd';/, 'const { $1 } = antd;')
        .replace("import moment from 'moment';", '')
        .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'react-router';/, 'const { $1 } = ReactRouter;')
        .replace(
          /import\s+\{\s+(.*)\s+\}\s+from\s+'react-router-dom';/,
          'const { $1 } = ReactRouterDOM;',
        )
        .replace(/([a-zA-Z]*)\s+as\s+([a-zA-Z]*)/, '$1:$2'),
      css: prefillStyle,
      editors: '001',
      css_external: 'https://unpkg.com/antd@3.x/dist/antd.css',
      js_external: [
        'react@16.x/umd/react.development.js',
        'react-dom@16.x/umd/react-dom.development.js',
        'moment/min/moment-with-locales.js',
        'antd@3.x/dist/antd-with-locales.js',
        'react-router-dom/umd/react-router-dom.min.js',
        'react-router@3.x/umd/ReactRouter.min.js',
      ]
        .map(url => `https://unpkg.com/${url}`)
        .join(';'),
      js_pre_processor: 'typescript',
    };
    const riddlePrefillConfig = {
      title: `${localizedTitle} - Ant Design Demo`,
      js: sourceCode.replace("'antd';", "'antd@3.x';"),
      css: prefillStyle.replace(" 'antd/", " '~antd@3.x/"),
    };
    const dependencies = sourceCode.split('\n').reduce(
      (acc, line) => {
        const matches = line.match(/import .+? from '(.+)';$/);
        if (matches && matches[1] && !line.includes('antd')) {
          const [dep] = matches[1].split('/');
          if (dep) {
            acc[dep] = 'latest';
          }
        }
        return acc;
      },
      { react: 'latest', 'react-dom': 'latest', antd: '3.x' },
    );
    const indexJsContent = `
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
${sourceCode.replace('mountNode', "document.getElementById('container')")}
          `;
    const indexCssContent = (style || '').replace(new RegExp(`#${meta.id}\\s*`, 'g'), '');
    const codesanboxPrefillConfig = {
      files: {
        'package.json': { content: { dependencies } },
        'index.css': { content: indexCssContent },
        'index.js': { content: indexJsContent },
        'index.html': {
          content: html,
        },
      },
    };
    const stackblitzPrefillConfig = {
      title: `${localizedTitle} - Ant Design Demo`,
      template: 'create-react-app',
      dependencies,
      files: {
        'index.css': indexCssContent,
        'index.js': indexJsContent,
        'index.html': html,
      },
    };
    return (
      <section className={codeBoxClass} id={meta.id}>
        <section className="code-box-demo">
          <ErrorBoundary>{this.liveDemo}</ErrorBoundary>
          {style ? (
            <style dangerouslySetInnerHTML={{ __html: style }} /> // eslint-disable-line
          ) : null}
        </section>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <Tooltip title={meta.debug ? <FormattedMessage id="app.demo.debug" /> : ''}>
              <a href={`#${meta.id}`} ref={this.saveAnchor}>
                {localizedTitle}
              </a>
            </Tooltip>
            <EditButton
              title={<FormattedMessage id="app.content.edit-demo" />}
              filename={meta.filename}
            />
          </div>
          <div className="code-box-description">{introChildren}</div>
          <div className="code-box-actions">
            <form
              action="//riddle.alibaba-inc.com/riddles/define"
              method="POST"
              target="_blank"
              onClick={() => this.track({ type: 'riddle', demo: meta.id })}
            >
              <input type="hidden" name="data" value={JSON.stringify(riddlePrefillConfig)} />
              <Tooltip title={<FormattedMessage id="app.demo.riddle" />}>
                <input
                  type="submit"
                  value="Create New Riddle with Prefilled Data"
                  className="code-box-riddle"
                />
              </Tooltip>
            </form>
            <form
              action="https://codepen.io/pen/define"
              method="POST"
              target="_blank"
              onClick={() => this.track({ type: 'codepen', demo: meta.id })}
            >
              <input type="hidden" name="data" value={JSON.stringify(codepenPrefillConfig)} />
              <Tooltip title={<FormattedMessage id="app.demo.codepen" />}>
                <input
                  type="submit"
                  value="Create New Pen with Prefilled Data"
                  className="code-box-codepen"
                />
              </Tooltip>
            </form>
            <form
              action="https://codesandbox.io/api/v1/sandboxes/define"
              method="POST"
              target="_blank"
              onClick={() => this.track({ type: 'codesandbox', demo: meta.id })}
            >
              <input
                type="hidden"
                name="parameters"
                value={compress(JSON.stringify(codesanboxPrefillConfig))}
              />
              <Tooltip title={<FormattedMessage id="app.demo.codesandbox" />}>
                <input
                  type="submit"
                  value="Create New Sandbox with Prefilled Data"
                  className="code-box-codesandbox"
                />
              </Tooltip>
            </form>
            <Tooltip title={<FormattedMessage id="app.demo.stackblitz" />}>
              <span
                className="code-box-code-action"
                onClick={() => {
                  this.track({ type: 'stackblitz', demo: meta.id });
                  stackblitzSdk.openProject(stackblitzPrefillConfig);
                }}
              >
                <Icon type="thunderbolt" />
              </span>
            </Tooltip>
            <CopyToClipboard text={sourceCode} onCopy={() => this.handleCodeCopied(meta.id)}>
              <Tooltip
                visible={copyTooltipVisible}
                onVisibleChange={this.onCopyTooltipVisibleChange}
                title={<FormattedMessage id={`app.demo.${copied ? 'copied' : 'copy'}`} />}
              >
                <Icon
                  type={copied && copyTooltipVisible ? 'check' : 'snippets'}
                  className="code-box-code-copy"
                />
              </Tooltip>
            </CopyToClipboard>
            <Tooltip
              title={<FormattedMessage id={`app.demo.code.${codeExpand ? 'hide' : 'show'}`} />}
            >
              <span className="code-expand-icon"
              >
                <i className={codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'}
                onClick={() => this.handleCodeExpand(meta.id)}>
                  <svg t="1646391796747" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1371" width="17px" height="17px"><path d="M366.7968 830.60053333a49.08373333 49.08373333 0 0 1-35.0208-14.40426666L26.4192 523.60533333c-20.0704-19.11466667-20.0704-49.5616 0-67.10613333l305.3568-294.22933333c20.00213333-19.11466667 51.74613333-19.11466667 70.10986667 0 20.00213333 19.18293333 20.00213333 49.5616 0 67.1744l-270.336 259.00373333 270.336 259.00373333c20.00213333 19.11466667 20.00213333 49.5616 0 67.10613334a42.5984 42.5984 0 0 1-35.08906667 16.04266666zM657.2032 830.60053333a49.08373333 49.08373333 0 0 1-35.08906667-14.40426666c-20.00213333-19.18293333-20.00213333-49.5616 0-67.1744l270.336-259.00373334L620.544 229.44426667c-20.00213333-19.18293333-20.00213333-49.5616 0-67.1744 20.00213333-19.11466667 51.74613333-19.11466667 70.10986667 0l305.3568 294.22933333c20.00213333 19.11466667 20.00213333 49.5616 0 67.10613333l-303.7184 292.59093334a52.0192 52.0192 0 0 1-35.0208 14.336z" fill="currentColor" p-id="1372"></path></svg>
                </i>
                <i  className={codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
                  onClick={() => this.handleCodeExpand(meta.id)}>
                  <svg t="1646392297435" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3076" width="17px" height="17px"><path d="M240.496 272c-13.504 0-25.664 5.632-34.384 14.608l-0.048-0.048L16.848 475.76A47.664 47.664 0 0 0 0 512c0 13.504 5.616 25.664 14.592 34.368l-0.032 0.064 192 192 0.048-0.064A47.68 47.68 0 0 0 240 752a48 48 0 0 0 48-48c0-12.992-5.216-24.752-13.616-33.392l0.048-0.048-158.304-158.32 157.808-157.808-0.048-0.048A47.808 47.808 0 0 0 288.496 320a48 48 0 0 0-48-48z m784 240c0-14.56-6.608-27.44-16.848-36.24L818.432 286.56l-0.032 0.048A47.872 47.872 0 0 0 784 272a48 48 0 0 0-48 48c0 13.504 5.632 25.664 14.608 34.384l-0.048 0.048 157.808 157.808-158.32 158.32 0.048 0.048A47.808 47.808 0 0 0 736.48 704a48 48 0 0 0 48 48c12.992 0 24.752-5.216 33.408-13.632l0.048 0.064 192-192-0.048-0.064A47.68 47.68 0 0 0 1024.496 512zM640 128c-20.8 0-38.496 13.232-45.168 31.712L339.2 830.784a48 48 0 0 0 89.968 33.504L684.8 193.216A48 48 0 0 0 640 128z" fill="currentColor" p-id="3077"></path></svg>
                </i>
               
              </span>
            </Tooltip>
          </div>
        </section>
        <section className={highlightClass} key="code">
          <div className="highlight">{utils.toReactComponent(highlightedCode)}</div>
          {highlightedStyle ? (
            <div key="style" className="highlight">
              <pre>
                <code className="css" dangerouslySetInnerHTML={{ __html: highlightedStyle }} />
              </pre>
            </div>
          ) : null}
        </section>
      </section>
    );
  }
}

export default injectIntl(Demo);
