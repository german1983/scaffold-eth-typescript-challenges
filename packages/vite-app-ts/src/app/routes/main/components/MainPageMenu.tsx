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
        YourCollectible
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
    <Menu.Item key="/tamacontroller">
      <Link
        onClick={() => {
          props.setRoute('/tamacontroller');
        }}
        to="/tamacontroller">
        My Tama Controller
      </Link>
    </Menu.Item>
    <Menu.Item key="/hints">
      <Link
        onClick={() => {
          props.setRoute('/hints');
        }}
        to="/hints">
        Hints
      </Link>
    </Menu.Item>
    <Menu.Item key="/exampleui">
      <Link
        onClick={() => {
          props.setRoute('/exampleui');
        }}
        to="/exampleui">
        Tama Game
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
    <Menu.Item key="/mainnetdai">
      <Link
        onClick={() => {
          props.setRoute('/mainnetdai');
        }}
        to="/mainnetdai">
        Mainnet DAI
      </Link>
    </Menu.Item>
    <Menu.Item key="/subgraph">
      <Link
        onClick={() => {
          props.setRoute('/subgraph');
        }}
        to="/subgraph">
        Subgraph
      </Link>
    </Menu.Item>
  </Menu>
);
