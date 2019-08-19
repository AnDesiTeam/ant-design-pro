// react页面必须引入的组件
import React from 'react';
// 引入面包屑导航组件
import ReactJson from 'react-json-view'
import {Input} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getRouteDatas,toSimulatePrivilege,toInsertSql,flatToMenuTree,flatToPrivilegeTreeSelect,getFormatPrivilege} from '../UserManager/userUtil';
import routeDatas from "../../../config/router.api.config";
import {getPrivileges,getToken} from '@/utils/authority';
import {getLogInfo} from '@/utils/log';
import {toType,toApiSpecJson} from "../util";

const routes=getRouteDatas(routeDatas);
const privileges=[];
const flatPrivileges=[];
const menuDatas=[];
const privilegeTreeDataForSelect=[];
toSimulatePrivilege(privileges,routes,false,false);
toSimulatePrivilege(flatPrivileges,routes,true,true);
flatToMenuTree(flatPrivileges,menuDatas,0);
flatToPrivilegeTreeSelect(flatPrivileges,privilegeTreeDataForSelect,0);
const sqlArray=toInsertSql(flatPrivileges);
const sqlStr=sqlArray.join("\n");
const {TextArea} = Input;
const privilegesFromStorage=getPrivileges();
const formatPrivilegeData = getFormatPrivilege(privilegesFromStorage);

const token=getToken();
// console.log("====1",`Bearer ${token}`);
const d1=new Date();
const obj=[{a1:'dd',b1:1,d1,d2:'2018-02-02',obj1:{b1:'11'},arr1:[{c1:2},{c2:3}]}];
// console.log("a=====:",toType(obj),toType(obj.a1),toType(obj.b1),toType(obj.d1),toType(obj.d2),toType(obj.arr1));

// const input = JSON.stringify(obj);
// console.log("b=====:",parseInput("1"));
const flatJsonArray=[{name:'root',type:toType(obj),remark:'root',parent:"-"}];

const newObj=toType(obj)==='array'?obj[0]:obj;
toApiSpecJson(newObj,flatJsonArray,'root');

console.log(flatJsonArray);
export default () => (
  <PageHeaderWrapper>
    <div>
      Token:<TextArea rows={3} value={`Bearer ${token}`} />
      <br />
      log:<ReactJson src={getLogInfo()} collapsed='true' />
      <br />
      ant框架的原始菜单数据:<ReactJson src={routes} collapsed='true' />
      <br />
      转换为树形表格格式:<ReactJson src={privileges} collapsed='true' />
      <br />
      转换为树形下拉框格式:<ReactJson src={privilegeTreeDataForSelect} collapsed='true' />
      <br />
      转换为后台返回的模拟数据:<ReactJson src={flatPrivileges} collapsed='true' />
      <br />
      从storage获取的权限数据:<ReactJson src={privilegesFromStorage} collapsed='true' />
      <br />
      用于功能权的格式化的权限数据:<ReactJson src={formatPrivilegeData} collapsed='true' />
      <br />
      转换为Insert Sql:<TextArea rows={20} value={sqlStr} />
      转换为ant菜单数据:<ReactJson src={menuDatas} collapsed='true' />
      <br />
    </div>
  </PageHeaderWrapper>
);
