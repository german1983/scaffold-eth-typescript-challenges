import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

export interface IMainPageMenuProps {
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
}

export const MainPageMenu: FC<IMainPageMenuProps> = (props) => (
  <Menu
    style={{
      textAlign: 'center',
    }}
    selectedKeys={[props.route]}
    mode="horizontal">
    <Menu.Item key="/">
      <Link
        onClick={() => {
          props.setRoute('/');
        }}
        to="/">
        Tama Friend
      </Link>
    </Menu.Item>
    <Menu.Item key="/tamagame">
      <Link
        onClick={() => {
          props.setRoute('/tamagame');
        }}
        to="/tamagame">
        Tama Game
      </Link>
    </Menu.Item>
    <Menu.Item key="/tamadex">
      <Link
        onClick={() => {
          props.setRoute('/tamadex');
        }}
        to="/tamadex">
        Tama DEX (Buy/Sell TAMA)
      </Link>
    </Menu.Item>
    <Menu.Item key="/tamamarket">
      <Link
        onClick={() => {
          props.setRoute('/tamamarket');
        }}
        to="/tamamarket">
        Tama Market
      </Link>
    </Menu.Item>
    <Menu.Item key="/tamaplayground">
      <Link
        onClick={() => {
          props.setRoute('/tamaplayground');
        }}
        to="/tamaplayground">
        Tama Playground
      </Link>
    </Menu.Item>
    <Menu.Item key="/debugcontract">
      <Link
        onClick={() => {
          props.setRoute('/debugcontract');
        }}
        to="/debugcontract">
        Debug Contract
      </Link>
    </Menu.Item>
  </Menu>
);
