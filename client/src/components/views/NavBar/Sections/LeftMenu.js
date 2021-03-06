import React from 'react';
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
//const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  console.log(props)
  return (
    <Menu mode={props.mode}>
    <SubMenu title={<span><a href="/" style={{textDecoration:'inherit' , color:'inherit'}}>영상</a></span>}>
    <Menu.Item key="home">
      <a href="/">전체영상</a>
    </Menu.Item>
    <Menu.Item key="subscription">
      <a href="/video/subscription">구독영상</a>
    </Menu.Item>
    <Menu.Item key="videoupload">
      <a href="/video/upload">업로드</a>
    </Menu.Item>
    </SubMenu>
    <SubMenu title={<span><a href="/movie" style={{textDecoration:'inherit' , color:'inherit'}}>영화</a></span>}>
    <Menu.Item key="movie">
      <a href="/movie">영화정보</a>
    </Menu.Item>
    <Menu.Item key="moviefavorite">
      <a href="/movie/favorite">담긴영화</a>
    </Menu.Item>
    </SubMenu>
    <SubMenu title={<span><a href="/chart" style={{textDecoration:'inherit' , color:'inherit'}}>차트</a></span>}>
    <Menu.Item key="chart">
      <a href="/chart">내차트</a>
    </Menu.Item>
    <Menu.Item key="chartupload">
      <a href="/chart/upload">차트업로드</a>
    </Menu.Item>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu
