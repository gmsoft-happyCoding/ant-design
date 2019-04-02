/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import Button, { NativeButtonProps } from './button';
import { Omit } from '../_util/type';

export type CustomButtonProps = Omit<NativeButtonProps, 'type' | 'icon'>;
export type CustomButton = React.SFC<CustomButtonProps>;

const Save: CustomButton = props => (
  <Button icon="save" type="primary" {...props}>
    {props.children || '保存'}
  </Button>
);

const Submit: CustomButton = props => (
  <Button icon="check" type="primary" {...props}>
    {props.children || '提交'}
  </Button>
);

const Cancel: CustomButton = props => (
  <Button icon="rollback" type="default" {...props}>
    {props.children || '取消'}
  </Button>
);

const Delete: CustomButton = props => (
  <Button icon="close-circle" type="danger" {...props}>
    {props.children || '删除'}
  </Button>
);

const Upload: CustomButton = props => (
  <Button icon="upload" type="primary" {...props}>
    {props.children || '上传'}
  </Button>
);

const Download: CustomButton = props => (
  <Button icon="download" type="primary" {...props}>
    {props.children || '下载'}
  </Button>
);

const Edit: CustomButton = props => (
  <Button icon="edit" type="primary" {...props}>
    {props.children || '编辑'}
  </Button>
);

const Search: CustomButton = props => (
  <Button icon="search" type="primary" {...props}>
    {props.children || '搜索'}
  </Button>
);

const View: CustomButton = props => (
  <Button icon="schedule" type="primary" {...props}>
    {props.children || '查看'}
  </Button>
);

export { Save, Submit, Cancel, Delete, Upload, Download, Edit, Search, View };
