import * as React from 'react';
import Button, { NativeButtonProps } from './button';

export type CustomButtonProps = Omit<NativeButtonProps, 'type' | 'icon'>;

const Save = ({ children, ...restProps }: CustomButtonProps) => (
  <Button icon="save" type="primary" {...restProps}>
    {children || '保存'}
  </Button>
);
const Submit = ({ children, ...restProps }: CustomButtonProps) => (
  <Button icon="check" type="primary" {...restProps}>
    {children || '提交'}
  </Button>
);
const Cancel = ({ children, ...restProps }: CustomButtonProps) => (
  <Button icon="rollback" type="default" {...restProps}>
    {children || '取消'}
  </Button>
);
const Delete = ({ children, ...restProps }: CustomButtonProps) => (
  <Button icon="close-circle" type="danger" {...restProps}>
    {children || '删除'}
  </Button>
);
const Upload = ({ children, ...restProps }: CustomButtonProps) => (
  <Button icon="upload" type="primary" {...restProps}>
    {children || '上传'}
  </Button>
);
const Download = ({ children, ...restProps }: CustomButtonProps) => (
  <Button icon="download" type="primary" {...restProps}>
    {children || '下载'}
  </Button>
);
const Edit = ({ children, ...restProps }: CustomButtonProps) => (
  <Button icon="edit" type="primary" {...restProps}>
    {children || '编辑'}
  </Button>
);
const Search = ({ children, ...restProps }: CustomButtonProps) => (
  <Button icon="search" type="primary" {...restProps}>
    {children || '搜索'}
  </Button>
);

const View = ({ children, ...restProps }: CustomButtonProps) => (
  <Button icon="schedule" type="primary" {...restProps}>
    {children || '查看'}
  </Button>
);
const Add = ({ children, ...restProps }: CustomButtonProps) => (
  <Button icon="plus-circle" type="primary" {...restProps}>
    {children || '新增'}
  </Button>
);

export { Save, Submit, Cancel, Delete, Upload, Download, Edit, Search, View, Add };
