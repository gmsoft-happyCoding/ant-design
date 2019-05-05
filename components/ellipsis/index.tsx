import * as React from 'react';
import classNames from 'classnames';
import Tooltip, { TooltipProps } from '../tooltip';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface EllipsisTooltipProps extends TooltipProps {
  title?: undefined;
  overlayStyle?: undefined;
}

export interface EllipsisProps {
  tooltip?: boolean | EllipsisTooltipProps;
  length?: number;
  lines?: number;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
  fullWidthRecognition?: boolean;
  children: string;
}

export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }
    return pre + 2;
  }, 0);

export const cutStrByFullLength = (str: string = '', maxLength: number) => {
  let showLength = 0;
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }
    if (showLength <= maxLength) {
      return pre + cur;
    }
    return pre;
  }, '');
};

/* eslint react/no-did-mount-set-state: 0 */
/* eslint no-param-reassign: 0 */
// @ts-ignore ts interface CSSStyleDeclaration 中 ，没有webkitLineClamp ，其实是webkit浏览器是有的
const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

type TooltipOverlayStyleType = {
  overflowWrap: 'break-word';
  wordWrap: 'break-word';
};
const TooltipOverlayStyle: TooltipOverlayStyleType = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
};

const getTooltip = ({
  tooltip,
  overlayStyle,
  title,
  children,
}: {
  tooltip?: boolean | EllipsisTooltipProps;
  overlayStyle?: TooltipOverlayStyleType;
  title?: string;
  children: React.ReactChild;
}) => {
  if (tooltip) {
    const props = tooltip === true ? { overlayStyle, title } : { ...tooltip, overlayStyle, title };
    return <Tooltip {...props}>{children}</Tooltip>;
  }
  return children;
};

interface EllipsisTextProps {
  text: string;
  length?: number;
  tooltip?: boolean | EllipsisTooltipProps;
  fullWidthRecognition?: boolean;
  className?: string;
}

const EllipsisText: React.SFC<EllipsisTextProps> = ({
  text,
  length,
  tooltip,
  fullWidthRecognition,
  ...other
}) => {
  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.');
  }
  const textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;

  if (length === null || length === undefined || textLength <= length || length < 0) {
    return <span {...other}>{text}</span>;
  }
  const tail = '...';
  let displayText;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
  }

  const spanAttrs = tooltip ? {} : { ...other };
  return (
    <>
      {getTooltip({
        tooltip,
        overlayStyle: TooltipOverlayStyle,
        title: text,
        children: (
          <span {...spanAttrs}>
            {displayText}
            {tail}
          </span>
        ),
      })}
    </>
  );
};

const bisection = (
  th: number,
  m: number,
  b: number,
  e: number,
  text: string,
  shadowNode: HTMLElement,
): number => {
  const suffix = '...';
  let mid = m;
  let end = e;
  let begin = b;
  shadowNode.innerHTML = text.substring(0, mid) + suffix;
  let sh = shadowNode.offsetHeight;

  if (sh <= th) {
    shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
    sh = shadowNode.offsetHeight;
    if (sh > th || mid === begin) {
      return mid;
    }
    begin = mid;
    if (end - begin === 1) {
      mid = 1 + begin;
    } else {
      mid = Math.floor((end - begin) / 2) + begin;
    }
    return bisection(th, mid, begin, end, text, shadowNode);
  }
  if (mid - 1 < 0) {
    return mid;
  }
  shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
  sh = shadowNode.offsetHeight;
  if (sh <= th) {
    return mid - 1;
  }
  end = mid;
  mid = Math.floor((end - begin) / 2) + begin;
  return bisection(th, mid, begin, end, text, shadowNode);
};

export interface EllipsisState {
  text: string;
  targetCount: number;
}

const Ellipsis: React.SFC<EllipsisProps> = ({
  children,
  lines = 1,
  length,
  className,
  tooltip,
  prefixCls: customizePrefixCls,
  fullWidthRecognition,
  ...restProps
}) => {
  const [text, setText] = React.useState<string>('');
  const [targetCount, setTargetCount] = React.useState<number>(0);
  const nodeRef = React.useRef<HTMLSpanElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const shadowChildrenRef = React.useRef<HTMLDivElement>(null);
  const shadowRef = React.useRef<HTMLDivElement>(null);

  const computeLine = React.useCallback(() => {
    if (
      lines &&
      !isSupportLineClamp &&
      rootRef.current &&
      contentRef.current &&
      shadowChildrenRef.current
    ) {
      const newText =
        shadowChildrenRef.current.innerText || shadowChildrenRef.current.textContent || '';
      const lineHeight = parseInt(getComputedStyle(rootRef.current).lineHeight || '0', 10);
      const targetHeight = lines * lineHeight;
      contentRef.current.style.height = `${targetHeight}px`;
      const totalHeight = shadowChildrenRef.current.offsetHeight;
      const shadowNode = shadowChildrenRef.current;

      if (totalHeight <= targetHeight) {
        setText(newText);
        setTargetCount(newText.length);
        return;
      }

      // bisection
      const len = newText.length;
      const mid = Math.ceil(len / 2);

      const count = bisection(targetHeight, mid, 0, len, newText, shadowNode);
      setText(newText);
      setTargetCount(count);
    }
  }, [lines, shadowChildrenRef, contentRef, rootRef]);
  React.useEffect(() => {
    if (nodeRef) {
      computeLine();
    }
  }, [lines, nodeRef]);
  const id = React.useMemo(
    () => `antd-ellipsis-${`${new Date().getTime()}${Math.floor(Math.random() * 100)}`}`,
    [],
  );
  const style = React.useMemo(
    () => `#${id}{-webkit-line-clamp:${lines};-webkit-box-orient: vertical;}`,
    [id, lines],
  );
  const childNode = React.useMemo(
    () => (
      <span ref={nodeRef}>
        {targetCount > 0 && text.substring(0, targetCount)}
        {targetCount > 0 && targetCount < text.length && '...'}
      </span>
    ),
    [nodeRef, text, targetCount],
  );
  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => {
        const prefixCls = getPrefixCls('ellipsis', customizePrefixCls);
        const cls = classNames(prefixCls, className, {
          [`${prefixCls}-lines`]: lines && !isSupportLineClamp,
          [`${prefixCls}-lineClamp`]: lines && isSupportLineClamp,
        });

        if (!lines && !length) {
          return (
            <span className={cls} {...restProps}>
              {children}
            </span>
          );
        }
        // length
        if (!lines) {
          return (
            <EllipsisText
              length={length}
              text={children || ''}
              tooltip={tooltip}
              fullWidthRecognition={fullWidthRecognition}
              className={cls}
              {...restProps}
            />
          );
        }
        // support document.body.style.webkitLineClamp
        if (isSupportLineClamp) {
          return getTooltip({
            tooltip,
            overlayStyle: TooltipOverlayStyle,
            title: children,
            children: (
              <div id={id} className={cls} {...restProps}>
                <style>{style}</style>
                {children}
              </div>
            ),
          });
        }

        return (
          <div {...restProps} ref={rootRef} className={cls}>
            <div ref={contentRef}>
              {getTooltip({
                tooltip,
                overlayStyle: TooltipOverlayStyle,
                title: text,
                children: childNode,
              })}
              <div className={`${prefixCls}-lines-shadow`} ref={shadowChildrenRef}>
                {children}
              </div>
              <div className={`${prefixCls}-lines-shadow`} ref={shadowRef}>
                <span>{text}</span>
              </div>
            </div>
          </div>
        );
      }}
    </ConfigConsumer>
  );
};

export default Ellipsis;
